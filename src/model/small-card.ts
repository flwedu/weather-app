import {CurrentForecast} from "./types/IForecast.ts";

export class SmallCard {
    public location: CurrentForecast["location"];
    public current: CurrentForecast["current"];
		public key: string;

    constructor(props: CurrentForecast) {
        this.location = props.location;
        this.current = props.current;
				this.key = `${props.location.lat},${props.location.lon}`;
		}

		public getTemperatureIcon(temp_c: number){
			let iconClass = "fa-temperature-full";
			if (temp_c < -10){
				iconClass = "fa-temperature-empty";
			} else if (temp_c < 10) {
				iconClass = "fa-temperature-low";
			} else if (temp_c < 25) {
				iconClass = "fa-temperature-half";
			} else if (temp_c < 36) {
				iconClass = "fa-temperature-three-quarters";
			}
			return `<i class="fa-solid ${iconClass}"></i>`
		}

		private getDate(){
			const lastUpdatedEpoch = this.current.last_updated_epoch * 1000;
			return new Date(lastUpdatedEpoch).toLocaleString();
		}

    render(){
        const html = `
			<div class="small-card-header">
					<img class="header-icon" src="${this.current.condition.icon}" alt="${this.current.condition.text}">
					<span class="header-temp">${this.getTemperatureIcon(this.current.temp_c)} ${this.current.temp_c} ºC</span>
					<span class="header-text">${this.current.condition.text}</span>
			</div>
			<div class="small-card-body" >
					<span class="body-name"><i class="fa-solid fa-location-dot"></i> ${this.location.name}, ${this.location.country}</span>
					<span class="body-time"><i class="fa-solid fa-calendar-days"></i> ${this.getDate()}</span>
			</div>
			`;

        const div = document.createElement("div");
        div.classList.add("card", "small-card");
				div.setAttribute("data-key", this.key);
        div.innerHTML = html;
        return div;
    }
}