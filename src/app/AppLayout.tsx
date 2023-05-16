'use client';

import { ConnectButton, RainbowKitProvider, connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { SessionProvider } from 'next-auth/react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, polygon, optimism, arbitrum, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : [])],
	[publicProvider()]
);

const projectId = 'YOUR_PROJECT_ID';

const { wallets } = getDefaultWallets({
	appName: 'RainbowKit demo',
	projectId,
	chains,
});

const demoAppInfo = {
	appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
	...wallets,
	{
		groupName: 'Other',
		wallets: [
			argentWallet({ projectId, chains }),
			trustWallet({ projectId, chains }),
			ledgerWallet({ projectId, chains }),
		],
	},
]);

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
	statement: 'Sign in to the RainbowKit + SIWE example app',
});

const AppLayout = ({ children, session }: any) => {
	return (
		<>
			<SessionProvider refetchInterval={0} session={session}>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
						<RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
							<main>
								<div className="flex justify-between p-5">
									<b>Logo</b>
									<ConnectButton />
								</div>
								{children}
							</main>
						</RainbowKitProvider>
					</RainbowKitSiweNextAuthProvider>
				</WagmiConfig>
			</SessionProvider>
		</>
	);
};

export default AppLayout;
