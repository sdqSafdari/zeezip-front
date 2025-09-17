"use client"

import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "@/app/[lang]/user/components/ErrorFallback";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ErrorBoundary
            fallbackRender={(props) => <ErrorFallback {...props} />}>
            {children}
        </ErrorBoundary>
    );
}