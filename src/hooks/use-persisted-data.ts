import { useEffect, useState } from "react";

type PersistedData = {
	cities: string[];
};

export function usePersistedData() {
	const [data, setData] = useState<PersistedData>({ cities: [] });

	useEffect(() => {
		const cities = localStorage.getItem("weather-app-cities");
		if (cities) {
			setData({ cities: cities.split(";") || [] });
		}
	}, []);

	return data;
}
