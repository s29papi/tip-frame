import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit';

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const txhash = searchParams.get('txhash')
  return NextResponse.redirect(`https://tip-frame.vercel.app/redirect?txhash=${txhash}`, {status: 302});
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';