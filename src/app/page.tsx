import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<section className="grid items-center md:grid-cols-2 gap-10 my-12">
				<div className="grid justify-start space-y-10">
					<h1 className="text-5xl font-medium md:text-[48px]">Onchain $BINGO NFT</h1>
					<p className="my-5 text-xl">
						BINGO based on your onchain activity <br /> Mint your $BINGO to flex your $BINGO score
					</p>

					<Link
						href={`/campaign/294e5393-4311-4003-8422-42eb8af28090`}
						passHref
						className="rounded-md bg-white hover:bg-gray-100 text-gray-900 px-6 py-2 w-60 text-center block"
					>
						Try Now
					</Link>
				</div>
				<div className="grid justify-end">
					<img src="/assets/demo.png" className="rounded-lg" style={{ maxHeight: '500px' }} alt="" />
				</div>
			</section>

			<section className="my-14">
				<div className="text-center mb-5">Quest with</div>

				<div className="grid place-items-center md:grid-cols-5 gap-5">
					<img className="h-10" src="/assets/quest/ens.png" alt="" />
					<img className="h-10" src="/assets/quest/superfluid.png" alt="" />
					<img className="" src="/assets/quest/optimism.png" alt="" />
					<img className="h-10" src="/assets/quest/polygon.png" alt="" />
					<img className="h-10" src="/assets/quest/thegraph.png" alt="" />
				</div>
			</section>

			<section>
				<h2 className="font-medium text-4xl text-center mb-2 mt-20">How it works</h2>

				<p className="text-center mb-20">On-chain activity BINGO to flex how degens you are</p>

				<div className="grid md:grid-cols-3 gap-10 mb-24">
					<div>
						<div className="grid place-items-center">
							<img src="/assets/home/1.png" alt="" className="rounded-md" />
						</div>
						<h2 className="text-2xl font-medium mb-2 mt-5">1. Mint BINGO NFT </h2>
						<p>Onchain activities of each grid will be randomly generated after you mint an NFT</p>
					</div>
					<div>
						<div className="grid place-items-center">
							<img src="/assets/home/2.png" alt="" className="rounded-md" />
						</div>
						<h2 className="text-2xl font-medium mb-2 mt-5">2. Check your status </h2>
						<p>We will track and reflect the activity of your wallet and show the status and score.</p>
					</div>
					<div>
						<div className="grid place-items-center">
							<div style={{ height: '438px' }} className="grid place-items-center">
								<img src="/assets/home/3.png" alt="" className="" />
							</div>
						</div>
						<h2 className="text-2xl font-medium mb-2 mt-5">3. Aim Higher Score</h2>
						<p>We will query onchain data and update your score every 24hrs.</p>
					</div>
				</div>
			</section>

			{/* <section className="my-20">
				<h2 className="font-medium text-4xl text-center mb-20">Frequently Asked Questions</h2>

				<div className="grid place-items-center">
					<div className="md:w-3/4">
						<FAQList />
					</div>
				</div>
			</section> */}

			<div className="space-y-10 md:space-y-0 md:flex justify-between place-items-center my-24">
				<div>
					<h1 className="text-4xl leading-50 mb-10 bold">
						Do you want to create <br /> your own $BINGO campaign?
					</h1>
					<p className="text-xl">
						Create your gamified engagement campaign. <br /> You can collaborate with other protocols as
						well.
					</p>
				</div>

				<div>
					<a
						href="mailto:yuki@beyondclub.xyz"
						className="rounded-md bg-white hover:bg-gray-100 text-gray-900 px-6 py-2 w-60 text-center block"
					>
						Contact Us
					</a>
				</div>
			</div>
		</main>
	);
}
