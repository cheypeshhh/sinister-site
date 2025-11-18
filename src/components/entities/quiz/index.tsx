'use client';

import { useState } from 'react';
import Form from '../form';
import Progress from '../progress';
import { motion } from 'framer-motion';
import { QUIZ_STEPS, QuizState } from './constants';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import QuizCard from './components/card';

const cx = (...classes: (string | false | null | undefined)[]) =>
	classes.filter(Boolean).join(' ');

const Quiz = () => {
	const [step, setStep] = useState(0);
	const [quiz, setQuiz] = useState<QuizState>({
		projectType: '',
		scope: [],
		budget: '',
		timeline: '',
		companySize: '',
		companyLocated: '',
	});

	const [submitted, setSubmitted] = useState(false);

	const totalSteps = QUIZ_STEPS.length + 1;
	const current = step < QUIZ_STEPS.length ? QUIZ_STEPS[step] : null;

	const canNext = current
		? current.type === 'single'
			? Boolean(quiz[current.key])
			: !!quiz[current.key].length
		: false;

	function handleSelect(
		key: keyof QuizState,
		value: string,
		type: 'single' | 'multi',
	) {
		setQuiz((q) => {
			if (type === 'multi') {
				const exists = (q[key] as string[]).includes(value);
				const next = exists
					? (q[key] as string[]).filter((v) => v !== value)
					: ([...(q[key] as string[]), value] as string[]);
				return { ...q, [key]: next } as QuizState;
			}
			return { ...q, [key]: value } as QuizState;
		});
	}

	const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
	const prev = () => setStep((s) => Math.max(s - 1, 0));

	return (
		<section
			id="funnel"
			className="max-w-3xl mx-auto px-4 pb-12 text-black bg-white rounded-t-3xl"
		>
			<div className="pt-10">
				<Progress step={step} total={totalSteps} />
			</div>

			{!submitted ? (
				<div className="grid gap-6 mt-6">
					{current ? (
						<motion.div
							key={current.key}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							className="p-6 rounded-3xl border bg-white shadow-sm"
						>
							<h3 className="text-2xl font-semibold">{current.title}</h3>
							<p className="text-neutral-600 mb-5">{current.subtitle}</p>
							<div className="grid sm:grid-cols-2 gap-3">
								{current.options.map((opt) => {
									const isActive =
										current.type === 'multi'
											? (quiz[current.key] as string[]).includes(opt.value)
											: (quiz[current.key] as string) === opt.value;
									return (
										<QuizCard
											key={opt.value}
											active={isActive}
											onClick={() =>
												handleSelect(current.key, opt.value, current.type)
											}
											label={opt.label}
											desc={opt.desc}
											details={opt.details}
										/>
									);
								})}
							</div>
							<div className="mt-6 flex items-center justify-between ">
								{step > 0 && (
									<button
										type="button"
										onClick={prev}
										className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-neutral-50 cursor-pointer"
									>
										<ChevronLeft size={16} /> Back
									</button>
								)}
								<button
									data-testid="next"
									disabled={!canNext}
									onClick={next}
									className={cx(
										'ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white cursor-pointer',
										!canNext && 'bg-neutral-400 cursor-not-allowed',
									)}
									style={canNext ? { backgroundColor: '#0B29FF' } : {}}
								>
									Next <ArrowRight size={16} />
								</button>
							</div>
						</motion.div>
					) : (
						<Form quiz={quiz} setSubmitted={setSubmitted} canSubmit={canNext} />
					)}
				</div>
			) : (
				<div className="p-6 my-6 rounded-3xl bg-white shadow-sm text-center">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-4"
					>
						<h2
							data-testid="thank-you"
							className="text-4xl font-semibold text-blue-700"
						>
							Thank you for the trust.
						</h2>
						<p className="text-neutral-700 text-lg max-w-xl mx-auto">
							We’ll contact you ASAP. Our global team of sharp minds will align,
							scope, and deploy — fast.
						</p>
					</motion.div>
				</div>
			)}
		</section>
	);
};

export default Quiz;
