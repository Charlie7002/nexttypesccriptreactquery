import type { NextPage } from "next";
import { useState } from "react";
import Card from "../components/Card/Card";
import Grid from "../components/Grid/Grid";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Spinner from "../components/Spinner/Spinner";
import { useFetchMovies } from "../ExternalApi/fetchHook";
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../config";
import Link from "next/link";

const Home: NextPage = () => {
	const [query, setQuery] = useState("");
	const {
		data,
		isLoading,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		error,
	} = useFetchMovies(query);

	const handlerScroll = (e: React.UIEvent<HTMLElement>) => {
		const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
		if (scrollHeight - scrollTop == clientHeight) {
			fetchNextPage();
		}
	};

	if (error) return <div>Oh nooo.. Something went wrong :(</div>;

	return (
		<main
			className="relative h-screen overflow-scroll"
			onScroll={handlerScroll}
		>
			<Header setQuery={setQuery} />
			{!query && data && data?.pages ? (
				<Hero
					imgUrl={
						data?.pages[0].results[0].backdrop_path
							? IMAGE_BASE_URL +
							  BACKDROP_SIZE +
							  data?.pages[0].results[0].backdrop_path
							: "/no_image.jpg"
					}
					title={data.pages[0].results[0].title}
					text={data.pages[0].results[0].overview}
				/>
			) : null}

			<Grid
				className="p-4 max-w-7xl m-auto"
				title={
					query
						? `Search Results${data?.pages[0].total_results}`
						: "Popular Movies"
				}
			>
				{data && data.pages
					? data.pages.map(page =>
							page.results.map(movie => (
								<Link href={`/${movie.id}`} key={movie.id}>
									<div className="cursor-pointer hover:opacity-80 duration-300">
										<Card
											imgUrl={
												movie.poster_path
													? IMAGE_BASE_URL +
													  POSTER_SIZE +
													  movie.poster_path
													: "/no_image.jpg"
											}
											title={movie.original_title}
										/>
									</div>
								</Link>
							)),
					  )
					: null}
			</Grid>
			{isFetching || (isLoading && <Spinner />)}
		</main>
	);
};

export default Home;
