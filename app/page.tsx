import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { db } from '@/app/firebase-db/firebase-setup';
import { Firestore, collection, addDoc, updateDoc } from 'firebase/firestore/lite';

const FRAMES_URL = process.env.FRAMES_URL || "https://tip-frame.vercel.app"
const imageUrl = new URL("/og/tipPage", FRAMES_URL).href
const tipCollection = collection(db, 'tip')

const postUrl = new URL(`/api/tip-toshi-success?${tipCollection.id}`, FRAMES_URL).href

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'TIP', action: 'tx', target: `${FRAMES_URL}/api/tip-toshi-tx`, postUrl: `${FRAMES_URL}/api/tip-toshi-success` },
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
