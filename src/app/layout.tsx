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
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
