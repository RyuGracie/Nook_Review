export interface Island {
  id: number;
  name: string;
  description: string;
  image: string;
  dream_code: string;
  owner: string;
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
