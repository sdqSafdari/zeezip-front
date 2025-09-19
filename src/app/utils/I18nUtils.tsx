import React from "react";
export enum SupportedLocale {
    EN = "en",
    FA = "fa"
}
export const defaultLocale = SupportedLocale.FA;

export function formatMessage(template: string, ...values: string[]) {
    return template.replace(/{(\d+)}/g, (_, i) => values[i]);
}
/**
 *  placeholder interpolation with respect to Bidirectional-isolation
 */
export function formatMessageBidi(
    lang: string,
    template: string,
    ...values: React.ReactNode[]
): React.ReactNode {
    const locale: SupportedLocale =
        (Object.values(SupportedLocale).find((v) => v === lang) as SupportedLocale) ??
        defaultLocale;

    // Split into text + placeholders
    const parts = template.split(/({\d+})/g);

    return parts.map((part, index) => {
        const match = part.match(/{(\d+)}/);
        if (match) {
            const i = Number(match[1]);
            const value = values[i] ?? "";

            if (locale === SupportedLocale.FA) {
                return (
                    <span key={index} dir="ltr">
                    {value}
                    </span>
                );
            }
            return <React.Fragment key={index}>{value}</React.Fragment>;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
    });
}