import {getDictionary} from "@/lib/dictionaries";

export default async function NavbarI18N({lang}){
    const dictionary = await getDictionary(lang);
    return (
        <div>

        </div>
    );
}