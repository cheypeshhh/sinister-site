import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Sinister Consulting',
	description:
		'A global software development network delivering high-performance digital systems: mobile apps, e-commerce, web platforms, and scalable backend solutions.',
	keywords: [
		'global software development network',
		'mobile app development',
		'e-commerce development',
		'online store development',
		'web platform development',
		'backend development services',
		'scalable digital systems',
		'custom software development',
		'distributed engineering team',
		'high-performance software solutions',
		'software development GCC',
		'software development Qatar',
		'software development UAE',
		'software development Saudi Arabia',
		'software development Kuwait',
		'software development Bahrain',
		'software development Oman',
		'enterprise software USA',
		'custom systems Europe',
		'Sinister Consulting',
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
