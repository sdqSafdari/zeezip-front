"use client"

import type { ReactNode } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarFooter,
} from "@/components/ui/sidebar"
import {FileText, Home, Settings, TvMinimalPlay, Upload, User} from "lucide-react"
import Header from "./header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserInfoDomain from "@/app/[lang]/user/queries/UserInfoDomain";
import ZzipPureLogoSVG from "@/app/svg/zzip-logo-pure.svg";
import Link from "next/link";
import Image from "next/image";
import ZzipLogoSVG from "@/app/svg/zzip-logo.svg";
import {useParams, usePathname} from "next/navigation";


export default function DashboardLayout({ children, userInfo }: { children: ReactNode,userInfo:UserInfoDomain }) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            name: "Dashboard",
            href: `/${params.lang}/user`,
            icon: <Home className="mr-2 h-4 w-4"/>
        },
        {
            name: "My Files",
            href: `/${params.lang}/user/files`,
            icon: <FileText className="mr-2 h-4 w-4"/>
        },
        {
            name: "Stream Download",
            href: `/${params.lang}/user/stream-download`,
            icon: <TvMinimalPlay className="mr-2 h-4 w-4"/>
        }, {
            name: "Account",
            href: `/${params.lang}/user/account`,
            icon: <User className="mr-2 h-4 w-4"/>
        }
    ]
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <Sidebar>
                    <SidebarHeader className="p-4">
                        <Link href={`/`} className="flex items-center gap-2">
                            <ZzipPureLogoSVG width="5em" height="auto"/>
                        </Link>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            {routes.map(route=>{
                                const selectedItemClass= pathname === route.href ? 'bg-gradient-to-r from-blue-500/50 via-blue-600/40 to-transparent text-white hover:text-white' : '';
                                return(
                                <SidebarMenuItem key={route.href}>
                                    <SidebarMenuButton asChild>
                                        <Link href={route.href} className={selectedItemClass}>
                                            {route.icon}
                                            {route.name}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <div className="flex items-start px-2 py-2">
                            <div className="ml-3">
                                <p className="text-sm font-medium">{userInfo.name}</p>
                                <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <div className="flex flex-1 flex-col overflow-hidden w-full">
                    <Header userInfo={userInfo}/>
                    <main className="flex-1 overflow-y-auto bg-background">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}

