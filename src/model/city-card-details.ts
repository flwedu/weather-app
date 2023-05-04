import {ForecastDay, NextDaysForecast} from "./types/IForecast.ts";

export class CityCardDetails{

	constructor(private data: NextDaysForecast) {
	}

	public createDayCard(forecastDay: ForecastDay){
		const { day, date } = forecastDay;
		return `
		<tr class="card-day">
			<td><img src="${day.condition.icon}" alt="weather icon"></td>
			<td><span>${day.maxtemp_c}ªC</span> / <span>${day.mintemp_c}ªC</span></td>
			<td>${day.avghumidity}</td>
			<td>${date}</td>
		<tr>
		`
	}

	public render(){
		return `
		<h2>${this.data.location.name}, ${this.data.location.country}</h2>
		<table>
			<tbody>
				${this.data.forecast.forecastday.map(this.createDayCard).join("")}
			</tbody>
		</table>
		`;
	}
}