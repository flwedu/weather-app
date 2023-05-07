import {NextDaysForecast} from "./types/IForecast.ts";

export class SmallCard {
		public key: string;

    constructor(private props: NextDaysForecast) {
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

		public getDate(){
			const {last_updated_epoch} = this.props.current;
			const lastUpdatedEpoch = last_updated_epoch * 1000;
			return new Date(lastUpdatedEpoch).toLocaleString();
		}

		public getProps(){
			return this.props;
		}

    public render(){
			const {current,location} = this.props;
			const html = `
			<div class="small-card-header card-header">
					<img class="header-icon" src="${current.condition.icon}" alt="${current.condition.text}">
					<span class="header-temp value">${this.getTemperatureIcon(current.temp_c)} ${current.temp_c} ºC</span>
			</div>
			<div class="small-card-body card-body" >
					<span class="header-text">${current.condition.text}</span>
			</div>
			<div class="small-card-footer card-footer">
					<span class="body-name"><i class="fa-solid fa-location-dot"></i> ${location.name}, ${location.country}</span>
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