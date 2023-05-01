import './style.css'
import {CityCard} from "./model/city-card.ts";
import {DataRequest} from "./model/data-request.ts";

const searchForm = document.forms.namedItem("search-form")!;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const buttonGps = document.getElementById("button-gps")!;
const resultsDiv = document.getElementById("results")!;
document.getElementById("toggle-dark-mode")!.addEventListener("click", (e) => {
    const button = e.target as HTMLButtonElement;
    button.classList.toggle("active");
    document.body.classList.toggle("dark");
});

document.getElementById("button-add-location")!.addEventListener("click", (e) => {
    const searchCard = document.getElementById("search-card")!;
    searchCard.classList.toggle("active");
})

buttonGps.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((loc) => {
        const {latitude,longitude} = loc.coords;
        searchInput.value = `${latitude},${longitude}`;
    });
})

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = searchInput.value;
    new DataRequest({cityName}).get().then((res) => {
        const cityCard = new CityCard(res);
        resultsDiv.prepend(cityCard.render());
    });
})