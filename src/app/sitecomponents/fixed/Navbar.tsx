"use client"

import ThemeButton from '@/app/sitecomponents/fixed/ThemeButton';
import Link from "next/link";
import Image from "next/image";
import openBSD from "/public/openbsd.svg";

export default function Navbar() {
    return (
            <div className='absolute top-0 h-20 z-20 w-full px-4 bg-secondary'>
                <div className='flex justify-between'>
                    <h2 className='text-3xl font-black text-green-700 my-auto'><Link href='/'> ZeeZIP </Link>
                        <Image className="inline-block" src={openBSD} alt="secure"/>
                    </h2>
                    <div className="my-auto">
                    <ThemeButton/>
                    </div>
                </div>
            </div>
    );
}
