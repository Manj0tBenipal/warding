import { useQuery } from "react-query";
import { queueRequest } from "./apiQueue";
import { genreData } from "../data/genre";
import {
  onaData,
  ovaData,
  specialsData,
  upcomingData,
} from "../data/mainSection";
import {
  favoriteData,
  topAiringData,
  moviesData,
  popularData,
} from "../data/featured";
import characterData from "../data/characters";
import { animeReviewsData, mangaReviewsData } from "../data/reviews";

const queryConfig = {
  staleTime: 2.1 * 60 * 1000,
};

function useExecuteQuery(queryKey, endpoint) {
  return useQuery(
    queryKey,
    async () => {
      return await queueRequest(endpoint);
    },
    queryConfig
  );
}

export function useHandleJikanResponse(queryKey, endpoint, backupData) {
  const res = useExecuteQuery(queryKey, endpoint);
  const data = res.isError || res.data === null ? backupData : res.data?.data;
  return { data: data, isLoading: res.isLoading };
}

export function useMangaReviews() {
  return useHandleJikanResponse(
    "top-manga-reviews",
    "reviews/manga",
    mangaReviewsData
  );
}
export function useAnimeReviews() {
  return useHandleJikanResponse(
    "top-anime-reviews",
    "reviews/anime",
    animeReviewsData
  );
}

export function useTopAiring() {
  return useHandleJikanResponse(
    "top-airing",
    "top/anime?filter=airing&limit=4",
    topAiringData
  );
}
export function useMostPopular() {
  return useHandleJikanResponse(
    "most-popular",
    "top/anime?filter=bypopularity&limit=4",
    popularData
  );
}
export function useMostFavorite() {
  return useHandleJikanResponse(
    "most-favorite",
    "top/anime?filter=favorite&limit=4",
    favoriteData
  );
}
export function useTopMovies() {
  return useHandleJikanResponse(
    "top-movies",
    "top/anime?type=movie&filter=bypopularity&limit=4",
    moviesData
  );
}
export function useTopOVAs() {
  return useHandleJikanResponse(
    "top-OVAs",
    "top/anime?type=ova&filter=bypopularity&limit=12",
    ovaData
  );
}
export function useTopONAs() {
  return useHandleJikanResponse(
    "top-ONAs",
    "top/anime?type=ona&filter=bypopularity&limit=12",
    onaData
  );
}
export function useTopSpecials() {
  return useHandleJikanResponse(
    "top-specials",
    "top/anime?type=special&filter=bypopularity&limit=12",
    specialsData
  );
}
export function useTopUpcoming() {
  return useHandleJikanResponse(
    "top-upcoming",
    "top/anime?filter=upcoming&limit=12",
    upcomingData
  );
}
export function useGenre() {
  return useHandleJikanResponse("genre", "genres/anime", genreData);
}
export function useTopCharacters() {
  return useHandleJikanResponse(
    "top-characters",
    "top/characters?limit=5",
    characterData
  );
}
export function useGetAnimeByMalId(id, toBeExecuted) {
  return useHandleJikanResponse(`anime-${id}`, `anime/${id}`, null);
}
export function useGetAnimeByGenre(mal_id) {
  return useHandleJikanResponse(
    `anime-by-genre-${mal_id}`,
    `anime?genres=${mal_id}`
  );
}
