<template>
  <div id="map" class="h-screen"></div>
</template>

<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const config = useRuntimeConfig();

onMounted(() => {
  mapboxgl.accessToken = config.public.mapboxAccessToken;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/scooter-scooter/clsxzs3ch004l01py13e1ddhs",
    center: [121.497366, 25.09497],
    zoom: 11,
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
          type: "circle",
          paint: {
            'circle-radius': 6,
            'circle-color': ['get', 'marker-color'] // Use the 'marker-color' property
          },
        });
      }
    );
  });
});
</script>
