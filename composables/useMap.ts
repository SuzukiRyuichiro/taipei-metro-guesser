import mapboxgl from "mapbox-gl";

export function useMap() {
  const map = ref<mapboxgl.Map | null>(null);
  const config = useRuntimeConfig();

  onMounted(() => {
    mapboxgl.accessToken = config.public.mapboxAccessToken;
    map.value = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/scooter-scooter/clsyl4h1v004501rab7d80cet",
      center: [121.52, 25.07],
      zoom: 11,
    });

    map.value.on("load", () => {
      if (map.value == null) return;

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
          "circle-stroke-width": 1,
        },
      });

      map.value.addLayer(
        {
          id: "lines",
          type: "line",
          source: "taipeiMetroLines",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": ["get", "line-color"],
            "line-width": 2,
          },
        },
        "stations"
      );

      const bounds = [116.37, 20.65, 125.0313941, 26.954149];
      map.value.setMaxBounds(bounds);
    });
  });

  const flyTo = (coordinates: number[]) => {
    map.value?.flyTo({
      center: coordinates,
      zoom: 17,
      speed: 1.5,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  };

  const addAnsweredStationFill = ({
    coordinates,
    color,
    stationCode,
    nameEn,
    nameTw,
  }: {
    coordinates: number[];
    color: string;
    stationCode: string;
    nameEn: string;
    nameTw: string;
  }) => {
    map.value?.addSource(stationCode, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        properties: {
          nameEn,
          nameTw,
          color,
        },
      },
    });

    map.value?.addLayer({
      source: stationCode,
      id: `${stationCode}Filled`,
      type: "circle",
      paint: {
        "circle-radius": {
          stops: [
            [5, 1], // At zoom level 5, circles have a radius of 2 pixels
            [10, 3], // At zoom level 10, increase the radius to 4 pixels
            [15, 7], // At zoom level 15, further increase to 8 pixels for visibility when zoomed in
            [20, 11], // At zoom level 20 (very close), increase to 12 pixels
          ],
        },
        "circle-color": "#3f3f3f",
      },
    });

    map.value?.addLayer({
      id: `${stationCode}Label`,
      minzoom: 12,
      type: "symbol",
      source: stationCode, // Same source as the circle layer
      layout: {
        "text-field": [
          "format",
          ["get", "nameTw"],
          { "font-scale": 0.8 },
          "\n",
          {},
          ["get", "nameEn"],
          { "font-scale": 0.6 },
        ], // Use the appropriate property from your data
        "text-size": 20,
        "text-offset": [0, 1.7], // Adjust as needed for label positioning
      },
      paint: {
        "text-halo-color": "#f1f1f1",
        "text-halo-width": 2,
      },
    });
  };

  return { map, flyTo, addAnsweredStationFill };
}
