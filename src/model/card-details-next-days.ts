import {Day, ForecastDay, NextDaysForecast} from "./types/IForecast.ts";
import {SmallCard} from "./small-card.ts";

export class CardDetailsNextDays {

	private props: NextDaysForecast;

	constructor(private smallCard: SmallCard) {
		this.props = smallCard.getProps();
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
		const weekDay = days[date.getUTCDay()].toLowerCase();
		return `<i class="fa-solid fa-calendar-week"></i> <span data-lang="${weekDay}"></span>`;
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
			<h2 data-lang="next-days-forecast">Next days forecast</h2>
		</div>
		<table class="details-next-days-body card-body">
			<thead>
				<th data-lang="condition">Condition</th>
				<th>Max/Min</th>
				<th data-lang="precipitation">Precipitation</th>
				<th data-lang="week-day">Week Day</th>
			</thead>
			<tbody>
				${this.props.forecast.forecastday.map((fDay) => this.createDayCard(fDay)).join("")}
			</tbody>
		</table>
		`;
	}
}