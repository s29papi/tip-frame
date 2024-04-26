import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseEther, parseUnits  } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';
import { getFarcasterUserAddress } from '@coinbase/onchainkit/farcaster';
 
import ToshiBaseABI from "../../contracts-utils/toshi-abi";
import { TOSHI_BASE_CONTRACT_ADDR } from '../../config';


async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const { searchParams } = new URL(req.url);
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
    const toshi_amount = searchParams.get('amount')
    const fid = searchParams.get('fid')
    
    if (!isValid) {
      return new NextResponse('Message not valid', { status: 500 });
    }

    let data;


    if (fid) {
      const farcasterUserAddress = await getFarcasterUserAddress(parseInt(fid), {
        neynarApiKey: 'NEYNAR_ONCHAIN_KIT', 
      });
      let recAddr = farcasterUserAddress?.verifiedAddresses
    
  
      if (recAddr && toshi_amount) {
       data = encodeFunctionData({
          abi: ToshiBaseABI,
          functionName: 'transfer',
          args: [`0x${recAddr[0].slice(2)}`, parseUnits(toshi_amount, 18) ], 
        });
      }
  
    }

    
   
  
    const txData: FrameTransactionResponse = {
        chainId: `eip155:${base.id}`,
        method: 'eth_sendTransaction',
        params: {
            abi: [],
            data,
            to: TOSHI_BASE_CONTRACT_ADDR,
            value: parseEther('0.00000').toString(),
        },
    };
    
    return NextResponse.json(txData);
}



export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
  }
  
  export const dynamic = 'force-dynamic';