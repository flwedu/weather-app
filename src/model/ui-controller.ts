import {CityCard} from "./city-card.ts";

export class UiController {
    private cards: Map<string, CityCard>;
    private resultsDiv: HTMLDivElement;
    
    constructor() {
        this.cards = new Map();
        this.resultsDiv = document.getElementById("results") as HTMLDivElement;
    }

    public addCard(card: CityCard){
				const {key} = card;
        this.cards.set(key, card);
    }

		public removeCard(key: string){
			this.cards.delete(key);
		}

    public updateRendering(){
        const cardsValues = Array.from(this.cards.values());
        this.resultsDiv.innerHTML = "";
        cardsValues.forEach((card) => {
            this.resultsDiv.append(card.render());
        })
    }

    public getLocationKeyValues(){
        return Array.from(this.cards.keys()).join(";");
    }
}