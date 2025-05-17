"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import {cn} from "@/lib/utils";
import Cookies from 'js-cookie';

export function LanguageSwitcher({ currentLang,children,className }: { currentLang: string,children?:React.ReactNode,className?:string }) {
    const router = useRouter()
    const pathname = usePathname()

    const switchLanguage = (lang: string) => {
        if (currentLang === lang) return

        // Get the path without the language prefix
        const pathWithoutLang = pathname?.split("/").slice(2).join("/") || ""
        const newPath = `/${lang}/${pathWithoutLang}`

        Cookies.set('lang',lang,{
            path: '/',
            // No expiration makes it a session cookie that persists until deleted
            // But to make it truly persistent across sessions, set a far future date
            expires: 365 * 10, // 10 years ~ "permanent"
            sameSite: 'Lax',
            secure: true,
        });
        router.push(newPath);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("flex justify-start gap-2",className)}>
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    {children}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLanguage("en")}>English {currentLang === "en" && "✓"}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage("fa")}>فارسی {currentLang === "fa" && "✓"}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

