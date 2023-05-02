export interface ForeCast {
    location: {
        name: string
        region: string
        country: string
        lat: number
        lon: number
        tz_id: string
        localtime_epoch: number
        localtime: string
    },
    current: {
        last_updated_epoch: number
        last_updated: string
        temp_c: number
        temp_f: number
        is_day: number
        condition: Condition
        wind_mph: number
        wind_kph: number
        wind_degree: number
        wind_dir: string
        pressure_mb: number
        pressure_in: number
        precip_mm: number
        precip_in: number
        humidity: number
        cloud: number
        feelslike_c: number
        feelslike_f: number
        vis_km: number
        vis_miles: number
        uv: number
        gust_mph: number
        gust_kph: number
    }
}

export interface Condition {
    text: string
    icon: string
    code: number
}


export class CityCard {
    public location: ForeCast["location"];
    public current: ForeCast["current"];

    constructor(props: ForeCast) {
        this.location = props.location;
        this.current = props.current;
    }

		private getTemperatureIconClass(){
			const temperature = this.current.temp_c;
			if (temperature < -10){
				return "fa-temperature-empty";
			} else if (temperature < 5) {
				return "fa-temperature-low";
			} else if (temperature < 25) {
				return "fa-temperature-half";
			} else if (temperature < 38) {
				return "fa-temperature-three-quarters";
			} else {
				return "fa-temperature-full";
			}
		}

		private getDate(){
			const lastUpdatedEpoch = this.current.last_updated_epoch * 1000;
			return new Date(lastUpdatedEpoch).toLocaleString();
		}

    render(){
        const html = `
			<div class="city-card__header">
					<img class="header-icon" src="${this.current.condition.icon}" alt="${this.current.condition.text}">
					<span class="header-temp"><i class="fa-solid ${this.getTemperatureIconClass()}"></i> ${this.current.temp_c} ºC</span>
					<span class="header-text">${this.current.condition.text}</span>
			</div>
			<div class="city-card__body" >
					<span class="body-name"><i class="fa-solid fa-location-dot"></i> ${this.location.name}, ${this.location.country}</span>
					<span class="body-time"><i class="fa-solid fa-calendar-days"></i> ${this.getDate()}</span>
			</div>
`;

        const div = document.createElement("div");
        div.classList.add("card", "city-card");
        div.innerHTML = html;
        return div;
    }
}