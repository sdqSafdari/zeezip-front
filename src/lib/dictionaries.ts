import "server-only"

export type Dictionary = {
    metadata: {
        title: string
        description: string
    }
    nav: {
        features: string
        pricing: string
        testimonials: string
        faq: string
        login: string
        getStarted: string
        toggleMenu: string
        publicShare: string
    }
    hero: {
        title: string
        subtitle: string
        startFree: string
        learnMore: string
        imageAlt: string
    }
    features: {
        title: string
        subtitle: string
        cloud: {
            title: string
            description: string
        }
        twitter: {
            title: string
            description: string
        }
        instagram: {
            title: string
            description: string
        }
    }
    howItWorks: {
        title: string
        subtitle: string
        steps: Array<{
            title: string
            description: string
        }>
        tryIt: {
            title: string
            subtitle: string
            placeholder: string
            button: string
            example: string
        }
    }
    pricing: {
        title: string
        subtitle: string
        monthly: string
        getStarted: string
        popular: string
        plans: {
            free: {
                title: string
                subtitle: string
                price: string
                features: string[]
            }
            pro: {
                title: string
                subtitle: string
                price: string
                features: string[]
            }
            business: {
                title: string
                subtitle: string
                price: string
                features: string[]
            }
        }
    }
    testimonials: {
        title: string
        subtitle: string
        items: Array<{
            name: string
            role: string
            quote: string
        }>
    }
    faq: {
        title: string
        subtitle: string
        items: Array<{
            question: string
            answer: string
        }>
    }
    cta: {
        title: string
        subtitle: string
        startFree: string
        contactSales: string
    }
    footer: {
        copyright: string
        terms: string
        privacy: string
        contact: string
    }
    login: {
        title: string
        description: string
        googleSignIn: string
        noAccount: string
        createAccount: string
        backToHome: string
        continueWith: string
        imageTitle: string
        imageSubtitle: string
    }
    upload: {
        title: string
        description: string
        dropzone: {
            title: string
            subtitle: string
            maxSize: string
        },
        features: {
            title: string
            subtitle: string
            items:
                {
                    title: string
                    description: string
                }[]
        },
        howTo: {
            title: string
            steps:
                {
                    title: string
                    description: string
                }[]
        },
        tips: {
            title: string
            items: string[]
        }
    }
    fileSharing: {
        title: string
        description: string
        uploadNow: string
        features: string[]
    }
    files: {
        title: string
        description: string
        yourFiles: string
        uploadNew: string
        noFiles: string
        fileName: string
        fileSize: string
        uploadDate: string
        expiresIn: string
        actions: string
        copyLink: string
        download: string
        delete: string
        linkCopied: string
        hours: string
        reminders: {
            title: string
            subtitle: string
            expiration: {
                title: string
                description: string
            },
            sharing: {
                title: string
                description: string
            }
        }
    }

}

const dictionaries = {
    en: () => import("./dictionaries/en.json").then((module) => module.default) as Promise<Dictionary>,
    fa: () => import("./dictionaries/fa.json").then((module) => module.default) as Promise<Dictionary>,
}

export const getDictionary = async (locale: string) => {
    return (dictionaries[locale as keyof typeof dictionaries] || dictionaries.en)()
}

