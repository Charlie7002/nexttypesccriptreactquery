import Image from "next/image";
import React, { SetStateAction, useRef, useState } from "react";

interface Props {
	setQuery: React.Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ setQuery }: Props) => {
	const [text, setText] = useState("");
	const timer = useRef<NodeJS.Timeout>();
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
		//wait before send to the api
		clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			setQuery(e.target.value);
		}, 300);
	};

	return (
		<>
			<input
				className="h-10 pr-14 md:w-96 rounded-full p-4 text-md bg-zinc-700 text-white focus:outline-none focus:border focus:border-solid focus:border-cyan-200"
				type="text"
				value={text}
				placeholder="Search Movie"
				onChange={handleInput}
			/>
			<div className="absolute right-4 ">
				<Image width="30" height="32" src="/tmdb-logo.svg" alt="logo" />
			</div>
		</>
	);
};

export default SearchInput;
