import './style.css'

const buttonDarkMode = document.getElementById("toggle-dark-mode")!;
buttonDarkMode.addEventListener("click", () => {
    buttonDarkMode.classList.toggle("active");
    document.body.classList.toggle("dark");
});