export interface Movie {
	backdrop_path: string;
	id: number;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	title: string;
	vote_average: number;
	vote_count: number;
	budget: number;
	runtime: number;
	revenue: number;
	release_date: string;
}

export interface Movies {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface Cast {
	character: string;
	name: string;
	profile_path: string;
	credit_id: string;
}

export interface Crew {
	job: string;
	name: string;
	credit_id: number;
}

export interface Credits {
	id: number;
	cast: Cast[];
	crew: Crew[];
}
