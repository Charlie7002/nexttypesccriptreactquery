import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies } from "./fetchFunction";
import { Movies } from "./type";

export const useFetchMovies = (search: string) => {
	return useInfiniteQuery<Movies>(
		["movies", search],
		({ pageParam = 1 }) => fetchMovies(search, pageParam),
		{
			getNextPageParam: (lastPage: Movies) => {
				if (lastPage.page < lastPage.total_pages) {
					return lastPage.page + 1;
				}
				return undefined;
			},
			refetchOnWindowFocus: false,
		},
	);
};
