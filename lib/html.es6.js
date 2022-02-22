import { object } from '@innet/utils';
import innet, { createHandler } from 'innet';

const selfClosed = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true,
};
function deepJoin(target, separator = '') {
    if (Array.isArray(target)) {
        return target.map(e => deepJoin(e)).join(separator);
    }
    return target;
}
function htmlPlugin() {
    return (app, next, handler) => {
        if (app && typeof app.type === 'string') {
            const { type, props, children } = app;
            const propsString = props ? ' ' + Object.keys(props).map(key => `${key}="${props[key]}"`).join(' ') : '';
            const start = `<${type}${propsString}>`;
            if (selfClosed[type]) {
                return start;
            }
            else {
                return deepJoin([start, innet(children, handler), `</${type}>`]);
            }
        }
        return next();
    };
}
function html(app, handler) {
    const childrenHandler = createHandler([
        object([
            htmlPlugin,
        ]),
    ], handler);
    childrenHandler[app.type] = undefined;
    return innet(app, childrenHandler);
}

export { html as default, htmlPlugin, selfClosed };
