export interface TweetGeo {
  coordinates: {
    type: string; // TODO: include all coordinate values in union
    coordinates: [number, number];
  };
  place_id: string;
}
