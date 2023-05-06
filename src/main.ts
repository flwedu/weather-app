import './style.css'
import {SmallCard} from "./model/small-card.ts";
import {DataRequest} from "./model/data-request.ts";
import {UiController} from "./model/ui-controller.ts";
import {CardDetailsNextDays} from "./model/card-details-next-days.ts";

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
	const smallCard = target.classList.contains("small-card") as HTMLElement ? target : (target as HTMLElement).closest(".small-card");
	if(!smallCard) return;
	document.querySelectorAll(".small-card").forEach((c) => c.classList.remove("active"));
	smallCard.classList.add("active");
	const query = smallCard.getAttribute("data-key");
	const cardDetailsNextDaysDiv = document.getElementById("details-next-days");

	const data = await new DataRequest().getForecast(query);
	cardDetailsNextDaysDiv.innerHTML = new CardDetailsNextDays(data).render();
	document.getElementById("app").classList.add("details-open")
	cardDetailsNextDaysDiv.classList.remove("closed");
})
document.getElementById("small-cards-list")!.addEventListener("dblclick", (e) => {
	const { target } = e;
	if((target as HTMLDivElement).classList.contains("small-card")){
		const key = (target as HTMLDivElement).getAttribute("data-key")!;
		uiController.removeCard(key);
		uiController.updateRendering();
	}
})