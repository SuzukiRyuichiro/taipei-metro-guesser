<template>
  <div id="map" class="h-screen"></div>
</template>

<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const config = useRuntimeConfig();

onMounted(() => {
  mapboxgl.accessToken = config.public.mapboxAccessToken;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/standard", // style URL
    center: [121.497366, 25.09497], // starting position [lng, lat]
    zoom: 11, // starting zoom
  });

  map.on("load", () => {
    map.loadImage(
      "https://docs.mapbox.com/mapbox-gl-js/assets/cat.png",
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage("cat", image);

        map.addSource("taipeiMetro", {
          type: "geojson",
          data: "/taipei-metro.geojson",
        });

        map.addLayer({
          source: "taipeiMetro",
          id: "stations",
          type: "symbol",
          layout: {
            "icon-image": "cat", // reference the image
            "icon-size": 0.1,
            "icon-allow-overlap": true
          },
        });
      }
    );
  });
});
</script>
