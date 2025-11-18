import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const YOUR_EMAIL = 'info@sinisterconsulting.com';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, company, website, message, quiz } = body;

		if (!name || !email) {
			return NextResponse.json(
				{
					error: 'All required fields must be filled and consent given.',
				},
				{ status: 400 },
			);
		}

		await resend.emails.send({
			from: YOUR_EMAIL,
			to: YOUR_EMAIL,
			subject: `New Sinister lead: ${name.name || 'Unknown'}`,
			text: `
Name: ${name}
Email: ${email}
Company: ${company || '—'}
Website: ${website || '—'}
Message: ${message}
Data:
${quiz}
    `.trim(),
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: unknown) {
		console.error('Email sending error:', error);
		return NextResponse.json(
			{ error: 'Failed to send message. Please try again later.' },
			{ status: 500 },
		);
	}
}
