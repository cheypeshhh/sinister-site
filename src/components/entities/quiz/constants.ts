export type QuizState = {
	projectType: string;
	scope: string[];
	budget: string;
	timeline: string;
	companySize: string;
	companyLocated: string;
};

export type QuizStepType = {
	key: keyof QuizState;
	title: string;
	subtitle: string;
	type: 'single' | 'multi';
	options: Array<{
		value: string;
		label: string;
		desc?: string;
		details?: string[];
	}>;
};

export const QUIZ_STEPS: QuizStepType[] = [
	{
		key: 'projectType',
		title: 'What are you building?',
		subtitle: 'Pick the closest match.',
		type: 'single',
		options: [
			{
				value: 'website',
				label: 'Website',
				desc: 'Company site, landing pages.',
				details: [
					'Responsive design for all devices',
					'SEO optimization and fast loading times',
					'CMS integration (WordPress, Headless)',
					'Custom animations and interactions',
					'Hosting setup + analytics',
				],
			},
			{
				value: 'webapp',
				label: 'Web Application',
				desc: 'SaaS, dashboards, portals, or internal tools.',
				details: [
					'Auth & roles (SSO, multi-tenant)',
					'API-first (REST/GraphQL)',
					'Billing/subscriptions (Stripe, Paddle)',
					'Integrations (HubSpot, Salesforce, Slack, …)',
					'Analytics + event tracking',
					'Admin panel + audit logs',
				],
			},
			{
				value: 'mobile',
				label: 'Mobile App',
				desc: 'iOS/Android with modern stacks.',
				details: [
					'React Native/Flutter or native',
					'Push notifications + offline',
					'Secure auth + API integration',
					'App Store / Play deploy',
					'Ongoing maintenance',
				],
			},
			{
				value: 'ecommerce',
				label: 'E-commerce',
				desc: 'Stores, subscriptions, payments.',
				details: [
					'Shopify/WooCommerce/custom',
					'Stripe/PayPal gateways',
					'Inventory + order management',
					'Personalization',
					'Perf + analytics',
				],
			},
		],
	},
	{
		key: 'scope',
		title: 'Which capabilities do you need?',
		subtitle: 'Select all that apply.',
		type: 'multi',
		options: [
			{ value: 'design', label: 'Product/UX Design' },
			{ value: 'frontend', label: 'Frontend Engineering' },
			{ value: 'backend', label: 'Backend & APIs' },
			{ value: 'payments', label: 'Payments & Billing' },
			{ value: 'ai', label: 'AI/ML Features' },
			{ value: 'ops', label: 'DevOps & Cloud' },
			{ value: 'growth', label: 'Analytics & Growth' },
			{ value: 'crm', label: 'CRM Integration' },
			{ value: 'branding', label: 'Branding' },
			{ value: 'other', label: 'Not sure / Other' },
		],
	},
	{
		key: 'budget',
		title: 'Working budget range',
		subtitle: 'A ballpark helps us right-size the team.',
		type: 'single',
		options: [
			{ value: 'lt25', label: '<$25k' },
			{ value: '25-75', label: '$25k–$75k' },
			{ value: '75-150', label: '$75k–$150k' },
			{ value: 'gt150', label: '>$150k' },
		],
	},
	{
		key: 'timeline',
		title: 'Timeline',
		subtitle: 'When do you want to start?',
		type: 'single',
		options: [
			{ value: 'asap', label: 'ASAP (next 2–4 weeks)' },
			{ value: 'soon', label: 'Soon (1–2 months)' },
			{ value: 'later', label: 'Later (3+ months)' },
			{ value: 'continuous', label: 'Continuous development' },
		],
	},
	{
		key: 'companySize',
		title: 'Company size',
		subtitle: 'Helps with process fit.',
		type: 'single',
		options: [
			{ value: 'solo', label: 'Solo / Pre-seed' },
			{ value: '1-10', label: '1–10' },
			{ value: '11-50', label: '11–50' },
			{ value: '51-200', label: '51–200' },
			{ value: '200+', label: '200+' },
		],
	},
	{
		key: 'companyLocated',
		title: 'Where is your business located?',
		subtitle: 'Helps with process fit.',
		type: 'single',
		options: [
			{
				value: 'GCC',
				label: 'GCC',
				desc: 'Qatar, UAE, Saudi Arabia, etc',
			},
			{
				value: 'USA',
				label: 'USA',
			},
			{
				value: 'Europe',
				label: 'Europe',
			},
			{
				value: 'Other',
				label: 'Other',
			},
		],
	},
];
