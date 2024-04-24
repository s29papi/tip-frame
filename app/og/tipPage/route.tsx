/* eslint-disable @next/next/no-img-element  */
// @ts-nocheck
import { ImageResponse } from 'next/og'

export const runtime = 'edge';

export async function GET(req: Request) { 
   return ImageResponse (
    (
        <div>
            Hello, World
        </div>
    )
   )
}