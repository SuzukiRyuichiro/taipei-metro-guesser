export type StationDetails = {
  coordinates: [number, number];
  name_en: string;
  name_tw: string;
  color: string;
};

export type LineData = {
  [stationCode: string]: StationDetails;
};

export type StationData = {
  [lineName: string]: LineData;
};
