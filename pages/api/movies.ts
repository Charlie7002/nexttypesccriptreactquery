import type { NextApiResponse, NextApiRequest } from "next";

import { POPULAR_BASE_URL, SEARCH_BASE_URL } from "../../config";

import { basicFetch } from "../../ExternalApi/fetchFunction";

import { Movies } from "../../ExternalApi/type";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { page, search } = req.query;

	const endpoint = search
		? `${SEARCH_BASE_URL}${search}&page=${page}`
		: `${POPULAR_BASE_URL}&page=${page}`;

	const data = await basicFetch<Movies>(endpoint);

	if (data) {
		res.status(200).json(data);
	} else {
		res.status(404).json({ message: "Not Found" });
	}
};
