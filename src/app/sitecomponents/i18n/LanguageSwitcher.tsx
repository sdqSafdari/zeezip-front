"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const router = useRouter()
    const pathname = usePathname()

    const switchLanguage = (lang: string) => {
        if (currentLang === lang) return

        // Get the path without the language prefix
        const pathWithoutLang = pathname?.split("/").slice(2).join("/") || ""
        const newPath = `/${lang}/${pathWithoutLang}`

        router.push(newPath)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLanguage("en")}>English {currentLang === "en" && "✓"}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage("fa")}>فارسی {currentLang === "fa" && "✓"}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

