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

    render(){
        const html = `
    <div class="city-card__header">
        <h2>${this.location.name}</h2>
        <span>${this.location.country}</span>
    </div>
    <div class="city-card__body" >
        <span>${this.current.condition.text}</span>
    </div>
    <div class="city-card__right">
        <img src="${this.current.condition.icon}" alt="${this.current.condition.text}">
    </div>
`;

        const div = document.createElement("div");
        div.classList.add("card", "city-card");
        div.innerHTML = html;
        return div;
    }
}