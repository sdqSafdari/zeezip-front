import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud } from "lucide-react"
import { getDictionary } from "@/lib/dictionaries"
import GoogleSignInButton from "@/app/[lang]/login/GoogleSignInButton";
import ModeToggle from "@/app/sitecomponents/fixed/ThemeButton";
import styles from "./login.module.css";
import {cn} from "@/lib/utils";
import ZzipLogoSVG from "@/app/svg/zzip-logo-pure.svg";
import WebSiteMechanism from "../unified-media-downloader.svg";
import {LanguageSwitcher} from "@/app/sitecomponents/i18n/LanguageSwitcher";


export default async function LoginPage({
                                            params,
                                        }: {
    params: { lang: string }
}) {
    const dict = await getDictionary(params.lang)

    return (
        <div className={`min-h-screen flex flex-col ${params.lang === "fa" ? "font-persian rtl" : ""}`}>
            <div className={cn("absolute top-4 md:top-8 z-10 flex gap-4",params.lang === "fa"? "left-4 md:left-8" : "right-4 md:right-8")}>
                <ModeToggle />
                <LanguageSwitcher currentLang={params.lang} />
                <Link href={`/${params.lang}`} className="flex items-center gap-2">
                    <ZzipLogoSVG height="auto" width="6em"/>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row flex-1">
                {/* Image Section */}
                <div className={cn(styles.bgVars,"relative hidden md:block md:w-1/2 bg-gradient-to-br from-primary/10 to-primary/30 overflow-hidden")}>
                    <div className={cn(styles.bgGridPattern,"absolute inset-0 bg-grid-pattern opacity-10")}></div>

                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="relative w-full max-w-md aspect-square">
                            <div className={cn(styles.animateFloat,"absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-2xl backdrop-blur-sm")}></div>
                            <div className={cn(styles.animateFloatDelay,"absolute bottom-10 right-10 w-40 h-40 bg-primary/20 rounded-full backdrop-blur-sm")}></div>

                            <div className="relative direction-ltr z-10 bg-background/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-border/50 transform transition-all duration-500 hover:scale-105">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <ZzipLogoSVG height="auto" width="6em"/>
                                    </div>
                                    <div className="text-xs text-muted-foreground">2.4 MB</div>
                                </div>
                                <div className="flex justify-center">
                                    <WebSiteMechanism width="15em" height="auto"/>
                                </div>
                            </div>

                            <div className="absolute z-0 bottom-0 right-0 transform translate-y-1/4 translate-x-1/4">
                                <div className="relative w-64 h-64 bg-background/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-border/50">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <ZzipLogoSVG height="auto" width="4em"/>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="w-full h-24 bg-muted rounded-lg"></div>
                                        <div className="h-2 bg-muted rounded-full w-full"></div>
                                        <div className="h-2 bg-muted rounded-full w-2/3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 text-lg font-medium">
                        <div className="flex flex-col gap-1">
                            <div>{dict.login.imageTitle}</div>
                            <div className="text-sm text-muted-foreground">{dict.login.imageSubtitle}</div>
                        </div>
                    </div>
                </div>

                {/* Login Form Section */}
                <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
                    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-card/80 border-border/50 shadow-lg">
                        <CardHeader className="space-y-1 text-center">

                            <CardTitle className="text-2xl font-bold tracking-tight">{dict.login.title}</CardTitle>
                            <CardDescription>{dict.login.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">{dict.login.continueWith}</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <GoogleSignInButton lang={params.lang} className="mt-2"/>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 text-center text-sm">
                            <div>
                                <Link
                                    href={`/${params.lang}`}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {dict.login.backToHome}
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

