const form = document.querySelector("form");
const userInput = document.querySelector(".userInput");
const button = document.querySelector(".sendButton");
const video = document.querySelector(".video");
const ansvideo = document.querySelector(".ans");
const quesvideo = document.querySelector(".ques");
const trybutton = document.querySelector(".retry");

quesvideo.setAttribute('autoplay', 'true');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (userInput.value == "") {
        button.textContent = "BSDK Pehle Answer Likh 🤬";
        quesvideo.play();
    } else {
        button.textContent = "Cheking...";
    }
    setTimeout(() => {
        if (userInput.value != "6") {
            quesvideo.style.display = "none";
            ansvideo.src = "./assets/video/wrong.webm";
            ansvideo.setAttribute('autoplay', 'true');
            quesvideo.pause();
            button.textContent = "Laure ho tum, woh bhi tede wale";
        } else {
            quesvideo.style.display = "none";
            ansvideo.src = "./assets/video/correct.webm";
            ansvideo.setAttribute('autoplay', 'true');
            quesvideo.pause();
            button.textContent = "Sahi pakde hai";
        }
    }, 500);
});

userInput.addEventListener("input", () => {
    button.textContent = "Send";
    quesvideo.style.display = "block";
});

trybutton.addEventListener("click", ()=>{
    window.location.reload();
});

// form.addEventListener("submit", ()=>{

// });