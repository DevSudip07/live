const form = document.querySelector("form");
const userInput = document.querySelector(".userInput");
const button = document.querySelector(".sendButton");
const video = document.querySelector(".video");
const ansvideo = document.querySelector(".ans");
const quesvideo = document.querySelector(".ques");
const trybutton = document.querySelector(".retry");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (userInput.value == "") {
        button.textContent = "BSDK Pehle Answer Likh 🤬";
    } else {
        button.textContent = "Cheking...";
    }
    setTimeout(() => {
        if (userInput.value != "6") {
            quesvideo.style.display = "none";
            ansvideo.src = "./assets/video/wrong.mp4";
            ansvideo.setAttribute('autoplay', 'true');
            quesvideo.pause();
            button.textContent = "Laure ho tum, woh bhi tede wale";
        } else {
            quesvideo.style.display = "none";
            ansvideo.src = "./assets/video/correct.mp4";
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