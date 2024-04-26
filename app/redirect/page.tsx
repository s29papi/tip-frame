'use client';
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectPage() {
    const router = useRouter();
    const { query } = router;
    const { txhash } = query;

    useEffect(() => {
        if (txhash) {
            const baseUrl = `https://basescan.org/tx/${txhash}`;
            window.location.href = baseUrl;
        }
    }, [router, txhash]);

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
}