"use client"

import {QueryErrorResetBoundary, useQuery} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "@/app/[lang]/user/components/ErrorFallback";
import UserDashboard from "@/app/[lang]/user/UserDashboard";

export default function UserPage() {

    return (
            <UserDashboard/>
    )
}