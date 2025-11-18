'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
	const scrollToFunnel = () => {
		if (typeof window === 'undefined') return;
		const el = document.getElementById('funnel');
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<section className="max-w-6xl mx-auto px-4 pt-20 pb-24 text-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				{/* Logo */}

				<Image
					src="/sinister-logo.png"
					height={1600}
					width={1600}
					alt="Sinister Logo"
					className="mx-auto mb-6 h-10 md:h-12 w-auto"
				/>

				{/* Badge */}
				<div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/80">
					<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
					<span>Available for new onboardings</span>
				</div>

				{/* Headline */}
				<h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-4">
					We build digital systems <br className="hidden md:block" />
					that actually ship.
				</h1>

				{/* Subcopy */}
				<p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8">
					Sinister Consulting unites senior engineers, designers, and operators
					across time zones to ship production-grade apps, platforms, and tools
					— fast, secure, and built to scale.
				</p>

				{/* CTAs */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
					<button
						type="button"
						onClick={scrollToFunnel}
						className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-medium bg-white text-blue-700 shadow-sm hover:shadow-md transition-shadow"
					>
						Start your project <ArrowRight size={18} />
					</button>
					<a
						href="mailto:info@sinisterconsulting.com"
						className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl font-medium text-white/80 hover:text-white border border-white/25 hover:border-white/60 transition-colors"
					>
						Or email us directly
					</a>
				</div>

				{/* Supporting line */}
				<p className="mt-4 text-xs md:text-sm text-white/60">
					Typical engagement: discovery in 1 week, first prototype in 2–4 weeks.
				</p>
			</motion.div>
		</section>
	);
};

export default Header;
