import Link from "next/link";
import {Button} from "@/components/ui/button";
import GoogleSvgComponent from "./google-icon.svg";
import {getDictionary} from "@/lib/dictionaries";
import {cn} from "@/lib/utils";

export default async function GoogleSignInButton({lang,className}:{lang:string,className:string}) {
    const dict = await getDictionary(lang);
    return (
        <Link href="/oauth2/authorization/google">
            <Button type="button"
                    variant="outline"
                    className={cn('rounded-none bg-secondary transform transition-transform duration-300 hover:scale-110 hover:bg-secondary',className)}>
                <GoogleSvgComponent height={33} width={33}/>
                <span className="px-4 text-lg font-bold">{dict.login.googleSignIn}</span>
            </Button>
        </Link>
    );
}