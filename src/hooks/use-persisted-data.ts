import { create } from "zustand";
import { persist } from "zustand/middleware";

type PersistedData = {
	cities: string[];
};

type PersistedDataStore = PersistedData & {
	setCities: (cities: string[]) => void;
	addCity: (city: string) => void;
	removeCity: (city: string) => void;
};

export const usePersistedDataStore = create<PersistedDataStore>()(
	persist(
		(set) => ({
			cities: [],
			setCities: (cities) => set({ cities }),
			addCity: (city) =>
				set((state) => ({
					cities: state.cities.includes(city)
						? state.cities
						: [...state.cities, city],
				})),
			removeCity: (city) =>
				set((state) => ({
					cities: state.cities.filter((c) => c !== city),
				})),
		}),
		{
			name: "weather-app-cities",
			storage: {
				getItem: (name) => {
					const str = localStorage.getItem(name);
					if (!str) return null;
					const cities = str.split(";").filter(Boolean);
					return { state: { cities }, version: 0 };
				},
				setItem: (name, value) => {
					const cities = value.state.cities.join(";");
					localStorage.setItem(name, cities);
				},
				removeItem: (name) => localStorage.removeItem(name),
			},
		},
	),
);

// Hook de compatibilidade para manter a mesma interface
export function usePersistedData() {
	const cities = usePersistedDataStore((state) => state.cities);
	return { cities };
}
