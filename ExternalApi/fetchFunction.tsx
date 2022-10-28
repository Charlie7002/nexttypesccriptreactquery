import { Movies } from "./type";

export const basicFetch = async <returnType,>(
	endPoint: string,
): Promise<returnType> => {
	const response = await fetch(endPoint);
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || "Could not fetch the data.");
	}
	return data;
};

//fetch functions access API in nextjs
export const fetchMovies = async (search = "", page = 1): Promise<Movies> => {
	return await basicFetch<Movies>(`/api/movies?search=${search}&page=${page}`);
};
