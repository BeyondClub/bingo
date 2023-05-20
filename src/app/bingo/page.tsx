'use client';

import { useEffect, useState } from 'react';

const Page = async () => {
	const [image, setImage] = useState('QmRhMC2Skm3WyjMwGFbhH2kDyRdM8RXQq33szmE5uo3m8C');

	useEffect(() => {
		fetch('/api/generate_image')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setImage(data.image);
			});
	}, []);

	return (
		<div className="grid place-items-center min-h-screen text-white">
			{image ? <img src={`https://gateway.pinata.cloud/ipfs/${image}`} className="rounded-md" /> : 'Loading...'}
		</div>
	);
};

export default Page;
