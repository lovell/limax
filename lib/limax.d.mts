type Options = {
    custom?: string[] | {
        [key: string]: string;
    };
    lang?: string;
    maintainCase?: boolean;
    replacement?: string;
    separator?: string;
    separateNumbers?: boolean;
    separateApostrophes?: boolean;
    tone?: boolean;
} | string;
declare function limax(text: string, opt?: Options): string;

export { limax as default };
