import { NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await submitContactForm(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] failed', error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
