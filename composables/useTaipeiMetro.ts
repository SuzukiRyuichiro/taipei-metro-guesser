import nuxtStorage from "nuxt-storage";
import type { StationData, StationDetails } from "../types/stationData";

export const useTaipeiMetro = () => {
  const fetchTaipeiMetroData = async () => {
    const response = await fetch("/taipei-metro-data.json"); // Adjust path as necessary
    const data = await response.json();
    nuxtStorage.localStorage.setData("station-data", data);
  };

  const findStations = (
    stationData: StationData,
    searchString: string
  ): StationData => {
    // Normalize search string to lowercase for case-insensitive comparison
    const normalizedSearchString = searchString.toLowerCase();

    const hits: StationData = {};

    Object.keys(stationData).forEach((lineName) => {
      Object.keys(stationData[lineName]).forEach((stationCode) => {
        const station = stationData[lineName][stationCode];
        const { name_en, name_tw } = station;
        if (
          [name_en.toLowerCase(), name_tw.toLowerCase()].includes(
            normalizedSearchString
          )
        ) {
          // if there is no hit station in a line, initialize
          if (hits[lineName] == null) {
            hits[lineName] = {};
          }
          hits[lineName][stationCode] = station;
        }
      });
    });

    // Return null if no match is found
    return hits;
  };

  return { fetchTaipeiMetroData, findStations };
};
