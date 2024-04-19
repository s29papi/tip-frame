import { redirect } from 'next/navigation'
import { FrameButtonMetadata, FrameInputMetadata, getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata, ResolvingMetadata } from 'next';
import { InvalidStorageKeySizeError } from 'viem';
import { FrameData } from '@coinbase/onchainkit/frame';

type Props = {
  params: { gameId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

enum State {
  Stake = "stake",
  AcceptChallenge = "accept-challenge",
  StartMatch = "start-match", 
  CompleteMatch = "complete-match"
}


const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL || "https://www.projectstadium.com/";
const FRAMES_URL = "https://versus-frame.vercel.app/"; 

/**
 * Rulesets:
 * 
 * Valid-Game-URL: ?state=${state}&&gameId=${gameId}&&gameName=${gameName}&&gameSetup=${gameSetup}&&stakeAmount=${stakeAmount}&&creatorFid=${creatorFid}
*/
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let imgUrl = new URL("/og/landing", FRAMES_URL).href
  let postUrl = new URL("/", FRAMES_URL).href
  let state; 
  let input: boolean = false;
  let inputLabel: FrameInputMetadata = { text: ""};
  let buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] = [{ label: "", action: 'post' },];

  if (Object.keys(searchParams).length !== 0) {
    state = searchParams["state"];
    const gameId = searchParams["gameId"];
    const gameName = searchParams["gameName"];
    const gameSetup = searchParams["gameSetup"];
    const stakeAmount = searchParams["stakeAmount"];
    const creatorFid = searchParams["creatorFid"];
    let queryParams = `state=${state}&&gameId=${gameId}&&gameName=${gameName}&&gameSetup=${gameSetup}&&stakeAmount=${stakeAmount}&&creatorFid=${creatorFid}`
    imgUrl += '?'
    imgUrl += queryParams
    postUrl += '?'
    postUrl += queryParams
  }

  if (Object.keys(searchParams).length !== 0) {
    if (state == State.Stake) {
      let buttonLabel = "Stake"
      buttons = [
        {label: buttonLabel, action: 'post'}
      ]
    }

    if(state == State.AcceptChallenge) {
      let buttonLabel = "Accept Challenge"
      buttons = [
        {label: buttonLabel, action: 'post'}
      ]
    }

    if (state == State.StartMatch) {
      let buttonLabel = "Start Match"
      buttons = [
        {label: buttonLabel, action: 'post'}
      ]
    }
  }

  if (Object.keys(searchParams).length == 0) {
    let buttonLabel = 'Invalid Game';
    buttons = [
      {label: buttonLabel, action: 'post'}
    ]
  }

  let frameMetadata = getFrameMetadata({
                        buttons: buttons,
                        image: imgUrl,
                        post_url: postUrl,
                      });


  return {
    title: 'Versus By Stadium',
    description: 'Bets and Stake management in a frame',
    openGraph: {
      title: 'Versus By Stadium',
      description: 'Bets and Stake management in a frame',
      images: [imgUrl],
    },
    other: {
      ...frameMetadata
    }
  }
}

export default async function Page() {
  redirect(REDIRECT_URL);
}
