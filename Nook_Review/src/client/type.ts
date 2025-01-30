export interface Island {
  id: number;
  name: string;
  description: string;
  image: string;
  dream_code: string;
  owner: string;
  started: Date;
}

export interface Review {
  id: number;
  owner: string;
  aesth_rating: number;
  motif_rating: number;
  creat_rating: number;
  rating: number;
  comment: string;
  date: string;
}

export interface ReviewFormInput {
  aesth_rating: number;
  motif_rating: number;
  creat_rating: number;
  comment: string;
}

export interface IslandFormInput {
  name: string;
  description: string;
  image: string;
  dream_code: string;
  started: Date;
}
