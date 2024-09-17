import axios from 'axios';

const apiKey = '1c17a38deb1b9ef96ba49f83dc6a3a0f';

interface WeatherSuccessResponse {
  current: {
    temperature: number;
    weather_descriptions: string[];
  };
  success: true;
}

interface WeatherErrorResponse {
  error: {
    code: number;
    info: string;
  };
  success: false;
}

type WeatherResponse = WeatherSuccessResponse | WeatherErrorResponse;

const WeatherService = {
  async getWeather(city: string): Promise<WeatherResponse> {
    try {
      const response = await axios.get(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);

      if (response.data.success === false) {
        return {
          error: response.data.error,
          success: false,
        };
      }

      return {
        current: response.data.current,
        success: true,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return {
        error: { code: 500, info: 'Error making API request' },
        success: false,
      };
    }
  },
  async getWeatherByCoordinates(latitude: string, longitude: string): Promise<WeatherResponse> {
    try {
      const response = await axios.get(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`);

      if (response.data.success === false) {
        return {
          error: response.data.error,
          success: false,
        };
      }

      return {
        current: response.data.current,
        success: true,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return {
        error: { code: 500, info: 'Error making API request' },
        success: false,
      };
    }
  },
};

export default WeatherService;

