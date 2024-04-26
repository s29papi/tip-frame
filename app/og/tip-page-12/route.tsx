/* eslint-disable @next/next/no-img-element  */
// @ts-nocheck
import { ImageResponse } from 'next/og'


export const runtime = 'edge';

export async function GET(req: Request) { 
    const { searchParams } = new URL(req.url);
    const amount = searchParams.get('amount')
    const ogImgWithQueryParams = await fetch(new URL('../../../public/Degen.png', import.meta.url)).then(
        (res) => res.arrayBuffer(),
    );

    let statement = "" 
    let tip = "true"
    let tx = "false"
    if (tip == "true") {
        statement = `TIP ${amount} TOSHI`;
    }
    if (tx == "true") {
        statement = `SUCCESSFULLY TIPPED!`;
    }

    const fontData1 = await fetch(
        new URL('../../../assets/PaytoneOne-Regular.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    

   return new ImageResponse (
    (
        <div style={{position: 'relative', display: 'flex'}}>
             <img tw='h-full' alt='image used for no query params' src={ogImgWithQueryParams}/>
             <div tw="flex flex-col w-full h-full absolute">
                <div tw="flex h-full w-full">
                    <div tw="flex flex-col md:flex-row w-full py-12 px-4 justify-between p-8">
                    <div style={{display: 'flex', position: 'absolute', top: '62%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#66757F', fontSize: '72px', fontWeight: '1400'}}> 
                                        <span tw="flex flex-col text-lg sm:text-xl md:flex-row w-full py-12 px-4 justify-between p-8">
                                                <span tw="flex flex-col bottom-7" style={{fontFamily: '"Paytone One"', fontStyle: 'italic'}}>
                                                <span tw="text-7xl top-[0.95] left-[10] text-white">{statement}</span>
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
                name: 'Paytone One',
                data: fontData1,
                style: "normal",
                weight: 900
            },
        ]
    }
   )
}

