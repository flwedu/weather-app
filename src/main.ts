import './style.css'
import './styles/components.css'
import './styles/cards.css'
import {SmallCard} from "./model/small-card.ts";
import {DataRequest} from "./model/data-request.ts";
import {UiController} from "./model/ui-controller.ts";

const searchForm = document.forms.namedItem("search-form")!;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const buttonGps = document.getElementById("button-gps")!;
const langSelectInput = document.getElementById("select-language") as HTMLSelectElement;
const cards: Map<string, SmallCard> = new Map();
import("./langs.json").then((langs) => {
	const uiController = new UiController(cards, langs, 'pt');
	initApp(uiController);

	langSelectInput!.addEventListener("change", () => {
		initApp(uiController);
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
		makeRequest([ searchInput.value ]).then((results) => {
			addCard(uiController, results);
		});
		searchInput.value = "";
	})

	document.getElementById("small-cards-list")!.addEventListener("click", async (ev: any) => {
		const {target} = ev;
		const clickedCard: HTMLDivElement = target.classList.contains("small-card") ? target : target.closest(".small-card");
		if(!clickedCard || clickedCard.classList.contains("open")) return;
		const key = clickedCard.getAttribute("data-key") || "";

		uiController.expandCardDetails(key, clickedCard);
	})

	document.getElementById("small-cards-list")!.addEventListener("dblclick", (e) => {
		const { target } = e;
		if((target as HTMLDivElement).classList.contains("small-card")){
			const key = (target as HTMLDivElement).getAttribute("data-key")!;
			uiController.removeCard(key);
			uiController.updateRendering();
		}
	})
});


function initApp(uiController: UiController){
	const selectedLang = langSelectInput.value;
	uiController.updateTexts(document.body, selectedLang);
	const cities = localStorage.getItem("weather-app-cities");
	if(cities){
		const queries = cities.split(";");
		makeRequest(queries).then((results) => {
			addCard(uiController, results);
		});
	}
}

function makeRequest(query: string[]){
    const requestPromises = query.map(async (query) => {
				const selectedLang = langSelectInput.value;
        const data = await new DataRequest(selectedLang).getForecast(query);
        return new SmallCard(data);
    })
    return Promise.allSettled(requestPromises);
}

function addCard(uiController: UiController, results: PromiseSettledResult<SmallCard>[]){
    results.forEach((result) => {
        if(result.status == "fulfilled"){
            uiController.addCard(result.value);
        }
    })
    uiController.updateRendering();
    const locationKeyNames = uiController.getLocationKeyValues();
    localStorage.setItem("weather-app-cities", locationKeyNames);
}