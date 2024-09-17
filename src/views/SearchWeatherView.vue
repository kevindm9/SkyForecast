<template>
  <div>
    <div class="p-4 bg-cyan-950  rounded-lg shadow-md mb-4">
      <input
        v-model="searchCity"
        type="text"
        placeholder="Enter city name"
        class="p-2 border bg-withe rounded-lg w-full mb-2 "
      />
      <button
        @click="fetchWeather"
        class="bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-950"
      >
        Search
      </button>
    </div>
    
    <div v-if="weatherData && weatherData.success && weatherData.current" class="p-4 bg-cyan-950  rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Weather Information for {{ searchCity }}</h2>
      <p class="text-lg mb-2">Current temperature: <span class="font-bold">{{ weatherData.current.temperature }}°C</span></p>
      <p class="text-lg mb-2">Feels like: <span class="font-bold">{{ weatherData.current.feelslike }}°C</span></p>
      <p class="text-lg mb-2">Conditions: <span class="font-bold">{{ weatherData.current.weather_descriptions[0] }}</span></p>
      <img :src="weatherData.current.weather_icons[0]" alt="Weather Icon" class="w-10 h-10 mb-4 rounded-full" />
      
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
      
      <p class="text-sm text-black">Observation time: <span class="font-bold">{{ weatherData.current.observation_time }}</span></p>
    </div>
    <div v-else-if="errorMessage" class="p-4 bg-red-100 text-red-600 border border-red-300 rounded-lg shadow-md">
      <p class="font-semibold">Error: {{ errorMessage }}</p>
    </div>
    <div v-else class="p-4 bg-gray-100 text-gray-600 rounded-lg shadow-md">
      <p>Loading weather data...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import weatherService from './WeatherService';

export default defineComponent({
  setup() {
    const searchCity = ref('');
    const weatherData = ref(null as any);
    const errorMessage = ref('');

    const fetchWeather = async () => {
      if (!searchCity.value.trim()) {
        errorMessage.value = 'Please enter a city name';
        return;
      }

      try {
        const data = await weatherService.getWeather(searchCity.value);

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

    return {
      searchCity,
      weatherData,
      errorMessage,
      fetchWeather,
    };
  },
});
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
