/* eslint-disable @next/next/no-img-element  */
// @ts-nocheck
import { ImageResponse } from 'next/og'


export const runtime = 'edge';

export async function GET(req: Request) { 
    const ogImgWithQueryParams = await fetch(new URL('../../../public/Degen.png', import.meta.url)).then(
        (res) => res.arrayBuffer(),
    );
   return new ImageResponse (
    (
<div>djdjd</div>
    )
   )
}

