import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseEther, parseUnits  } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import ToshiBaseABI from "../../contracts-utils/toshi-abi";
import { TOSHI_BASE_CONTRACT_ADDR } from '../../config';
import { RECIEVER_ADDR } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
    const body: FrameRequest = await req.json();
    const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  
    if (!isValid) {
      return new NextResponse('Message not valid', { status: 500 });
    }

    const data = encodeFunctionData({
        abi: ToshiBaseABI,
        functionName: 'transfer',
        args: [RECIEVER_ADDR, parseUnits('1', 18) ], 
      });

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