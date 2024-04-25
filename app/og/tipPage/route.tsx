/* eslint-disable @next/next/no-img-element  */
// @ts-nocheck
import { ImageResponse } from 'next/og'
import { db } from '@/app/firebase-db/firebase-setup';
import { Firestore, collection, addDoc, updateDoc } from 'firebase/firestore/lite';

export const runtime = 'edge';

export async function GET(req: Request) { 
    const tipCollection = collection(db, 'tip')
    let val = await addDoc(tipCollection, {tipId: 0, tipped: true })
   return new ImageResponse (
    (
        <div>
            Hello, World {val.id}
        </div>
    )
   )
}