import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppLayout from './AppLayout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'LFBingo',
	description: 'Bingo ',
	icons: {
		icon: '/assets/favicon.ico',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@beyondclub_xyz',
		title: 'LFBingo',
		description: 'Bingo',
		images: [
			{
				url: 'https://www.lfbingo.xyz/assets/og.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://www.lfbingo.xyz/assets/og.png',
				width: 1800,
				height: 1600,
				alt: 'LFBingo',
			},
		],
	},
	openGraph: {
		url: 'https://www.lfbingo.xyz',
		type: 'website',
		title: 'LFBingo',
		description: 'Bingo',
		images: [
			{
				url: 'https://www.lfbingo.xyz/assets/og.png',
				width: 800,
				height: 600,
			},
			{
				url: 'https://www.lfbingo.xyz/assets/og.png',
				width: 1800,
				height: 1600,
				alt: 'LFBingo',
			},
		],
	},
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
