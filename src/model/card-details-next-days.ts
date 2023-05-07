import {Day, ForecastDay, NextDaysForecast} from "./types/IForecast.ts";
import {SmallCard} from "./small-card.ts";

export class CardDetailsNextDays {

	private smallCard: SmallCard;

	constructor(private data: NextDaysForecast) {
		this.smallCard = new SmallCard(data);
	}

	private getTemperature(day: Day){
		const icon = this.smallCard.getTemperatureIcon(day.maxtemp_c);
		return `<span class="value"><span class="maxtemp">${icon} ${day.maxtemp_c}ºC</span> / ${day.mintemp_c}ºC</span>`;
	}

	private getPrecipitation(day: Day){
		return `<span class="value"><i class="fa-solid fa-umbrella"></i> ${day.totalprecip_mm}mm</span>`;
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
		<div class="details-next-days-header card-header">
			<h2>Next days forecast</h2>
		</div>
		<table class="details-next-days-body card-body">
			<thead>
				<th>Condition</th>
				<th>Max/Min</th>
				<th>Precipitation</th>
				<th>Week Day</th>
			</thead>
			<tbody>
				${this.data.forecast.forecastday.map((fDay) => this.createDayCard(fDay)).join("")}
			</tbody>
		</table>
		`;
	}
}