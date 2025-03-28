import Link from "next/link"
import { getDictionary } from "@/lib/dictionaries"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {CheckCircle, Cloud, File, Share2, Upload, Archive, Menu, Clock} from "lucide-react"
import ZzipLogoSVG from "@/app/svg/zzip-logo.svg";
import ZzipPureLogoSVG from "@/app/svg/zzip-logo-pure.svg";
import UploadForm from "@/app/sitecomponents/upload/UploadForm";
import ModeToggle from "@/app/sitecomponents/fixed/ThemeButton";
import {LanguageSwitcher} from "@/app/sitecomponents/i18n/LanguageSwitcher";
import {Button} from "@/components/ui/button";
export default async function UploadPage({
                                             params,
                                         }: {
    params: { lang: string }
}) {
    const dict = await getDictionary(params.lang)

    return (
        <div className={`min-h-screen flex flex-col ${params.lang === "fa" ? "font-persian rtl" : ""}`}>
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <div className="flex items-center gap-2">
                        <Link href={`/${params.lang}`} className="flex items-center gap-2">
                            <ZzipLogoSVG width="10em" height="auto"/>
                        </Link>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <Link
                            href={`/${params.lang}#features`}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {dict.nav.features}
                        </Link>
                        <Link href={`/${params.lang}#pricing`}
                              className="text-sm font-medium transition-colors hover:text-primary">
                            {dict.nav.pricing}
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <ModeToggle/>
                        <LanguageSwitcher currentLang={params.lang}/>
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
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">{dict.nav.toggleMenu}</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dict.upload.title}</h1>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {dict.upload.description}
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto max-w-3xl mt-12">
                            <UploadForm lang={params.lang}/>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{dict.upload.features.title}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {dict.upload.features.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 md:grid-cols-2">
                            {dict.upload.features.items.map((feature, index) => (
                                <Card key={index} className="bg-background h-full">
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                                            {index === 0 ? (
                                                <File className="h-6 w-6"/>
                                            ) : index === 1 ? (
                                                <Share2 className="h-6 w-6"/>
                                            ) : index === 2 ? (
                                                <Upload className="h-6 w-6"/>
                                            ) : index === 3 ? (
                                                <CheckCircle className="h-6 w-6"/>
                                            ) : index === 4 ? (
                                                <Clock className="h-6 w-6" />
                                            ): (
                                                    <Archive className="h-6 w-6"/>
                                                )}
                                        </div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{dict.upload.howTo.title}</h2>
                            </div>
                        </div>

                        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
                            {dict.upload.howTo.steps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{dict.upload.tips.title}</h2>
                            </div>
                        </div>

                        <div className="mx-auto max-w-3xl py-12">
                            <Card className="bg-background">
                                <CardContent className="p-6">
                                    <ul className="space-y-4">
                                        {dict.upload.tips.items.map((tip, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex items-center gap-2">
                        <ZzipPureLogoSVG width="4em" height="auto" />
                        <p className="text-sm font-medium">
                            {dict.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
                        </p>
                    </div>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link href={`/${params.lang}/terms`} className="text-sm font-medium hover:underline underline-offset-4">
                            {dict.footer.terms}
                        </Link>
                        <Link href={`/${params.lang}/privacy`} className="text-sm font-medium hover:underline underline-offset-4">
                            {dict.footer.privacy}
                        </Link>
                        <Link href={`/${params.lang}/contact`} className="text-sm font-medium hover:underline underline-offset-4">
                            {dict.footer.contact}
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}