import {Day, ForecastDay, NextDaysForecast} from "./types/IForecast.ts";
import {CityCard} from "./city-card.ts";

export class CityCardDetails{

	private cityCard: CityCard;

	constructor(private data: NextDaysForecast) {
		this.cityCard = new CityCard(data);
	}

	private getTemperature(day: Day){
		const icon = this.cityCard.getTemperatureIcon(day.maxtemp_c);
		return `<span class="maxtemp">${icon} ${day.maxtemp_c}ºC</span> / <span class="mintemp">${day.mintemp_c}ºC</span>`;
	}

	private getPrecipitation(day: Day){
		return `<span><i class="fa-solid fa-droplet"></i> ${day.totalprecip_mm}mm</span>`;
	}

	private getWeekDay(date_epoch: ForecastDay["date_epoch"]){
		const date = new Date(date_epoch*1000);
		const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		const weekDay = days[date.getUTCDay()];
		return `<span><i class="fa-solid fa-calendar-week"></i> ${weekDay}</span>`;
	}

	private createDayCard(forecastDay: ForecastDay){
		const { day, date_epoch } = forecastDay;
		return `
		<tr class="card-day">
			<td><img src="${day.condition.icon}" alt="weather icon"></td>
			<td>${this.getTemperature(day)}</td>
			<td>${this.getPrecipitation(day)}</td>
			<td>${this.getWeekDay(date_epoch)}</td>
			<td><button><i class="fa-solid fa-chevron-down"></i></button></td>
		</tr>
		`;
	}

	public render(){
		return `
		<h2>${this.data.location.name}, ${this.data.location.country}</h2>
		<table>
			<tbody>
				${this.data.forecast.forecastday.map((fDay) => this.createDayCard(fDay)).join("")}
			</tbody>
		</table>
		`;
	}
}