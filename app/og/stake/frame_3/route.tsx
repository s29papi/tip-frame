/* eslint-disable @next/next/no-img-element  */
// @ts-nocheck
import { ImageResponse } from 'next/og'

export const runtime = 'edge';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state')
    const gameName = searchParams.get('gameName');
    const gameSetup = searchParams.get('gameSetup');
    const creatorFid = searchParams.get('creatorFid');
    const stakeAmount = searchParams.get('stakeAmount')

    
    return await ogImgNoStatement(stakeAmount, creatorFid, gameName, gameSetup)
}

async function ogImgNoStatement(stakeAmount: string, creatorFid: string, gameName: string, gameSetup: string): ImageResponse {
    const ImgNoQueryParams = await fetch(new URL('../../../../public/ogImgNoQueryParams.png', import.meta.url)).then(
        (res) => res.arrayBuffer(),
      );

    const options = {
        method: 'GET',
        headers: {accept: 'application/json', api_key: 'NEYNAR_API_DOCS'}
    };
      

    const userJson = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${creatorFid}&viewer_fid=${creatorFid}`, options)
      .then(response => response.json())
      .catch(err => console.error(err));
  
    const pfpUrl = userJson.users[0].pfp_url;       

    const fontData1 = await fetch(
        new URL('../../../../assets/TitilliumWeb-Regular.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div style={{position: 'relative', display: 'flex'}}>
                      <img tw='h-full' alt='image used for no query params' src={ImgNoQueryParams}/>
                      <div tw="flex flex-col w-full h-full absolute">
                        <div tw="flex h-full w-full">
                            <div tw="flex flex-col md:flex-row w-full py-12 px-4 justify-between p-8">
                                <div tw="flex flex-col text-xl sm:text-3xl mt-6 mr-6 ml-6 mb-6 font-bold tracking-tight text-black text-left">
                                    <span tw="flex flex-col text-lg sm:text-xl md:flex-row w-full py-12 px-4 justify-between p-8">
                                        <span tw="bottom-16 right-11" style={{ borderRadius: "50%", overflow: 'hidden'}}>
                                            <img tw="w-[180px] h-[182px]" alt='image used for user pfp'
                                                    src={pfpUrl}
                                            /> 
                                        </span>  
                                        <span tw="flex flex-col bottom-7" style={{fontFamily: '"Titillium Web Regular"'}}>
                                           <span tw="text-5xl text-gray-400">{stakeAmount} open challenge</span>
                                           <span tw="text-7xl top-[0.95]">{gameName}{" "}/{" "}{gameSetup}</span>
                                        </span>  
                                    </span>  
                                        </div>
                                    </div>
                                </div>
                        </div>
            </div>
        ),
        {
            fonts: [
                {
                    name: 'Titillium Web Regular',
                    data: fontData1,
                    style: "normal",
                    weight: 900
                },
            ]
        }
    )
}


