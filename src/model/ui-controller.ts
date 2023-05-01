import {CityCard} from "./city-card.ts";

export class UiController {
    private cards: Map<string, CityCard>;
    private resultsDiv: HTMLDivElement;
    
    constructor() {
        this.cards = new Map();
        this.resultsDiv = document.getElementById("results") as HTMLDivElement;
    }

    public addCard(card: CityCard){
        const name = card.location.name;
        this.cards.set(name, card);
    }

    public updateRendering(){
        const cardsValues = Array.from(this.cards.values());
        this.resultsDiv.innerHTML = "";
        cardsValues.forEach((card) => {
            this.resultsDiv.append(card.render());
        })
    }
}