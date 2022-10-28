import React from "react";
import { basicFetch } from "../ExternalApi/fetchFunction";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Header from "../components/Header/Header";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import Grid from "../components/Grid/Grid";
import Card from "../components/Card/Card";
import {
	BACKDROP_SIZE,
	creditsUrl,
	IMAGE_BASE_URL,
	movieUrl,
	POSTER_SIZE,
} from "../config";
import { Movie, Crew, Credits, Cast } from "../ExternalApi/type";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";

interface Props {
	movie: Movie;
	directors: Crew[];
	cast: Cast[];
}

const MoviePage = ({ movie, cast, directors }: Props) => (
	<main>
		<Header />
		<BreadCrumb title={movie.title} />
		<MovieInfo
			thumbUrl={
				movie.poster_path
					? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
					: "/no_image.jpg"
			}
			rating={movie.vote_average}
			year={movie.release_date.split("-")[0]}
			backgroundImgUrl={
				movie.backdrop_path
					? IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path
					: "/no_image.jpg"
			}
			title={movie.original_title}
			summary={movie.overview}
			directors={directors}
			time={movie.runtime}
			budget={movie.budget}
			revenue={movie.revenue}
		/>
		<Grid className="p-4 max-w-7xl m-auto" title="Actors">
			{cast?.map(actor => (
				<Card
					key={actor.credit_id}
					imgUrl={
						actor.profile_path
							? IMAGE_BASE_URL + POSTER_SIZE + actor.profile_path
							: "/no_image.jpg"
					}
					title={actor.name}
					subtitle={actor.character}
				/>
			))}
		</Grid>
	</main>
);

export default MoviePage;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking", //every it's visiting create page
	};
};

export const getStaticProps: GetStaticProps = async context => {
	const movieId = context.params?.movieId as string;
	const movieEndPoint = movieUrl(movieId);
	const creditEndPoint = creditsUrl(movieId);
	const movie = await basicFetch<Movie>(movieEndPoint);
	const credit = await basicFetch<Credits>(creditEndPoint);
	const directors = credit.crew.filter(member => member.job == "Director");
	return {
		props: {
			movie,
			directors,
			cast: credit.cast,
		},
		revalidate: 60 * 60 * 24, //rebuild every 24h
	};
};
