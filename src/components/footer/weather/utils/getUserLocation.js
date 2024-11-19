export const getUserLocation = (setUserLocation) => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;

				setUserLocation({
					latitude: latitude.toFixed(2),
					longitude: longitude.toFixed(2),
				});
			},
			(error) => {
				console.error(
					`Ошибка при получении геолокации: ${error.message}`,
				);
			},
		);
	} else {
		console.error('Геолокация не поддерживается в этом браузере.');
	}
};
