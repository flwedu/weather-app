import { Wind, Compass, Thermometer, Droplet, Calendar } from "lucide-react";
import { Current, Location } from "../model/types/IForecast";

type Props = {
	current: Current;
	location: Location;
	lastUpdatedEpoch: number;
};

function getDate(last_updated_epoch: number) {
	const lastUpdatedEpoch = last_updated_epoch * 1000;
	return new Date(lastUpdatedEpoch).toLocaleString();
}

export function CardDetails({ current, location, lastUpdatedEpoch }: Props) {
	return (
		<>
			<div className="details-card-header card-header">
				<img
					className="header-icon"
					src={current.condition.icon}
					alt={current.condition.text}
				/>
				<h2>
					{location.name}, {location.country}
				</h2>
			</div>
			<div className="details-card-body card-body">
				<div className="details-card-div">
					<h3 data-lang="wind-speed">Wind speed</h3>
					<span className="value">
						<Wind size={16} /> {current.wind_kph}
					</span>
				</div>
				<div className="details-card-div">
					<h3 data-lang="wind-direction">Wind direction</h3>
					<span className="value">
						<Compass size={16} /> {current.wind_dir}
					</span>
				</div>
				<div className="details-card-div">
					<h3 data-lang="temperature">Temperature</h3>
					<span className="value">
						<Thermometer size={16} /> {current.temp_c} ºC
					</span>
				</div>
				<div className="details-card-div">
					<h3 data-lang="feels-like">Feels like</h3>
					<span className="value">
						<Thermometer size={16} /> {current.feelslike_c} ºC
					</span>
				</div>
				<div className="details-card-div">
					<h3 data-lang="humidity">Humidity</h3>
					<span className="value">
						<Droplet size={16} /> {current.humidity}%
					</span>
				</div>
			</div>
			<div className="details-card-footer card-footer">
				<span className="body-time">
					<Calendar size={16} /> {getDate(lastUpdatedEpoch)}
				</span>
			</div>
		</>
	);
}
