import { FrameButtonMetadata, FrameInputMetadata, getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> { 
  const framesUrl = new URL("https://tip-frame.vercel.app"); 
  let imgUrl = new URL("/og/tip-page-12", framesUrl).href
  let postUrl = new URL("/api/tip-toshi-success", framesUrl).href
  let txPostUrl = new URL("/api/tip-toshi-tx", framesUrl).href
  let frameMetadata;
  let buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] = [{ label: "", action: 'post' },];

  if (searchParams) {
    let amount = searchParams["amount"];
    let tip = searchParams["tip"];
    let fid = searchParams["fid"];
    imgUrl += '?' + `amount=${amount}` + "&&" + `tip=${tip}`
    txPostUrl += '?' + `amount=${amount}` + "&&" + `fid=${fid}`
    buttons = [
      {label: 'TIP', action: 'tx', target: txPostUrl, postUrl: postUrl },
    ]

    frameMetadata = getFrameMetadata({
      buttons: buttons,
      image: imgUrl,
      post_url: postUrl,
    });
  }

  return {
    title: 'Toshi Pay',
    description: 'Tip Toshi To any one in frame',
    openGraph: {
      title: 'Toshi Pay',
      description: 'Tip Toshi To any one in frame',
      images: [imgUrl],
    },
    other: {
      ...frameMetadata
    }
  }
}

export default async function Page() {
  return (
    <div>Tip Frame</div>
  )
}
