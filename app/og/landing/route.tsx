/* eslint-disable @next/next/no-img-element  */
/* eslint-disable jsx-ally/alt-text */
// @ts-nocheck
import { ImageResponse } from 'next/og'

export const runtime = 'edge';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    if (searchParams.size != 0) {
        
    }
    
   return await ogImgNoQueryParams()
}

async function ogImgNoQueryParams(): ImageResponse {
    const ImgNoQueryParams = await fetch(new URL('../../../public/ogImgNoQueryParams.png', import.meta.url)).then(
        (res) => res.arrayBuffer(),
      );
    return new ImageResponse(
        (
            <div style={{position: 'relative', display: 'flex'}}>
                      <img tw='h-full' alt='image used for no query params' src={ImgNoQueryParams}/>
            </div>
        )
    )
}

