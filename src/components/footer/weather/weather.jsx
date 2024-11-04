import { useEffect, useState } from 'react';
import { getUserLocation, getWeather } from './utils';
import styled from 'styled-components';

const WeatherCity = styled.span`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const Loader = styled.div`
	width: fit-content;
	font-size: 1.1rem;
	padding-bottom: 5px;
	background: linear-gradient(currentColor 0 0) 0 100%/0% 1px no-repeat;
	animation: l2 2s linear infinite;

	&:before {
		content: 'Загрузка погоды...';
	}

	@keyframes l2 {
		to {
			background-size: 100% 1px;
		}
	}
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
		return <Loader />;
	}

	return (
		<div className={className}>
			<div>
				<WeatherCity>
					<span style={{ fontWeight: 600 }}>{weather.city},</span>{' '}
					{weather.weather}
					<img src={weather.icon} alt='weatherIcon' />
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
