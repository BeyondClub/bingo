'use client';

import { useEffect, useState } from 'react';

const Page = async () => {
	const [image, setImage] = useState('QmRhMC2Skm3WyjMwGFbhH2kDyRdM8RXQq33szmE5uo3m8C');

	useEffect(() => {
		fetch('/api/generate_image')
			.then((res) => res.json())
			.then((data) => {
				setImage(data.image);
			});
	}, []);

	return (
		<div className="grid place-items-center min-h-screen text-white">
			{image ? (
				<img src={`https://w3s.link/ipfs/${image}/bingo.png`} className="rounded-md" alt="" />
			) : (
				'Loading...'
			)}
		</div>
	);
};

export default Page;
