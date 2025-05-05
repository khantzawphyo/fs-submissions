import axios from "axios";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER;

const getData = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return request.then((response) => response.data);
};

const weatherService = {
  getData,
};

export default weatherService;
