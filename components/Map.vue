<template>
  <div id="map" :bind="$attr"></div>
</template>

<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const config = useRuntimeConfig();

onMounted(() => {
  mapboxgl.accessToken = config.public.mapboxAccessToken;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/scooter-scooter/clsxzs3ch004l01py13e1ddhs",
    center: [121.52, 25.07],
    zoom: 11,
  });

  map.on("load", () => {
    map.addSource("taipeiMetroStations", {
      type: "geojson",
      data: "/taipei-metro-stations.geojson",
    });

    map.addSource("taipeiMetroLines", {
      type: "geojson",
      data: "/taipei-metro-lines.geojson",
    });

    map.addLayer({
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

    map.addLayer({
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
</script>
