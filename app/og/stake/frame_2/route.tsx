/* eslint-disable @next/next/no-img-element  */
// @ts-nocheck
import { ImageResponse } from 'next/og'

export const runtime = 'edge';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    if (searchParams.size != 0) {
        const stakeAmount = searchParams.get('stakeAmount')
        return await ogImgWithQueryParams(stakeAmount)
    }
    
   return await ogImgNoQueryParams()
}

async function ogImgNoQueryParams(): ImageResponse {
    const ImgNoQueryParams = await fetch(new URL('../../../../public/ogImgNoQueryParams.png', import.meta.url)).then(
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

async function ogImgWithQueryParams(stakeAmountWithToken: string): ImageResponse {
    const ogImgWithQueryParams = await fetch(new URL('../../../../public/ogImgWithQueryParams.png', import.meta.url)).then(
        (res) => res.arrayBuffer(),
      );
      const fontData = await fetch(
        new URL('../../../../assets/TitilliumWeb-Italic.ttf', import.meta.url),
      ).then((res) => res.arrayBuffer());
    return new ImageResponse(
        (
            <div style={{position: 'relative', display: 'flex'}}>
                      <img tw='h-full' alt='image used for no query params' src={ogImgWithQueryParams}/>
                        <div 
                            style={{display: 'flex', position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#66757F', fontSize: '72px', fontWeight: '1200', fontFamily: '"Titillium Web"'}}
                        > 
                        <div>SUCCESSFULLY STAKED</div>
                        </div>
            </div>
        ),
        {
            fonts: [
                {
                    name: 'Titillium Web',
                    data: fontData,
                    style: 'italic',
                    weight: 900
                }
            ]
        }
    )
}

