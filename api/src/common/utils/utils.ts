export function removeNewLine(value: string | undefined) {
    if (value == undefined) return value;
    return value.replace(/(\r\n|\n|\r)/gm, "");
}