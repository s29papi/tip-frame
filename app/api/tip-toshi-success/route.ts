import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/firebase-db/firebase-setup';
import { Firestore, collection, addDoc, updateDoc } from 'firebase/firestore/lite';

// (async (db: Firestore) => {
//   const tipCollection = collection(db, 'tip')
//   await addDoc(tipCollection, {tipId: 0, tipped: true })
// })(db)

const FRAMES_URL = process.env.FRAMES_URL || "https://tip-frame.vercel.app"
const imageUrl = new URL("/og/tipPage", FRAMES_URL).href
const postUrl = new URL("/", FRAMES_URL).href
async function getResponse(req: NextRequest): Promise<NextResponse> {
  // await markAsTipped(db)
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body);
  const postUrl = new URL(`/${body.untrustedData.transactionId}`, FRAMES_URL).href
  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }
  const options = {
    method: 'GET',
    headers: {accept: 'application/json'}
  };

  let data = await fetch("https://www.google.com", options)
  

    return new NextResponse(`<!DOCTYPE html><html><head>
            <title>Start My Match</title>
            <meta property="fc:frame" content="vNext" />        
            <meta property="fc:frame:image" content="${imageUrl}"/>
            <meta property="fc:frame:button:1" content="TIP Statussssssssssssssssssssssssss" />
            <meta property="fc:frame:button:1:action" content="post"/>
            <meta property="fc:frame:post_url" content="${postUrl}?${data.ok}"/>
        </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';

