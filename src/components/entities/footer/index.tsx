const Footer = () => {
	return (
		<footer className="text-center py-10 text-white/80">
			<div>© {new Date().getFullYear()} Sinister Consulting</div>
			<div>
				<a href="mailto:info@sinisterconsulting.com" className="underline">
					info@sinisterconsulting.com
				</a>
				• sinisterconsulting.com
			</div>
		</footer>
	);
};

export default Footer;
