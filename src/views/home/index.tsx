import Header from '../../components/entities/header';
import Footer from '../../components/entities/footer';
import Quiz from '../../components/entities/quiz';

export default function SinisterLanding() {
	return (
		<div
			className="min-h-screen"
			style={{ backgroundColor: '#0B29FF', color: '#ffffff' }}
		>
			<Header />
			<Quiz />
			<Footer />
		</div>
	);
}
