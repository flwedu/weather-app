import { Thermometer, MapPin, Calendar } from "lucide-react";
import { NextDaysForecast } from "../model/types/IForecast";

type Props = {
	forecast: NextDaysForecast;
};

function getDate(last_updated_epoch: number) {
	const lastUpdatedEpoch = last_updated_epoch * 1000;
	return new Date(lastUpdatedEpoch).toLocaleString();
}

export function SmallCard({ forecast }: Props) {
	const { current, location } = forecast;
	const key = `${location.lat},${location.lon}`;

	return (
		<div className="card small-card" data-key={key}>
			<div className="small-card-header card-header">
				<img className="header-icon" src={current.condition.icon} alt={current.condition.text} />
				<span className="header-temp value">
					<Thermometer size={16} /> {current.temp_c} ºC
				</span>
			</div>
			<div className="small-card-body card-body">
				<span className="header-text">{current.condition.text}</span>
			</div>
			<div className="small-card-footer card-footer">
				<span className="body-name">
					<MapPin size={16} /> {location.name}, {location.country}
				</span>
				<span className="body-time">
					<Calendar size={16} /> {getDate(current.last_updated_epoch)}
				</span>
			</div>
		</div>
	);
}
