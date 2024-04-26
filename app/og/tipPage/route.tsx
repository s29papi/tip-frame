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
        <div style={{position: 'relative', display: 'flex'}}>
             <img tw='h-full' alt='image used for no query params' src={ogImgWithQueryParams}/>
             <div tw="flex flex-col w-full h-full absolute">
                dgd
             </div>
        </div>
    )
   )
}

