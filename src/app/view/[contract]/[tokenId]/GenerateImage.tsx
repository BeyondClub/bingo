'use client';

import { useState } from 'react';
import { toast } from 'sonner';

const GenerateImage = ({ campaign_id }: { campaign_id?: string }) => {
	const [image, setImage] = useState<string | null>(null);

	const refreshImage = async () => {
		toast.message('Refreshing image...');
		const response = await fetch(`/api/refresh_image?id=${campaign_id}`);
		const result = await response.json();
		if (result.image) {
			setImage(result.image);
		}

		toast.success('Image refresh request added to queue!');
	};
	return (
		<>
			<button className="my-5" onClick={refreshImage}>
				Refresh Image
			</button>

			{image && (
				<a
					target="_blank"
					rel="noreferrer noopener"
					className="block mt-5"
					href={`https://${image}.ipfs.w3s.link/bingo.png`}
				>
					View Image
				</a>
			)}
		</>
	);
};

export default GenerateImage;
