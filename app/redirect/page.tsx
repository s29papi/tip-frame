'use client';
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function RedirectPage() {
    const searchParams = useSearchParams()
    const router = useRouter();

    const txhash = searchParams.get('txhash')

    useEffect(() => {
        const baseUrl = `https://basescan.org/tx/${txhash}`;

        // Perform the redirect
        window.location.href = baseUrl;
    }, [router, txhash
        
    ]);

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
}