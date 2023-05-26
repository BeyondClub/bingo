import { Inter } from 'next/font/google';
import AppLayout from './AppLayout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Bingo',
	description: 'Bingo ',
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
