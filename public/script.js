const socket = io();
const generateImageBtn = document.getElementById("generate-image");
const linkPara = document.getElementById("link");
const imageDiv = document.getElementById("images");

// ✅ Auto-run if already in a room (on reload)
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get("room");

  if (roomId) {
    startReceiver(roomId);
    restoreImagesFromLocal(roomId);
  }
});

// ✅ Link generate & room create
if (generateImageBtn) {
  generateImageBtn.addEventListener("click", () => {
    socket.emit("create-room");
  });

  socket.on("room-created", (roomId) => {
    // Update URL with room ID
    const newURL = `${window.location.origin}/user.html?room=${roomId}`;
    linkPara.innerHTML = `Share this link: <a href="/viewer.html?room=${roomId}" target="_blank">${newURL}</a>`;
    window.history.pushState({}, "", `user.html?room=${roomId}`);
    
    startReceiver(roomId);
  });
}

// ✅ Image receive + store
function startReceiver(roomId) {
  socket.emit("join-room", roomId);

  socket.on("receive-image", (image) => {
    const img = document.createElement("img");
    img.src = image;
    img.width = 200;
    img.style.margin = "5px";
    imageDiv.appendChild(img);

    // Save image to localStorage
    const key = `images_${roomId}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    saved.push(image);
    localStorage.setItem(key, JSON.stringify(saved));
  });
}

// ✅ Restore images after reload
function restoreImagesFromLocal(roomId) {
  const key = `images_${roomId}`;
  const saved = JSON.parse(localStorage.getItem(key)) || [];
  saved.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    img.width = 200;
    img.style.margin = "5px";
    imageDiv.appendChild(img);
  });
}

// (Optional) Clear storage when window closed
// window.addEventListener("beforeunload", () => {
//   const roomId = new URLSearchParams(window.location.search).get("room");
//   if (roomId) {
//     localStorage.removeItem(`images_${roomId}`);
//   }
// });



// const socket = io();

// const generateImageBtn = document.getElementById("generate-image");
// const generateVideoBtn = document.getElementById("generate-video");
// const linkPara = document.getElementById("link");
// const imageDiv = document.getElementById("images");
// const videoElement = document.getElementById("live-video");

// let currentRoomId = null;

// // Auto-join room if reloaded with room ID
// window.addEventListener("DOMContentLoaded", () => {
//   const params = new URLSearchParams(window.location.search);
//   const roomId = params.get("room");

//   if (roomId) {
//     currentRoomId = roomId;
//     socket.emit("join-room", roomId);
//     restoreImagesFromLocal(roomId);
//   }
// });

// // Image Room Generation
// if (generateImageBtn) {
//   generateImageBtn.addEventListener("click", () => {
//     socket.emit("create-room", { type: "image" });
//   });

//   socket.on("room-created", (roomId) => {
//     currentRoomId = roomId;
//     const link = `${window.location.origin}/viewer.html?room=${roomId}`;
//     linkPara.innerHTML = `Share this link: <a href="${link}" target="_blank">${link}</a>`;
//     window.history.pushState({}, "", `user.html?room=${roomId}`);
//     socket.emit("join-room", roomId);
//   });
// }

// // Video Room Generation
// if (generateVideoBtn) {
//   generateVideoBtn.addEventListener("click", () => {
//     socket.emit("create-room", { type: "video" });
//   });

//   socket.on("room-created", async (roomId) => {
//     currentRoomId = roomId;
//     const link = `${window.location.origin}/viewer.html?room=${roomId}`;
//     linkPara.innerHTML = `Share this video link: <a href="${link}" target="_blank">${link}</a>`;
//     window.history.pushState({}, "", `user.html?room=${roomId}`);
//     socket.emit("join-room", roomId);

//     // Start capturing video and send via WebRTC
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//     if (videoElement) videoElement.srcObject = stream;
//     stream.getTracks().forEach((track) => socket.emit("video-track", { roomId, track }));
//   });
// }

// // Image receiving
// socket.on("receive-image", (image) => {
//   const img = document.createElement("img");
//   img.src = image;
//   img.width = 200;
//   img.style.margin = "5px";
//   imageDiv.appendChild(img);

//   const key = `images_${currentRoomId}`;
//   const saved = JSON.parse(localStorage.getItem(key)) || [];
//   saved.push(image);
//   localStorage.setItem(key, JSON.stringify(saved));
// });

// // Restore old images from localStorage
// function restoreImagesFromLocal(roomId) {
//   const key = `images_${roomId}`;
//   const saved = JSON.parse(localStorage.getItem(key)) || [];
//   saved.forEach((image) => {
//     const img = document.createElement("img");
//     img.src = image;
//     img.width = 200;
//     img.style.margin = "5px";
//     imageDiv.appendChild(img);
//   });
// }

