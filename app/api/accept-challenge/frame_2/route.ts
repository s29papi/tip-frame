import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';


/**
 * About stake frame
 * A user stakes to confirm match creation 
 * redirect to the first frame which checks if the match is started if it is started frame should be view match
*/
async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const state:any = searchParams.get("state");
  const gameId:any = searchParams.get("gameId");
  const gameName:any = searchParams.get("gameName");
  const gameSetup:any = searchParams.get("gameSetup");
  const stakeAmount:any = searchParams.get("stakeAmount");
  const creatorFid:any = searchParams.get("creatorFid");
//   const buttonId = body.untrustedData.buttonIndex;
  
  let queryParams = `state=${state}&&gameId=${gameId}&&gameName=${gameName}&&gameSetup=${gameSetup}&&stakeAmount=${stakeAmount}&&creatorFid=${creatorFid}`
  const framesUrl = "https://versus-frame.vercel.app"; 
  let imageUrl = new URL(`/og/landing?${queryParams}`, framesUrl).href
  let postUrl = new URL(`/api/accept-challenge/frame_3?${queryParams}`, framesUrl).href


    return new NextResponse(`<!DOCTYPE html><html><head>
          <title>Start My Match</title>
          <meta property="fc:frame" content="vNext" />        
          <meta property="fc:frame:image" content="${imageUrl}"/>
          <meta property="fc:frame:button:1" content="Stake" />
          <meta property="fc:frame:button:1:action" content="post"/>
          <meta property="fc:frame:post_url" content="${postUrl}"/>
      </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';