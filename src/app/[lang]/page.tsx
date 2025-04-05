import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Cloud, Download, CheckCircle, Instagram, Twitter, ArrowRight, Menu, Upload} from "lucide-react"
import { getDictionary } from "@/lib/dictionaries"
import {LanguageSwitcher} from "@/app/sitecomponents/i18n/LanguageSwitcher";
import Openbsd from "../../../public/openbsd.svg";
import UnifiedMediaDownloaderSVG from "@/app/svg/zzip-unified-media-downloader.svg";
import ZzipLogoSVG from "@/app/svg/zzip-logo.svg";
import ZzipPureLogoSVG from "@/app/svg/zzip-logo-pure.svg";
import StreamSVG from "./stream.svg";
import ZipSVG from "./zip.svg";
import CloudStorageSVG from "./server-like-svgrepo-com.svg";
import NoPicAvatar from "./no-pic-avatar.svg";
import ModeToggle from "@/app/sitecomponents/fixed/ThemeButton";
import {getStaticServerSideBaseURL} from "@/app/utils/LinkUtils";

export async function generateMetadata({ params }) {
    const beforeProxyBaseURL = getStaticServerSideBaseURL();
    return {
        alternates: {
            languages: {
                'en': `${beforeProxyBaseURL}/en`,
                'fa': `${beforeProxyBaseURL}/fa`,
            },
        }
    }
}

export default async function LandingPage({
                                              params,
                                          }: {
    params: { lang: string }
}) {
    const dict = await getDictionary(params.lang)

    return (
        <div className={`flex min-h-screen flex-col ${params.lang === "fa" ? "font-persian rtl" : ""}`}>
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="container mx-auto flex h-16 items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                        <ZzipLogoSVG height="10em" width="10em"/>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <Link href={`#features`} className="text-sm font-medium transition-colors hover:text-primary">
                            {dict.nav.features}
                        </Link>
                        <Link href={`#pricing`} className="text-sm font-medium transition-colors hover:text-primary">
                            {dict.nav.pricing}
                        </Link>
                        <Link href={`#testimonials`} className="text-sm font-medium transition-colors hover:text-primary">
                            {dict.nav.testimonials}
                        </Link>
                        <Link href={`#faq`} className="text-sm font-medium transition-colors hover:text-primary">
                            {dict.nav.faq}
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <LanguageSwitcher currentLang={params.lang} />
                        <Button
                            asChild
                            >
                            <Link
                                href={`/${params.lang}/login`}
                                className="font-bold text-lg px-6 transition-colors hidden md:block"
                            >
                                {dict.nav.login}
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">{dict.nav.toggleMenu}</span>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-3 md:py-6 lg:py-8 xl:py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                                        {dict.hero.title}
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">{dict.hero.subtitle}</p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button size="lg" asChild>
                                        <Link href={`/${params.lang}/login`}>{dict.hero.startFree}</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="#features">{dict.hero.learnMore}</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className='direction-ltr text-left'>
                                <UnifiedMediaDownloaderSVG
                                    width="25em"
                                    height="25em"
                                    alt={dict.hero.imageAlt}
                                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dict.features.title}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {dict.features.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid auto-rows-fr max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                            <div
                                className="flex flex-col h-full space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                                <CloudStorageSVG className="fill-primary" width="3em" height="3em"/>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">{dict.features.cloud.title}</h3>
                                    <p className="text-muted-foreground">{dict.features.cloud.description}</p>
                                </div>
                            </div>
                            <div
                                className="flex flex-col h-full space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                                <StreamSVG fill="red" style={{opacity:0.5}} width="3em" height="3em"/>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">{dict.features.stream.title}</h3>
                                    <p className="text-muted-foreground">{dict.features.stream.description}</p>
                                </div>
                            </div>
                            <div
                                className="flex flex-col h-full space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                                <ZipSVG fill="blue" style={{opacity:0.5}} width="3em" height="3em"/>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">{dict.features.zip.title}</h3>
                                    <p className="text-muted-foreground">{dict.features.zip.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/**
                 public-share section
                 */}
                <section className="w-full py-12 md:py-24 lg:py-32 border-t">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{dict.fileSharing.title}</h2>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                                        {dict.fileSharing.description}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <ul className="space-y-2">
                                        {dict.fileSharing.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0"/>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button size="lg" asChild>
                                        <Link href={`/${params.lang}/public-share/`}>
                                            {dict.fileSharing.uploadNow}
                                            <Upload className="ml-2 h-4 w-4"/>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{dict.howItWorks.title}</h2>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">{dict.howItWorks.subtitle}</p>
                                </div>
                                <ul className="grid gap-6">
                                    <li className="flex items-start gap-4">
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            1
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold">{dict.howItWorks.steps[0].title}</h3>
                                            <p className="text-muted-foreground">{dict.howItWorks.steps[0].description}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            2
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold">{dict.howItWorks.steps[1].title}</h3>
                                            <p className="text-muted-foreground">{dict.howItWorks.steps[1].description}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            3
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold">{dict.howItWorks.steps[2].title}</h3>
                                            <p className="text-muted-foreground">{dict.howItWorks.steps[2].description}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dict.pricing.title}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {dict.pricing.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
                            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">{dict.pricing.plans.free.title}</h3>
                                    <p className="text-muted-foreground">{dict.pricing.plans.free.subtitle}</p>
                                </div>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-3xl font-bold">{dict.pricing.plans.free.price}</span>
                                    <span className="ml-1 text-muted-foreground">{dict.pricing.monthly}</span>
                                </div>
                                <ul className="mt-6 space-y-2">
                                    {dict.pricing.plans.free.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary"/>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="mt-6" variant="outline" asChild>
                                    <Link href={`/${params.lang}/login`}>{dict.pricing.getStarted}</Link>
                                </Button>
                            </div>
                            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
                                <div
                                    className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                    {dict.pricing.popular}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">{dict.pricing.plans.pro.title}</h3>
                                    <p className="text-muted-foreground">{dict.pricing.plans.pro.subtitle}</p>
                                </div>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-3xl font-bold">{dict.pricing.plans.pro.price}</span>
                                    <span className="ml-1 text-muted-foreground">{dict.pricing.monthly}</span>
                                </div>
                                <ul className="mt-6 space-y-2">
                                    {dict.pricing.plans.pro.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary"/>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="mt-6" asChild>
                                    <Link href={`/${params.lang}/login`}>{dict.pricing.getStarted}</Link>
                                </Button>
                            </div>
                            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">{dict.pricing.plans.business.title}</h3>
                                    <p className="text-muted-foreground">{dict.pricing.plans.business.subtitle}</p>
                                </div>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-3xl font-bold">{dict.pricing.plans.business.price}</span>
                                    <span className="ml-1 text-muted-foreground">{dict.pricing.monthly}</span>
                                </div>
                                <ul className="mt-6 space-y-2">
                                    {dict.pricing.plans.business.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary"/>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="mt-6" variant="outline" asChild>
                                    <Link href={`/${params.lang}/login`}>{dict.pricing.getStarted}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dict.testimonials.title}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {dict.testimonials.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
                            {dict.testimonials.items.map((testimonial, index) => (
                                <div key={index}
                                     className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <NoPicAvatar
                                            width="2em"
                                            height="auto"
                                            alt={testimonial.name}
                                            className="fill-secondary rounded-full"
                                        />
                                        <div>
                                            <h3 className="font-bold">{testimonial.name}</h3>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-muted-foreground">{testimonial.quote}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dict.faq.title}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {dict.faq.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-3xl gap-6 py-12">
                            {dict.faq.items.map((item, index) => (
                                <div key={index} className="rounded-lg border bg-background p-6 shadow-sm">
                                    <h3 className="text-xl font-bold">{item.question}</h3>
                                    <p className="mt-2 text-muted-foreground">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-muted">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{dict.cta.title}</h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">{dict.cta.subtitle}</p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg" asChild>
                                    <Link href={`/${params.lang}/login`}>
                                        {dict.cta.startFree}
                                        <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href={`/${params.lang}/contact`}>{dict.cta.contactSales}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full border-t py-6 md:py-0">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex items-center gap-2">
                        <ZzipPureLogoSVG width="4em" height="auto"/>
                        <p className="text-sm font-medium">
                            {dict.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
                        </p>
                    </div>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link href={`/${params.lang}/terms`}
                              className="text-sm font-medium hover:underline underline-offset-4">
                            {dict.footer.terms}
                        </Link>
                        <Link href={`/${params.lang}/privacy`}
                              className="text-sm font-medium hover:underline underline-offset-4">
                            {dict.footer.privacy}
                        </Link>
                        <Link href={`/${params.lang}/contact`}
                              className="text-sm font-medium hover:underline underline-offset-4">
                            {dict.footer.contact}
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}

