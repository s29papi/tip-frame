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
    if (searchParams.size != 0) {
        const statement = `SUCCESSFULLY STAKED`
        return await ogImgWithStatement(stakeAmount, creatorFid, gameName, gameSetup, statement)
    }
    
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

async function ogImgWithStatement(stakeAmount: string, creatorFid: string, gameName: string, gameSetup: string, statement: string): ImageResponse {
    const ogImgWithQueryParams = await fetch(new URL('../../../../public/ogImgWithQueryParams.png', import.meta.url)).then(
        (res) => res.arrayBuffer(),
    );

    const fontData1 = await fetch(
                 new URL('../../../../assets/TitilliumWeb-SemiBoldItalic.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    const fontData2 = await fetch(
                 new URL('../../../../assets/TitilliumWeb-Regular.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    const options = {
        method: 'GET',
        headers: {accept: 'application/json', api_key: 'NEYNAR_API_DOCS'}
      };
      

    const userJson = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${creatorFid}&viewer_fid=${creatorFid}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

    const pfpUrl = userJson.users[0].pfp_url;
   


    return new ImageResponse(
        (
            <div style={{position: 'relative', display: 'flex'}}>
                <img tw='h-full' alt='image used for no query params' src={ogImgWithQueryParams}/>
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
                                <div style={{display: 'flex', position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#66757F', fontSize: '72px', fontWeight: '1400'}}> 
                                        <span tw="flex flex-col text-lg sm:text-xl md:flex-row w-full py-12 px-4 justify-between p-8">
                                                <span tw="flex flex-col bottom-7" style={{fontFamily: '"Titillium Web SemiBoldItalic"', fontStyle: 'italic'}}>
                                                <span tw="text-7xl top-[15.95] left-[10] text-gray-500">{statement}</span>
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
                    name: 'Titillium Web SemiBoldItalic',
                    data: fontData1,
                    style: 'italic',
                    weight: 900
                },
                {
                    name: 'Titillium Web Regular',
                    data: fontData2,
                    style: "normal",
                    weight: 900
                },
            ]
        }
    )
}






