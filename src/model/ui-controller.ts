import {SmallCard} from "./small-card.ts";

export class UiController {
    private cards: Map<string, SmallCard>;
    private cardsListDiv: HTMLDivElement;
    
    constructor() {
        this.cards = new Map();
        this.cardsListDiv = document.getElementById("small-cards-list") as HTMLDivElement;
    }

    public addCard(card: SmallCard){
				const {key} = card;
        this.cards.set(key, card);
    }

		public removeCard(key: string){
			this.cards.delete(key);
		}

    public updateRendering(){
        const cardsValues = Array.from(this.cards.values());
        this.cardsListDiv.innerHTML = "";
        cardsValues.forEach((card) => {
            this.cardsListDiv.append(card.render());
        })
    }

    public getLocationKeyValues(){
        return Array.from(this.cards.keys()).join(";");
    }
}