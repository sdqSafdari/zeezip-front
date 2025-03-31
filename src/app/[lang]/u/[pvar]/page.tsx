import Link from "next/link"
import { getDictionary } from "@/lib/dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Cloud, Upload, FileText, Menu} from "lucide-react"
import { Button } from "@/components/ui/button"
import FileTableWithParam from "@/app/[lang]/u/[pvar]/FileTableWithParam";
import ZzipPureLogoSVG from "@/app/svg/zzip-logo-pure.svg";
import ZzipLogoSVG from "@/app/svg/zzip-logo.svg";
import ModeToggle from "@/app/sitecomponents/fixed/ThemeButton";
import {LanguageSwitcher} from "@/app/sitecomponents/i18n/LanguageSwitcher";

export default async function FilesPage({
                                            params,
                                        }: {
    params: { lang: string,pvar:string }
}) {
    const dict = await getDictionary(params.lang)

    return (
        <div className={`min-h-screen flex flex-col ${params.lang === "fa" ? "font-persian rtl" : ""}`}>
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="container mx-auto flex h-16 items-center justify-between py-4">
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
                        <Link href={`/${params.lang}/public-share`}
                              className="text-sm font-medium transition-colors hover:text-primary">
                            {dict.nav.publicShare}
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
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dict.files.title}</h1>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {dict.files.description}
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto max-w-5xl mt-12">
                            <h2 className="text-2xl font-bold">{dict.files.yourFiles}</h2>

                                <div className="direction-ltr text-left">
                                    <FileTableWithParam groupId={params.pvar}/>
                                </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{dict.files.reminders.title}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {dict.files.reminders.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
                            <Card className="bg-background">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <CardTitle>{dict.files.reminders.expiration.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{dict.files.reminders.expiration.description}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                                        <Upload className="h-6 w-6" />
                                    </div>
                                    <CardTitle>{dict.files.reminders.sharing.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{dict.files.reminders.sharing.description}</p>
                                </CardContent>
                            </Card>
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

