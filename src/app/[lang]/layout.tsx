
export async  function getStaticPaths(){
    const supportedLanguages = ['en','fa'];
    const paths = supportedLanguages.map(supportedLanguage=>({params: {lang:supportedLanguage}}));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths,fallback:false};

}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}