import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { QUIZ_STEPS, QuizState } from '../quiz/constants';

type LeadState = {
	name: string;
	email: string;
	company: string;
	website: string;
	message: string;
	consent: boolean;
};

interface IForm {
	canSubmit: boolean;
	setSubmitted: Dispatch<SetStateAction<boolean>>;
	quiz: QuizState;
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const cx = (...classes: (string | false | null | undefined)[]) =>
	classes.filter(Boolean).join(' ');

const Form: FC<IForm> = ({ setSubmitted, quiz }) => {
	const [lead, setLead] = useState<LeadState>({
		name: '',
		email: '',
		company: '',
		website: '',
		message: '',
		consent: false,
	});
	const [sending, setSending] = useState(false);

	const canSubmit = useMemo(() => {
		return !!(lead.name && isValidEmail(lead.email) && lead.consent);
	}, [lead.consent, lead.email, lead.name]);

	async function submitAll(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSending(true);

		try {
			const formattedQuiz = Object.entries(quiz)
				.map(([key, value]) => {
					const label =
						QUIZ_STEPS.find((item) => item.key === key)?.title || key;

					let formattedValue: string;
					if (Array.isArray(value)) {
						formattedValue = value.join(', ') || '—';
					} else if (value === '' || value == null) {
						formattedValue = '—';
					} else {
						formattedValue = String(value);
					}

					return `${label}: ${formattedValue}`;
				})
				.join('\n');

			await fetch('/api/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...lead,
					submittedAt: new Date().toISOString(),
					quiz: formattedQuiz,
				}),
			});

			setSubmitted(true);
		} catch (error) {
			console.warn('Submission error', error);
			setSubmitted(true);
		} finally {
			setSending(false);
		}
	}

	return (
		<motion.form
			onSubmit={submitAll}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			className="p-6 rounded-3xl bg-white shadow-sm"
		>
			<h3 className="text-2xl font-semibold mb-2">
				Where can we send your scoped plan?
			</h3>
			<p className="text-neutral-600 mb-5">
				Share a few details and we’ll follow up with a tailored plan and
				timeline.
			</p>
			<div className="grid sm:grid-cols-2 gap-4">
				<div>
					<label className="text-sm text-neutral-600">
						Full name <span style={{ color: 'red' }}>*</span>
					</label>
					<input
						required
						value={lead.name}
						onChange={(e) => setLead({ ...lead, name: e.target.value })}
						className="mt-1 w-full px-3 py-2 rounded-xl border   outline-none"
					/>
				</div>
				<div>
					<label className="text-sm text-neutral-600">
						Work email <span style={{ color: 'red' }}>*</span>
					</label>
					<input
						required
						type="email"
						value={lead.email}
						onChange={(e) => setLead({ ...lead, email: e.target.value })}
						className="mt-1 w-full px-3 py-2 rounded-xl border   outline-none"
						placeholder="you@company.com"
					/>
				</div>
				<div>
					<label className="text-sm text-neutral-600">Company</label>
					<input
						value={lead.company}
						onChange={(e) => setLead({ ...lead, company: e.target.value })}
						className="mt-1 w-full px-3 py-2 rounded-xl border   outline-none"
					/>
				</div>
				<div>
					<label className="text-sm text-neutral-600">Website (optional)</label>
					<input
						value={lead.website}
						onChange={(e) => setLead({ ...lead, website: e.target.value })}
						className="mt-1 w-full px-3 py-2 rounded-xl border   outline-none"
						placeholder="https://example.com"
					/>
				</div>
				<div className="sm:col-span-2">
					<label className="text-sm text-neutral-600">
						What’s the goal / context?
					</label>
					<textarea
						rows={4}
						value={lead.message}
						onChange={(e) => setLead({ ...lead, message: e.target.value })}
						className="mt-1 w-full px-3 py-2 rounded-xl border outline-none"
						placeholder="Key outcomes, integrations, constraints…"
					/>
				</div>
				<div className="sm:col-span-2 flex items-center gap-2">
					<input
						id="consent"
						type="checkbox"
						checked={lead.consent}
						onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
						className="h-4 w-4 outline-none"
					/>
					<label htmlFor="consent" className="text-sm text-neutral-600">
						I agree to be contacted by Sinister Consulting and accept the
						<a className="underline ml-1" href="#">
							privacy policy
						</a>
						.
					</label>
				</div>
			</div>
			<div className="mt-6 flex items-center justify-end">
				<button
					data-testid="submit-plan"
					disabled={!canSubmit || sending}
					type="submit"
					className={cx(
						'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white cursor-pointer',
						(!canSubmit || sending) && 'bg-neutral-400 cursor-not-allowed',
					)}
					style={canSubmit && !sending ? { backgroundColor: '#0B29FF' } : {}}
				>
					{sending ? 'Sending...' : 'Get my plan'} <ArrowRight size={16} />
				</button>
			</div>
		</motion.form>
	);
};

export default Form;
