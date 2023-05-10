import {SmallCard} from "./small-card.ts";
import {CardDetailsNextDays} from "./card-details-next-days.ts";
import {CardDetails} from "./card-details.ts";

export class UiController {
    private cardsListDiv: HTMLDivElement;
    
    constructor(private cards: Map<string, SmallCard>,
								private langs: any,
								private defaultUsedLang: string) {
        this.cardsListDiv = document.getElementById("small-cards-list") as HTMLDivElement;
    }

		public setDefaultUsedLang(lang: string){
			this.defaultUsedLang = lang;
		}

		public updateTexts(parentHtmlElement: HTMLElement,
											 usedLang = this.defaultUsedLang){
			const availableLanguages = ['pt', 'en', 'es'];
			const langIndex = availableLanguages.indexOf(usedLang);
			parentHtmlElement.querySelectorAll("[data-lang]").forEach((el) => {
				const fieldName = el.getAttribute("data-lang")!;
				const text = this.langs[fieldName]?.[langIndex] ?? "";
				if(text){
					el.textContent = text;
				}
			})
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
				const activeCardKey = document.querySelector(".small-card.open")?.getAttribute("data-key");
        this.cardsListDiv.querySelectorAll(".small-card:not(.open)")
					.forEach((card) =>{
						card.remove();
					});
        cardsValues.forEach((card) => {
						if(card.key === activeCardKey) return;
						const cardDiv = card.render();
						this.updateTexts(cardDiv)
            this.cardsListDiv.append(cardDiv);
        })
    }

    public getLocationKeyValues(){
        return Array.from(this.cards.keys()).join(";");
    }

		private openCardNextDaysDetails(card: SmallCard){
			const app = document.getElementById("app")!;
			const cardDetailsNextDaysDiv = document.getElementById("details-next-days")!;
			cardDetailsNextDaysDiv.innerHTML = new CardDetailsNextDays(card).render();
			app.classList.add("details-open")
			cardDetailsNextDaysDiv.classList.remove("closed");
			cardDetailsNextDaysDiv.classList.add("open");
			this.updateTexts(cardDetailsNextDaysDiv);
		}

		public expandCardDetails(key: string, cardElement: HTMLDivElement){
			// closing all open cards
			document.querySelectorAll(".small-card.open").forEach((openCardElement) => {
				const openCardKey = openCardElement.getAttribute("data-key")!;
				const restoredCard = this.cards.get(openCardKey);
				if(restoredCard){
					const cardDiv = restoredCard.render();
					this.updateTexts(cardDiv);
					openCardElement.replaceWith(cardDiv);
				}
			});
			// expanding
			const smallCard = this.cards.get(key);
			if(smallCard){
				const cardDetails = new CardDetails(smallCard);
				cardElement.classList.add("open");
				cardElement.innerHTML = cardDetails.render();
				this.updateTexts(cardElement);
				this.openCardNextDaysDetails(smallCard);
			}
		}
}