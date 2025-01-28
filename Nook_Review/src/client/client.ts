import axios from "axios";
import { Island, Review } from "./type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const api = {
  useAllIslands: () =>
    useQuery({
      queryFn: async () => await fetcher<Island[]>("/islands"),
      queryKey: ["islands"],
    }),

  useAllReviews: (island: Island) =>
    useQuery({
      queryFn: async () =>
        await fetcher<Review[]>(`/islands/${island.dream_code}/reviews`),
      queryKey: ["reviews", island.dream_code],
    }),

  useSendReview: () => {
    return useMutation({
      mutationFn: async (review: Review) =>
        await client.post("/reviews", review).then((response) => response.data),
    });
  },
};

function fetcher<TResponse>(url: string): Promise<TResponse> {
  return client.get<TResponse>(url).then((response) => {
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  });
}
