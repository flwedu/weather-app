import {CurrentForecast} from "./types/IForecast.ts";

export class CityCard {
    public location: CurrentForecast["location"];
    public current: CurrentForecast["current"];
		public key: string;

    constructor(props: CurrentForecast) {
        this.location = props.location;
        this.current = props.current;
				this.key = `${props.location.lat},${props.location.lon}`;
		}

		private getTemperatureIconClass(){
			const temperature = this.current.temp_c;
			if (temperature < -10){
				return "fa-temperature-empty";
			} else if (temperature < 10) {
				return "fa-temperature-low";
			} else if (temperature < 25) {
				return "fa-temperature-half";
			} else if (temperature < 36) {
				return "fa-temperature-three-quarters";
			} else {
				return "fa-temperature-full";
			}
		}

		private getDate(){
			const lastUpdatedEpoch = this.current.last_updated_epoch * 1000;
			return new Date(lastUpdatedEpoch).toLocaleString();
		}

    render(){
        const html = `
			<div class="city-card__header">
					<img class="header-icon" src="${this.current.condition.icon}" alt="${this.current.condition.text}">
					<span class="header-temp"><i class="fa-solid ${this.getTemperatureIconClass()}"></i> ${this.current.temp_c} ºC</span>
					<span class="header-text">${this.current.condition.text}</span>
			</div>
			<div class="city-card__body" >
					<span class="body-name"><i class="fa-solid fa-location-dot"></i> ${this.location.name}, ${this.location.country}</span>
					<span class="body-time"><i class="fa-solid fa-calendar-days"></i> ${this.getDate()}</span>
			</div>
`;

        const div = document.createElement("div");
        div.classList.add("card", "city-card");
				div.setAttribute("data-key", this.key);
        div.innerHTML = html;
        return div;
    }
}