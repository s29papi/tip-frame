import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const FRAMES_URL = process.env.FRAMES_URL || "https://tip-frame.vercel.app"
const imageUrl = new URL("/og/tipPage", FRAMES_URL).href
const postUrl = new URL("/", FRAMES_URL).href

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'TIP', action: 'post'},
  ],
  image: imageUrl,
  post_url: postUrl,

});

export const metadata: Metadata = {
  title: 'TIP FRAME.',
  description: 'A frame to Tip a facaster',
  openGraph: {
    title: 'TIP FRAME.',
    description: 'A frame to Tip a facaster',
    images: [imageUrl],
  },
  other: {
    'of:accepts:xmtp': '2024-02-01',
    ...frameMetadata,
  },
};

export default async function Page() {
  return (
    <div>Tip Frame</div>
  )
}
