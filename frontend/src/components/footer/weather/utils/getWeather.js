export const getWeather = ({ latitude, longitude }, setWeather) => {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7392de36b856d2c7ecb474f99dc64683&units=metric&lang=ru`,
	)
		.then((response) => response.json())
		.then(({ name, weather, main }) => {
			setWeather({
				city: name,
				weather: weather[0].description,
				temp: Math.round(main.temp),
				feelslike: Math.round(main.feels_like),
				icon:
					'http://openweathermap.org/img/w/' +
					weather[0].icon +
					'.png',
			});
		})
		.catch((error) =>
			console.error(`Ошибка openweathermap: ${error.message}`),
		);
};
