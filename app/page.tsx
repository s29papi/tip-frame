import { redirect } from 'next/navigation'
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { gameId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL || "https://www.projectstadium.com/";
const FRAMES_URL = "https://www..com/"; 


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  let imgUrl = new URL("/og/landing", FRAMES_URL).href
  let postUrl = new URL("/", FRAMES_URL).href

  if (Object.keys(searchParams).length !== 0) {
    const gameId = searchParams["gameId"];
    const gameName = searchParams["gameName"]
    const gameSetup = searchParams["gameSetup"]
    const stakeAmount = searchParams["stakeAmount"]
    const creatorFid = searchParams["creatorFid"]
    let queryParams = `gameId=${gameId}&&gameName=${gameName}&&gameSetup=${gameSetup}&&stakeAmount=${stakeAmount}&&creatorFid=${creatorFid}`
    imgUrl += '?'
    imgUrl += queryParams
    postUrl += '?'
    postUrl += queryParams
  }

  let buttonLabel = Object.keys(searchParams).length !== 0 ? 'Accept Challenge' : 'Invalid Game';

  const frameMetadata = getFrameMetadata({
    buttons: [
      {label: buttonLabel, action: 'post'}
    ],
    image: imgUrl,
    post_url: postUrl,
  })

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
