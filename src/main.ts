import './style.css'
import './styles/components.css'
import './styles/cards.css'
import {SmallCard} from "./model/small-card.ts";
import {DataRequest} from "./model/data-request.ts";
import {UiController} from "./model/ui-controller.ts";

const searchForm = document.forms.namedItem("search-form")!;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const buttonGps = document.getElementById("button-gps")!;
const cards: Map<string, SmallCard> = new Map();
const uiController = new UiController(cards);
const languageVariables = (await import("./langs.json")).default;

const availableLanguages = ['pt-br', 'en', 'es'];
uiController.updateTexts(languageVariables, 0);

document.getElementById("select-language")!.addEventListener("change", (e) => {
	const selectLanguage = e.target as HTMLSelectElement;
	const langIndex = availableLanguages.indexOf(selectLanguage.value);
	uiController.updateTexts(languageVariables, langIndex);
})

document.getElementById("toggle-dark-mode")!.addEventListener("click", (e) => {
    const button = e.target as HTMLButtonElement;
    button.classList.toggle("active");
    document.body.classList.toggle("dark");
});

document.getElementById("button-add-location")!.addEventListener("click", () => {
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
        const data = await new DataRequest().getForecast(query);
        return new SmallCard(data);
    })
    return Promise.allSettled(requestPromises);
}

function addCard(results: PromiseSettledResult<SmallCard>[]){
    results.forEach((result) => {
        if(result.status == "fulfilled"){
            uiController.addCard(result.value);
        }
    })
    uiController.updateRendering();
    const locationKeyNames = uiController.getLocationKeyValues();
    localStorage.setItem("weather-app-cities", locationKeyNames);
}

document.getElementById("small-cards-list")!.addEventListener("click", async (ev: any) => {
	const {target} = ev;
	const activatedCardElement = target.classList.contains("small-card") as HTMLElement ? target : (target as HTMLElement).closest(".small-card");
	if(!activatedCardElement) return;
	const key = activatedCardElement.getAttribute("data-key");

	uiController.expandCardDetails(key, activatedCardElement);
})
document.getElementById("small-cards-list")!.addEventListener("dblclick", (e) => {
	const { target } = e;
	if((target as HTMLDivElement).classList.contains("small-card")){
		const key = (target as HTMLDivElement).getAttribute("data-key")!;
		uiController.removeCard(key);
		uiController.updateRendering();
	}
})