import { redirect } from 'next/navigation'
import { FrameButtonMetadata, FrameInputMetadata, getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata, ResolvingMetadata } from 'next';


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
const FRAMES_URL = "https://versus-frame.vercel.app"; 

/**
 * Rulesets:
 * Demo-Url: https://versus-frame.vercel.app/?state=stake&&gameId=1&&gameName=Test%20Game&&gameSetup=one%20two&&stakeAmount=100%20usdc&&creatorFid=112
 * Valid-Game-URL: ?state=${state}&&gameId=${gameId}&&gameName=${gameName}&&gameSetup=${gameSetup}&&stakeAmount=${stakeAmount}&&creatorFid=${creatorFid}
*/
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let imgUrl = new URL("/og/landing", FRAMES_URL).href
  let postUrl = new URL("/", FRAMES_URL).href
  let state; 
  let buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] = [{ label: "", action: 'post' },];

  // if (searchParams) {
  //   state = searchParams["state"];
  //   const gameId = searchParams["gameId"];
  //   const gameName = searchParams["gameName"];
  //   const gameSetup = searchParams["gameSetup"];
  //   const stakeAmount = searchParams["stakeAmount"];
  //   const creatorFid = searchParams["creatorFid"];
  //   let queryParams = `state=${state}&gameId=${gameId}&gameName=${gameName}&gameSetup=${gameSetup}&stakeAmount=${stakeAmount}&creatorFid=${creatorFid}`
  //   imgUrl += '?'
  //   imgUrl += queryParams
  //   postUrl += '?'
  // }

  // if (searchParams.state) {
  //   if (state == State.Stake) {
  //     let buttonLabel = "Stake"
  //     buttons = [
  //       {label: buttonLabel, action: 'post'}
  //     ]
  //   }

  //   if(state == State.AcceptChallenge) {
  //     let buttonLabel = "Accept Challenge"
  //     buttons = [
  //       {label: buttonLabel, action: 'post'}
  //     ]
  //   }

  //   if (state == State.StartMatch) {
  //     let buttonLabel = "Start Match"
  //     buttons = [
  //       {label: buttonLabel, action: 'post'}
  //     ]
  //   }

  //   postUrl += "/api"
  // }

  if (!searchParams) {
    let buttonLabel = 'Invalid Games';
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
