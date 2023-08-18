'use client';

import { MantineProvider, createEmotionCache } from '@mantine/core';
import { ConnectButton, RainbowKitProvider, connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth';
// import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
// import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { base } from '@/constants/baseConfig';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[
		// mainnet,
		// polygon,
		// optimism,
		// arbitrum,
		base,
		// ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [polygonMumbai] : []),
	],
	[publicProvider()]
);

const projectId = 'YOUR_PROJECT_ID';

const { wallets } = getDefaultWallets({
	appName: 'Bingo',
	projectId,
	chains,
});

const demoAppInfo = {
	appName: 'Bingo',
};

const connectors = connectorsForWallets([
	...wallets,
	// {
	// 	groupName: 'Other',
	// 	wallets: [
	// 		argentWallet({ projectId, chains }),
	// 		trustWallet({ projectId, chains }),
	// 		ledgerWallet({ projectId, chains }),
	// 	],
	// },
]);

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
	statement: 'Sign in to the Bingo app',
});

const myCache = createEmotionCache({ key: 'lfbingo' });

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const path = usePathname();

	return (
		<MantineProvider withGlobalStyles withNormalizeCSS emotionCache={myCache}>
			{/* <SessionProvider refetchInterval={0} session={session}> */}
			<WagmiConfig config={wagmiConfig}>
				{/* <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}> */}
				<RainbowKitProvider appInfo={demoAppInfo} chains={chains} modalSize={'compact'}>
					<div
						className={
							path?.includes('/onchain-summer')
								? `bg-white text-gray-900`
								: `bg-[#010314] text-[#f8f8f9] `
						}
					>
						<main
							className={
								path?.includes('/onchain-summer')
									? ''
									: 'mx-auto container px-5 sm:px-6 md:px-5  pt-5 space-y-5 pb-10 min-h-screen '
							}
						>
							<main
								className={
									path?.includes('/onchain-summer')
										? 'mx-auto container px-5 sm:px-6 md:px-5 space-y-5 pt-5 pb-10'
										: ''
								}
							>
								<div className="flex justify-between">
									<Link href="/" passHref>
										<img
											src={
												path?.includes('/onchain-summer')
													? `/assets/LFbingo_dark.svg`
													: `/assets/LFbingo.svg`
											}
											alt=""
										/>
									</Link>
									<div className="connect">
										<ConnectButton accountStatus={'address'} />
									</div>
								</div>
							</main>
							{children}

							<Toaster />

							<footer
								className={
									path?.includes('/onchain-summer')
										? 'text-center text-gray-600 border-t border-gray-300 py-6 text-sm'
										: 'text-center text-gray-400 border-t border-gray-800 py-6 text-sm'
								}
							>
								<p>
									Copyright © 2023 lfbingo
									{path?.includes('/onchain-summer') ? (
										<>
											{' '}
											| Powered by{' '}
											<a href="https://beyondclub.xyz" target="_BLANK" rel="noreferrer noopener">
												beyondClub
											</a>
										</>
									) : (
										''
									)}
								</p>
							</footer>
						</main>
					</div>
				</RainbowKitProvider>
				{/* </RainbowKitSiweNextAuthProvider> */}
			</WagmiConfig>
			{/* </SessionProvider> */}
		</MantineProvider>
	);
};

export default AppLayout;
