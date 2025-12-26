import { CalendarDays, ChevronDown, Thermometer, Umbrella } from "lucide-react";
import { Day, ForecastDay, NextDaysForecast } from "../model/types/IForecast";

type Props = {
	forecast: NextDaysForecast;
};

function getTemperature(day: Day) {
	return (
		<span className="value">
			<span className="maxtemp">
				<Thermometer size={16} /> {day.maxtemp_c}ºC
			</span>{" "}
			/ {day.mintemp_c}ºC
		</span>
	);
}

function getPrecipitation(day: Day) {
	return (
		<span className="value">
			<Umbrella size={16} /> {day.totalprecip_mm}mm
		</span>
	);
}

function getWeekDay(date_epoch: ForecastDay["date_epoch"]) {
	const date = new Date(date_epoch * 1000);
	const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	const weekDay = days[date.getUTCDay()];
	return (
		<>
			<CalendarDays size={16} /> <span data-lang={weekDay}></span>
		</>
	);
}

function DayCard({ forecastDay }: { forecastDay: ForecastDay }) {
	const { day, date_epoch } = forecastDay;
	return (
		<tr className="card-day">
			<td>
				<img src={day.condition.icon} alt="weather icon" />
			</td>
			<td>{getTemperature(day)}</td>
			<td>{getPrecipitation(day)}</td>
			<td>{getWeekDay(date_epoch)}</td>
			<td>
				<button>
					<ChevronDown size={16} />
				</button>
			</td>
		</tr>
	);
}

export function CardDetailsNextDays({ forecast }: Props) {
	return (
		<>
			<div className="details-next-days-header card-header">
				<h2 data-lang="next-days-forecast">Next days forecast</h2>
			</div>
			<table className="details-next-days-body card-body">
				<thead>
					<tr>
						<th data-lang="condition">Condition</th>
						<th>Max/Min</th>
						<th data-lang="precipitation">Precipitation</th>
						<th data-lang="week-day">Week Day</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{forecast.forecast.forecastday.map((fDay) => (
						<DayCard key={fDay.date_epoch} forecastDay={fDay} />
					))}
				</tbody>
			</table>
		</>
	);
}
