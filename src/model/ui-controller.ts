import {SmallCard} from "./small-card.ts";
import {CardDetailsNextDays} from "./card-details-next-days.ts";
import {NextDaysForecast} from "./types/IForecast.ts";

export class UiController {
    private cardsListDiv: HTMLDivElement;
    
    constructor(private cards: Map<string, SmallCard>) {
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

		public openCardNextDaysDetails(data: NextDaysForecast){
			const app = document.getElementById("app")!;
			const cardDetailsNextDaysDiv = document.getElementById("details-next-days")!;
			cardDetailsNextDaysDiv.innerHTML = new CardDetailsNextDays(data).render();
			app.classList.add("details-open")
			cardDetailsNextDaysDiv.classList.remove("closed");
		}

		public expandCardDetails(key: string, cardElement: HTMLDivElement){
			// closing all open cards
			document.querySelectorAll(".small-card.active").forEach((activeCardElement) => {
				const activeCardKey = activeCardElement.getAttribute("data-key")!;
				const restoredCard = this.cards.get(activeCardKey);
				if(restoredCard){
					activeCardElement.replaceWith(restoredCard.render());
				}
			});
			// expanding
			const smallCard = this.cards.get(key);
			if(smallCard){
				cardElement.classList.add("active");
				cardElement.innerHTML = smallCard.renderDetails();
			}
		}
}