import { Handler } from 'innet';
export declare const selfClosed: {
    area: boolean;
    base: boolean;
    br: boolean;
    col: boolean;
    embed: boolean;
    hr: boolean;
    img: boolean;
    input: boolean;
    link: boolean;
    meta: boolean;
    param: boolean;
    source: boolean;
    track: boolean;
    wbr: boolean;
};
export declare function htmlPlugin(): (app: any, next: any, handler: any) => any;
declare function html(app: any, handler: Handler): any;
export default html;
