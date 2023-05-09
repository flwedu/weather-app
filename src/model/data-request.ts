import {CurrentForecast, NextDaysForecast} from "./types/IForecast.ts";

export class DataRequest {
    private BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
    private API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

		constructor(private lang: string) {
		}

    public async get(query: string): Promise<CurrentForecast>{
        const url = `${this.BASE_URL}/current.json?key=${this.API_KEY}&q=${query}&lang=pt`;
        const response = await fetch(url);
        return response.json();
    }

		public async getForecast(query: string): Promise<NextDaysForecast>{
			const days = 5;
			const url = `${this.BASE_URL}/forecast.json?key=${this.API_KEY}&q=${query}&days=${days}&lang=${this.lang}`;
			const response = await fetch(url);
			return response.json();
		}
}