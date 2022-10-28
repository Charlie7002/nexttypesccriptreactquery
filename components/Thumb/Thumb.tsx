import Image from "next/legacy/image";
import React from "react";

interface Props {
	imgUrl: string;
}

const Thumb = ({ imgUrl }: Props) => {
	return (
		<Image
			blurDataURL="/placeholder.jpg"
			placeholder="blur"
			className="rounded-ld"
			layout="fill"
			objectFit="cover"
			src={imgUrl}
			alt="thumb"
		/>
	);
};

export default Thumb;
