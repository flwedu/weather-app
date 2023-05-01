import './style.css'
import {CityCard} from "./model/city-card.ts";
import {DataRequest} from "./model/data-request.ts";
import {UiController} from "./model/ui-controller.ts";

const searchForm = document.forms.namedItem("search-form")!;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const buttonGps = document.getElementById("button-gps")!;
const uiController = new UiController();

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
    makeRequest([ searchInput.value ]).then(addCard);
    searchInput.value = "";
})

const cities = localStorage.getItem("weather-app-cities");
if(cities){
    const queries = cities.split(";");
    makeRequest(queries).then(addCard);
}

function makeRequest(query: string[]){
    const requestPromises = query.map(async (query) => {
        const data = await new DataRequest().get(query);
        return new CityCard(data);
    })
    return Promise.allSettled(requestPromises);
}

function addCard(results: PromiseSettledResult<CityCard>[]){
    results.forEach((result) => {
        if(result.status == "fulfilled"){
            uiController.addCard(result.value);
        }
    })
    uiController.updateRendering();
    const locationKeyNames = uiController.getLocationKeyValues();
    localStorage.setItem("weather-app-cities", locationKeyNames);
}