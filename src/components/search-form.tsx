import { CrosshairIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

type SearchFormProps = {
	onSubmit: (search: string) => void;
};

export function SearchForm({ onSubmit }: SearchFormProps) {
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(search);
	};

	const handleLocationClick = () => {
		navigator.geolocation.getCurrentPosition((loc) => {
			const { latitude, longitude } = loc.coords;
			setSearch(`${latitude},${longitude}`);
		});
	};

	return (
		<div id="search-card" className="shadow card">
			{isOpen ? (
				<form name="form" id="search-form" onSubmit={handleSubmit}>
					<label htmlFor="search-input" data-lang="search-for-city">
						Search for city name
					</label>
					<input
						id="search-input"
						name="search-input"
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button id="button-submit" type="submit">
						<SearchIcon />
					</button>
					<button id="button-gps" type="button" onClick={handleLocationClick}>
						<CrosshairIcon />
					</button>
				</form>
			) : (
				<button id="button-add-location" onClick={() => setIsOpen(true)}>
					<PlusIcon />
					<span data-lang="add-location">Add Location</span>
				</button>
			)}
		</div>
	);
}
