import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';



async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const framesUrl = "https://tip-frame.vercel.app"; 
  let imageUrl = new URL(`/og/tipPage`, framesUrl).href
  let postUrl = new URL(`/`, framesUrl).href


    return new NextResponse(`<!DOCTYPE html><html><head>
          <title>Start My Match</title>
          <meta property="fc:frame" content="vNext" />        
          <meta property="fc:frame:image" content="${imageUrl}"/>
          <meta property="fc:frame:button:1" content="TIP Status" />
          <meta property="fc:frame:button:1:action" content="post"/>
          <meta property="fc:frame:post_url" content="${postUrl}"/>
      </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';