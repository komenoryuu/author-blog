import { useEffect, useState } from 'react';
import { getUserLocation, getWeather } from './utils';
import styled from 'styled-components';

const WeatherCity = styled.span`
	display: flex;
	align-items: center;
	font-weight: 600;
	gap: 5px;
`;

const WeatherContainer = ({ className }) => {
	const [weather, setWeather] = useState(null);
	const [userLocation, setUserLocation] = useState({
		latitude: 55.75,
		longitude: 37.61,
	});

	useEffect(() => {
		getUserLocation(setUserLocation);
	}, []);

	useEffect(() => {
		getWeather(userLocation, setWeather);
	}, [userLocation]);

	if (!weather) {
		return <div>Loading weather...</div>;
	}

	return (
		<div className={className}>
			<div>
				<WeatherCity>
					{weather.city} <img src={weather.icon} alt='weatherIcon' />
				</WeatherCity>
			</div>
			<div>
				Температура: {weather.temp}°, ощущается как {weather.feelslike}°
			</div>
		</div>
	);
};

export const Weather = styled(WeatherContainer)`
	display: flex;
	align-items: center;
	gap: 10px;
`;
