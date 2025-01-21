import axios from "axios";
import { Island } from "./type";
import { useQuery } from "@tanstack/react-query";

export const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const api = {
  useAllIslands: () =>
    useQuery({
      queryFn: async () => await fetcher<Island[]>("/islands"),
      queryKey: ["islands"],
    }),
};

function fetcher<TResponse>(
  url: string,
): Promise<TResponse> {
  return client.get<TResponse>(url).then((response) => {
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  });
}
