import {NextDaysForecast} from "./types/IForecast.ts";
import {SmallCard} from "./small-card.ts";

export class CardDetails {

	private readonly props: NextDaysForecast;

	constructor(private smallCard: SmallCard) {
		this.props = smallCard.getProps();
	}

	public render(){
		const {current,location} = this.props;
		return `
				<div class="details-card-header card-header">
					<img class="header-icon" src="${current.condition.icon}" alt="${current.condition.text}">
					<h2>${location.name}, ${location.country}</h2>
				</div>
				<div class="details-card-body card-body">
					<div class="details-card-div">
						<h3>Wind speed</h3>
						<span class="value"><i class="fa-solid fa-wind"></i> ${current.wind_kph}</span>
					</div>
					<div class="details-card-div">
						<h3>Wind direction</h3>
						<span class="value"><i class="fa-solid fa-compass"></i> ${current.wind_dir}</span>
					</div>
					<div class="details-card-div">
						<h3>Temperature</h3>
						<span class="value">${this.smallCard.getTemperatureIcon(current.temp_c)} ${current.temp_c} ºC</span>
					</div>
					<div class="details-card-div">
						<h3>Feels like</h3>
						<span class="value">${this.smallCard.getTemperatureIcon(current.feelslike_c)} ${current.feelslike_c} ºC</span>
					</div>
					<div class="details-card-div">
						<h3>Humidity</h3>
						<span class="value"><i class="fa-solid fa-droplet"></i> ${current.humidity}%</span>
					</div>
				</div>
				<div class="details-card-footer card-footer">
					<span class="body-time"><i class="fa-solid fa-calendar-days"></i> ${this.smallCard.getDate()}</span>
				</div>
			`;
	}

}