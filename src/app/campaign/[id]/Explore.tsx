'use client';

import { shortenAddress } from '@/libs/helpers';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Explore = ({ address }: { address: string }) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		// make arrow functon
		(async () => {
			setLoading(true);
			const response = await fetch(`/api/get_nft_transfers?address=${address}`);
			const data = await response.json();
			setData(data.response.items);
			setLoading(false);
		})();
	}, []);

	return (
		<div>
			<div className="grid place-content-center text-center mb-20">
				<h2 className="font-medium text-3xl mt-10">Explore</h2>
				<p className="text-gray-500 mb-10 mt-2">Newly minted & transferred NFTs from the campaign</p>

				<table className="border-collapse table-auto w-full text-sm md:w-96">
					<thead>
						<tr>
							<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left ">
								Token ID
							</th>
							<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
								Owner
							</th>
							<th className="dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-right"></th>
						</tr>
					</thead>
					<tbody>
						{loading && (
							<tr>
								<td colSpan={2}>Loading...</td>
							</tr>
						)}

						{data.map((item: any) => (
							<tr key={item.tokenId} className="hover:text-gray-100 text-slate-500">
								<td className=" border-slate-100 dark:border-slate-700 p-2 pl-8   text-left">
									#{item.tokenId}
								</td>
								<td className=" border-slate-100 dark:border-slate-700 p-2 pl-8   text-left">
									{shortenAddress(item.to)}
								</td>
								<td className=" border-slate-100 dark:border-slate-700 p-2 pl-8   text-right">
									<Link href={`/view/${address}/${item.tokenId}`} passHref>
										View
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Explore;
