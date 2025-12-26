import { useQueries } from "@tanstack/react-query";
import { usePersistedData } from "../hooks/use-persisted-data";

type CardsListProps = {
	onCardClick: (city: string) => void;
};

export function CardsList({ onCardClick }: CardsListProps) {
	const { cities } = usePersistedData();
	const queries = useQueries({
		queries: cities.map((city) => ({
			queryKey: ["card", city],
			queryFn: async () => {
				return fetch(
					`https://api.weatherapi.com/v1/forecast.json?key=1234567890&q=${city}&days=3`,
				).then((res) => res.json());
			},
		})),
	});

	return (
		<div id="small-cards-list">
			{queries.map((cityQuery) => {
				if (!cityQuery.data) return null;
				return (
					<div
						key={cityQuery.data.location.name}
						onClick={() => onCardClick(cityQuery.data.location.name)}
					>
						<h1>{cityQuery.data.location.name}</h1>
					</div>
				);
			})}
		</div>
	);
}
