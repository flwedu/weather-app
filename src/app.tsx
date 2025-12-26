import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CardsList } from "./components/cards-list";
import { NavBar } from "./components/navbar";
import { SearchForm } from "./components/search-form";

const queryClient = new QueryClient();

export function App() {
	const [language, setLanguage] = useState("pt");
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [selectedCity, setSelectedCity] = useState<string | null>(null);

	const handleSearchSubmit = (search: string) => {
		console.log(search);
	};

	const handleCardClick = (city: string) => {
		setSelectedCity(city);
	};

	return (
		<QueryClientProvider client={queryClient}>
			<NavBar
				language={language}
				setLanguage={setLanguage}
				isDarkMode={isDarkMode}
				setIsDarkMode={setIsDarkMode}
			/>
			<SearchForm onSubmit={handleSearchSubmit} />
			<CardsList onCardClick={handleCardClick} />
		</QueryClientProvider>
	);
}
