import { MoonIcon, SunIcon } from "lucide-react";

const languages = [
	{ value: "pt", label: "Português" },
	{ value: "en", label: "Inglês" },
	{ value: "es", label: "Espanhol" },
];

type NavBarProps = {
	language: string;
	setLanguage: (language: string) => void;
	isDarkMode: boolean;
	setIsDarkMode: (isDarkMode: boolean) => void;
};

export function NavBar({ language, setLanguage, isDarkMode, setIsDarkMode }: NavBarProps) {
	return (
		<nav id="navbar" className="shadow navbar">
			<h1>Weather Forecast App</h1>
			<div className="buttons">
				<label htmlFor="select-language" data-lang="language">
					Idioma:
				</label>
				<select id="select-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
					{languages.map((language) => (
						<option key={language.value} value={language.value}>
							{language.label}
						</option>
					))}
				</select>
				<button id="toggle-dark-mode" onClick={() => setIsDarkMode(!isDarkMode)}>
					{isDarkMode ? <SunIcon /> : <MoonIcon />}
				</button>
			</div>
		</nav>
	);
}
