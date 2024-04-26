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
  const gameId:any = searchParams.get("gameId");
  const gameName:any = searchParams.get("gameName");
  const gameSetup:any = searchParams.get("gameSetup");
  const stakeAmount:any = searchParams.get("stakeAmount");
  const creatorFid:any = searchParams.get("creatorFid");
  const buttonId = body.untrustedData.buttonIndex;

  let queryParams = `gameId=${gameId}&&gameName=${gameName}&&gameSetup=${gameSetup}&&stakeAmount=${stakeAmount}&&creatorFid=${creatorFid}`
  const framesUrl = "https://versus-frame.vercel.app"; 
  let imageUrl = new URL(`/og/landing/?${queryParams}`, framesUrl).href
  let unstakeImageUrl = new URL(`/og/start-match/frame_2/?${queryParams}`, framesUrl).href
  let startMatchPostUrl = new URL(`/?${queryParams}`, framesUrl).href
     


  


  return NextResponse.json({ success: 'TX Successful' }, { status: 200 })
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';