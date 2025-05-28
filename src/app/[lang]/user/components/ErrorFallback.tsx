'use client'

import {useParams, useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button";
import {AlertTriangle} from "lucide-react";
import {useEffect, useState} from "react";
import {getClientDictionary} from "@/lib/ClientDictionaries";

type Props = {
    error: Error & { response?: Response }
    resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: Props) {
    const appRouterInstance = useRouter();
    const params = useParams();
    const unauthorized = error.response?.status == 401;
    useEffect(()=>{
        if (unauthorized){
            setInterval(()=> {
                appRouterInstance.push(`/${params.lang}/login`);
            },5 * 1000)
        }
    },[unauthorized,params,appRouterInstance]);
    const clientDictionary = getClientDictionary(params.lang as string);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div
                className={`max-w-md w-full rounded-lg border bg-card p-6 shadow-lg ${params.lang === "fa" ? "font-persian rtl" : ""}`}
            >
                <div className="mb-6 flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-red-500"/>
                    <h2 className="text-2xl font-bold">
                        {unauthorized ?
                            clientDictionary.errorFallback.unauthorized.title :
                            clientDictionary.errorFallback.general.title}</h2>
                </div>

                <p className="mb-4 text-muted-foreground">
                    {unauthorized ?
                        clientDictionary.errorFallback.unauthorized.description :
                        clientDictionary.errorFallback.general.description}
                </p>
                <p className="mb-2 text-sm text-muted-foreground">
                    {unauthorized ?
                        clientDictionary.errorFallback.unauthorized.instruction :
                        clientDictionary.errorFallback.general.instruction}
                </p>
                {unauthorized ? null :
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <Button onClick={resetErrorBoundary} variant="outline">
                        {clientDictionary.errorFallback.general.tryAgain}
                    </Button>
                </div>
                }
            </div>
        </div>
    )
}