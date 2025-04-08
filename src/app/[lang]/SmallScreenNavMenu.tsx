import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import ModeToggle from "@/app/sitecomponents/fixed/ThemeButton";
import {LanguageSwitcher} from "@/app/sitecomponents/i18n/LanguageSwitcher";
import Link from "next/link";
import {getDictionary} from "@/lib/dictionaries";
import {cn} from "@/lib/utils";

export default async function SmallScreenNavMenu({className,lang}:{className?:string,lang:string}){
    const dict = await getDictionary(lang);
    return (
        <div className={cn("flex md:hidden",className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">{dict.nav.toggleMenu}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="flex gap-2 cursor-pointer p-0">
                        <ModeToggle className="w-full justify-start px-2 py-1.5">
                            <span>{dict.nav.theme}</span>
                        </ModeToggle>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="p-0">
                        <LanguageSwitcher
                            currentLang={lang}
                            className="w-full justify-start px-2 py-1.5"
                        >
                            <span>{dict.nav.langSwitcher}</span>
                        </LanguageSwitcher>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="p-0">
                        <Button asChild variant="ghost" className="w-full justify-start px-2 py-1.5 h-auto">
                            <Link href={`/${lang}/login`} className="font-bold">
                                {dict.nav.login}
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}