import nuxtStorage from "nuxt-storage";

export const useTaipeiMetro = () => {
  const fetchTaipeiMetroData = async () => {
    const response = await fetch("/taipei-metro-data.json"); // Adjust path as necessary
    const data = await response.json();
    nuxtStorage.localStorage.setData("station-data", data);
  };

  const findStation = (
    stationData: object,
    searchString: string
  ): {
    coordinates: number[];
    nameEn: string;
    nameTw: string;
    stationCode: string;
    color: string;
  } | null => {
    // Normalize search string to lowercase for case-insensitive comparison
    const normalizedSearchString = searchString.toLowerCase();

    for (const line of Object.values(stationData)) {
      for (const stationCode of Object.keys(line)) {
        const station = line[stationCode];
        const nameEnLower = station.name_en.toLowerCase();
        const nameTwLower = station.name_tw.toLowerCase();

        if ([nameEnLower, nameTwLower].includes(normalizedSearchString)) {
          return {
            coordinates: station.coordinates,
            nameEn: station.name_en,
            nameTw: station.name_tw,
            stationCode: stationCode,
            color: station.color,
          };
        }
      }
    }

    // Return null if no match is found
    return null;
  };

  return { fetchTaipeiMetroData, findStation };
};
