<template>
  <div id="map" class="h-screen"></div>
</template>

<script setup lang="ts">

import mapboxgl from 'mapbox-gl';

const config = useRuntimeConfig()

onMounted(() => {
  mapboxgl.accessToken = config.public.mapboxAccessToken
  new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [121.497366, 25.09497], // starting position [lng, lat]
    zoom: 11, // starting zoom
  });
})
</script>
