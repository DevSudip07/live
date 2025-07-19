const socket = io();

const generateBtn = document.getElementById("generate");
const linkPara = document.getElementById("link");
const imageDiv = document.getElementById("images");

if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    socket.emit("create-room");
  });

  socket.on("room-created", (roomId) => {
    const link = `${window.location.origin}/viewer.html?room=${roomId}`;
    linkPara.innerHTML = `Share this link: <a href="${link}" target="_blank">${link}</a>`;
  });

  socket.on("receive-image", (image) => {
    const img = document.createElement("img");
    img.src = image;
    img.width = 200;
    img.style.margin = "5px";
    imageDiv.appendChild(img);
  });
}
