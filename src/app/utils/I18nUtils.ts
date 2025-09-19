
export function formatMessage(template: string, ...values: string[]) {
    return template.replace(/{(\d+)}/g, (_, i) => values[i]);
}
