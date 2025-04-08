"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {cn} from "@/lib/utils";

export default function ModeToggle({children,className}:{children?:React.ReactNode,className?:string}) {
    const { theme,setTheme } = useTheme();

    return (
                <Button variant="ghost" onClick={()=>theme=='dark'?setTheme('light'):setTheme('dark')} className={cn("flex gap-2 justify-start",className)}>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    {children}
                </Button>
    )
}
