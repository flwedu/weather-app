import './style.css'
import {CityCard} from "./model/city-card.ts";
import {DataRequest} from "./model/data-request.ts";

const buttonDarkMode = document.getElementById("toggle-dark-mode")!;
const searchForm = document.forms.namedItem("search__card")!;
buttonDarkMode.addEventListener("click", () => {
    buttonDarkMode.classList.toggle("active");
    document.body.classList.toggle("dark");
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#search__input") as HTMLInputElement;
    const cityName = input.value;
    new DataRequest({cityName}).get().then((res) => {
        const cityCard = new CityCard(res);
        document.body.append(cityCard.render());
    });
})