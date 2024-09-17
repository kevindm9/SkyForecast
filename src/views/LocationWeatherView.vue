<template>
  <div v-if="weatherData && weatherData.current" class="p-4 bg-cyan-950  rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Weather Information for my location Latitude: {{ latitude }}, Longitude: {{ longitude }}</h2>
    <p class="text-lg mb-2">Current temperature: <span class="font-bold">{{ weatherData.current.temperature }}°C</span></p>
    <p class="text-lg mb-2">Feels like: <span class="font-bold">{{ weatherData.current.feelslike }}°C</span></p>
    <p class="text-lg mb-2">Conditions: <span class="font-bold">{{ weatherData.current.weather_descriptions[0] }}</span></p>
    <img :src="weatherData.current.weather_icons[0]" alt="Weather Icon" class="w-16 h-16 mb-4 rounded-full" />
    
    <h3 class="text-xl font-semibold mb-2">Additional Information:</h3>
    <ul class="list-disc list-inside space-y-1 mb-4">
      <li class="text-sm">Wind: <span class="font-bold">{{ weatherData.current.wind_speed }} km/h</span>, Direction: <span class="font-bold">{{ weatherData.current.wind_dir }} ({{ weatherData.current.wind_degree }}°)</span></li>
      <li class="text-sm">Pressure: <span class="font-bold">{{ weatherData.current.pressure }} hPa</span></li>
      <li class="text-sm">Precipitation: <span class="font-bold">{{ weatherData.current.precip }} mm</span></li>
      <li class="text-sm">Humidity: <span class="font-bold">{{ weatherData.current.humidity }}%</span></li>
      <li class="text-sm">Cloud Cover: <span class="font-bold">{{ weatherData.current.cloudcover }}%</span></li>
      <li class="text-sm">UV Index: <span class="font-bold">{{ weatherData.current.uv_index }}</span></li>
      <li class="text-sm">Visibility: <span class="font-bold">{{ weatherData.current.visibility }} km</span></li>
    </ul>
    
    <p class="text-sm text-white">Observation time: <span class="font-bold">{{ weatherData.current.observation_time }}</span></p>
  </div>
  <div v-else-if="errorMessage" class="p-4 bg-red-100 text-red-600 border border-red-300 rounded-lg shadow-md">
    <p class="font-semibold">Error: {{ errorMessage }}</p>
  </div>
  <div v-else class="p-4 bg-gray-100 text-gray-600 rounded-lg shadow-md">
    <p>Loading weather data...</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import weatherService from './WeatherService';

const latitude = ref<string | null>(null);
const longitude = ref<string | null>(null);
const weatherData = ref<any>(null);
const errorMessage = ref('');

const fetchWeather = async () => {
  if (!latitude.value || !longitude.value) {
    errorMessage.value = 'Please enable location services.';
    return;
  }

  try {
    const data = await weatherService.getWeatherByCoordinates(latitude.value, longitude.value);
    
    if (data.success === false) {
      errorMessage.value = data.error?.info || 'Failed to fetch weather data';
    } else {
      weatherData.value = data;
      errorMessage.value = '';
    }
  } catch (error) {
    console.error('API error:', error);
    errorMessage.value = 'An error occurred while fetching weather data';
  }
};

// Get the user's location
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude.value = position.coords.latitude.toFixed(6).toString();
      longitude.value = position.coords.longitude.toFixed(6).toString();
      fetchWeather();
    }, (error) => {
      console.error('Geolocation error:', error);
      errorMessage.value = 'Unable to retrieve location. Please enable location services.';
    });
  } else {
    errorMessage.value = 'Geolocation is not supported by this browser.';
  }
};

// Fetch weather data when the component is mounted
onMounted(() => {
  getLocation();
});
</script>


