import {CurrentForecast, NextDaysForecast} from "./types/IForecast.ts";

export class DataRequest {
    private BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
    private API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    public async get(query: string){
        const url = `${this.BASE_URL}/current.json?key=${this.API_KEY}&q=${query}&lang=pt`;
        const response = await fetch(url);
        return response.json();
    }
}