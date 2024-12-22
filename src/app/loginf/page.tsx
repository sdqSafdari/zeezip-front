"use client"

import Navbar from "@/app/sitecomponents/fixed/Navbar";
import FlickeringGrid from "@/components/ui/flickering-grid";
import Script from "next/script";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import GoogleSvgComponent from "./google-icon.svg";

export default function Login() {
    return (
        <>
            {/*<Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload"/>*/}
            <div className='relative z-10 mx-4 h-screen overflow-hidden'>
                <Navbar />
                <VideoComponent />
                <div className="flex items-end justify-end">
                    <div className="relative w-full md:w-3/4 h-screen bg-background">
                        <FlickeringGrid
                            className="absolute z-0 inset-0 size-full"
                            squareSize={4}
                            gridGap={6}
                            color="#15803D"
                            maxOpacity={0.5}
                            flickerChance={0.03}
                        />
                        <div className="h-screen w-full flex flex-col justify-center items-center">
                            <div className="w-1/3 h-1/4 rounded-md relative z-30">
                                <div className="flex flex-col justify-center items-center">
                                    <Link href="/oauth2/authorization/google">
                                    <Button type="button" variant="outline" className="rounded-none bg-secondary transform transition-transform duration-300 hover:scale-110 hover:bg-secondary">
                                        <GoogleSvgComponent height={33} width={33}/>
                                        <span className="px-4 text-lg font-bold"> Sign In with Google </span>
                                    </Button>
                                    </Link>
                                </div>
                                { /**
                                 The problem with Google official HTML code is it uses GeneralOAuthFlow
                                 and expects a login-uri to post a token-id to it,
                                 but we want Authorization code flow
                                 data-ux_mode="redirect" use login-uri for redirect-uri
                                 */}
                                <div id="g_id_onload"
                                     data-client_id="449798276031-d4kagd9l371mrj0svabgjcqlh1jofb9v.apps.googleusercontent.com"
                                     data-login_uri="https://zeezip.ir/login/oauth2/code/"
                                     data-context="signin"
                                     data-ux_mode="redirect"
                                     data-auto_prompt="false">
                                </div>
                                <div className="g_id_signin"
                                     data-type="standard"
                                     data-shape="pill"
                                     data-theme="filled_black"
                                     data-text="signin_with"
                                     data-size="large"
                                     data-logo_alignment="left">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function VideoComponent() {
    return (
        <video autoPlay={true} muted={true} loop={true} playsInline={true}
               className="absolute left-0 -z-10 object-cover h-screen w-screen">
            <source src="/videos/flames.mp4" type="video/mp4"/>
        </video>
    );
}
