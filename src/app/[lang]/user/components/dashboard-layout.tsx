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
import { FileText, Home, Settings, Upload, User } from "lucide-react"
import Header from "./header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserInfoDto from "@/app/[lang]/user/UserInfoDto";
import ZzipPureLogoSVG from "@/app/svg/zzip-logo-pure.svg";
import Link from "next/link";
import Image from "next/image";
import ZzipLogoSVG from "@/app/svg/zzip-logo.svg";


export default function DashboardLayout({ children, userInfo }: { children: ReactNode,userInfo:UserInfoDto }) {
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
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={'/user'}>
                                        <Home className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/user/files">
                                        <FileText className="mr-2 h-4 w-4" />
                                        My Files
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/user/upload">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/user/account">
                                        <User className="mr-2 h-4 w-4" />
                                        Account
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/user/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
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

