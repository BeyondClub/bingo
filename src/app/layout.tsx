import { Inter } from 'next/font/google';
import AppLayout from './AppLayout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'LFBingo',
	description: 'Bingo ',
	icons: {
		icon: '/assets/favicon.ico',
	},
	'twitter:card': 'summary_large_image',
	'twitter:site': '@beyondclub_xyz',
	'twitter:title': 'LFBingo',
	'twitter:description': 'Bingo',
	'twitter:image': 'https://www.lfbingo.xyz/assets/og.png',
	'og:url': 'https://www.lfbingo.xyz',
	'og:type': 'website',
	'og:title': 'LFBingo',
	'og:description': 'Bingo',
	'og:image': 'https://www.lfbingo.xyz/assets/og.png',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />

				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
