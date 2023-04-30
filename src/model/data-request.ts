type DataRequestProps = {
    cityName?: string;
    location?: string;
}

export class DataRequest {
    private BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
    private API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    constructor(private props: DataRequestProps) {
    }

    public async get(){
        const url = `${this.BASE_URL}/current.json?key=${this.API_KEY}&q=${this.props.cityName}&lang=pt`;
        const response = await fetch(url);
        return response.json();
    }
}