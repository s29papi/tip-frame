import { FrameButtonMetadata, FrameInputMetadata, getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata, ResolvingMetadata } from 'next';


type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}



/**
 * Rulesets:
 * Demo-Url: https://versus-frame.vercel.app/?state=stake&&gameId=1&&gameName=Test%20Game&&gameSetup=one%20two&&stakeAmount=100%20usdc&&creatorFid=112
 * Valid-Game-URL: ?state=${state}&&gameId=${gameId}&&gameName=${gameName}&&gameSetup=${gameSetup}&&stakeAmount=${stakeAmount}&&creatorFid=${creatorFid}
 * Each state has it's own api
*/
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const framesUrl = new URL("https://versus-frame.vercel.app"); 
  let imgUrl = new URL("/og/landing", framesUrl).href
  let postUrl = new URL("/api", framesUrl).href
  let state;

  enum FrameState {
    Stake = "stake",
    AcceptChallenge = "accept-challenge",
    StartMatch = "start-match", 
    CompleteMatch = "complete-match"
  }

  let buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] = [{ label: "", action: 'post' },];

  if (searchParams) {
    state = searchParams["state"];
    const gameId = searchParams["gameId"];
    const gameName = searchParams["gameName"];
    const gameSetup = searchParams["gameSetup"];
    const stakeAmount = searchParams["stakeAmount"];
    const creatorFid = searchParams["creatorFid"];
    let queryParams = `state=${state}&gameId=${gameId}&gameName=${gameName}&gameSetup=${gameSetup}&stakeAmount=${stakeAmount}&creatorFid=${creatorFid}`
    imgUrl += '?' + queryParams
  


    if (state == FrameState.Stake) {
      let buttonLabel = "Stake"
      buttons = [
        {label: buttonLabel, action: 'post'}
      ]
      postUrl += "/stake/frame_2"
      postUrl += '?' + queryParams
    }

    if (state == FrameState.AcceptChallenge) {
      let buttonLabel = "Accept Challenge"
      buttons = [
        {label: buttonLabel, action: 'post'}
      ]
      postUrl += "/accept-challenge/frame_2"
      postUrl += '?' + queryParams
    }

    if (state == FrameState.StartMatch) {
      let buttonLabel_1 = "Ready up!"
      let buttonLabel_2 = "Forfeit"
      buttons = [
        {label: buttonLabel_1, action: 'post'},
        {label: buttonLabel_2, action: 'post'},
      ]
      postUrl += "/start-match/frame_2"
      postUrl += '?' + queryParams
    }

    if (state == FrameState.CompleteMatch) {
      let buttonLabel = "Claim"
      buttons = [
        {label: buttonLabel, action: 'post'} // change to tx
      ]
    }


    if (state != FrameState.Stake && state != FrameState.AcceptChallenge && state != FrameState.StartMatch && state != FrameState.CompleteMatch) {
      let buttonLabel = 'Invalid Games';
      buttons = [
        {label: buttonLabel, action: 'post'}
      ]
    }
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
  return (
    <div>Versus By Stadium.</div>
  )
}
