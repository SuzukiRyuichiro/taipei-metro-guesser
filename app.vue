<template>
  <input
    type="text"
    placeholder="Station"
    v-on:keyup.enter="submit"
    v-model="query"
    class="absolute -translate-x-2/4 top-4 left-1/2 drop-shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-8/12 p-2.5"
  />
  <div id="map" class="h-screen"></div>
</template>

<script setup lang="ts">
import mapboxgl from "mapbox-gl";
const query = ref("");

const submit = () => {
  // look through names
  // if found, fly to the location and zoom on map, clear input
  // if not found, change the style fo the input and show error message
};

const config = useRuntimeConfig();
const map = ref<mapboxgl.Map | null>(null);

onMounted(() => {
  mapboxgl.accessToken = config.public.mapboxAccessToken;
  map.value = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/scooter-scooter/clsxzs3ch004l01py13e1ddhs",
    center: [121.52, 25.07],
    zoom: 11,
  });

  map.value.on("load", () => {
    map.value.addSource("taipeiMetroStations", {
      type: "geojson",
      data: "/taipei-metro-stations.geojson",
    });

    map.value.addSource("taipeiMetroLines", {
      type: "geojson",
      data: "/taipei-metro-lines.geojson",
    });

    map.value.addLayer({
      source: "taipeiMetroStations",
      id: "stations",
      type: "circle",
      paint: {
        "circle-radius": {
          stops: [
            [5, 2], // At zoom level 5, circles have a radius of 2 pixels
            [10, 4], // At zoom level 10, increase the radius to 4 pixels
            [15, 8], // At zoom level 15, further increase to 8 pixels for visibility when zoomed in
            [20, 12], // At zoom level 20 (very close), increase to 12 pixels
          ],
        },
        "circle-color": "#ffffff",
        "circle-stroke-color": ["get", "marker-color"],
        // Set the width of the circle's stroke
        "circle-stroke-width": 2,
      },
    });

    map.value.addLayer({
      id: "lines",
      type: "line",
      source: "taipeiMetroLines",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": ["get", "line-color"],
        "line-width": 3,
      },
    });
  });
});

const fly = (coordinate: number[]) => {
  map.value.flyTo({
    center: coordinate,
    zoom: 17,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
  });
};
</script>
