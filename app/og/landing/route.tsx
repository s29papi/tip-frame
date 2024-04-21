/* eslint-disable @next/next/no-img-element  */
// @ts-nocheck
import { ImageResponse } from 'next/og'

export const runtime = 'edge';

export async function GET(req: Request) {
    enum FrameState {
        Stake = "stake",
        AcceptChallenge = "accept-challenge",
        StartMatch = "start-match", 
        CompleteMatch = "complete-match"
      }

    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state')
    if (FrameState.Stake == state) {
        const stakeAmount = searchParams.get('stakeAmount')
        const statement = `STAKE` + stakeAmount
        return await ogImgWithQueryParams(statement)
    }
    if (FrameState.AcceptChallenge == state) {
        return await ogImgNoQueryParams()
    }
    
    if (FrameState.StartMatch == state) {
        const statement = `READY TO START CHALLENGE ?`
        return await ogImgWithQueryParams(statement)
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
                      <div>d</div>
            </div>
        )
    )
}

async function ogImgWithQueryParams(statement: string): ImageResponse {
    const ogImgWithQueryParams = await fetch(new URL('../../../public/ogImgWithQueryParams.png', import.meta.url)).then(
        (res) => res.arrayBuffer(),
      );
      const fontData = await fetch(
        new URL('../../../assets/TitilliumWeb-Italic.ttf', import.meta.url),
      ).then((res) => res.arrayBuffer());
    return new ImageResponse(
        (
            <div style={{position: 'relative', display: 'flex'}}>
                      <img tw='h-full' alt='image used for no query params' src={ogImgWithQueryParams}/>
                        <div 
                            style={{display: 'flex', position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#66757F', fontSize: '72px', fontWeight: '1200', fontFamily: '"Titillium Web"'}}
                        > 
                            <span>
                                {statement}
                            </span>
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

