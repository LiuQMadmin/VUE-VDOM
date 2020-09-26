import Element from "./Element.js";
/**
 * 代表虚拟DOM的对象 => 虚拟DOM
 */
function createElement(type, props, children) {
    return new Element(type, props, children);
};
function setAttrs(node, prop, value) {
    switch(prop) {
        case 'value':
            if(node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(prop, value);
            };
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(prop, value);
            break;
    }
    
}
/**
 * 虚拟DOM => 真实DOM
 */
function render(vDom) {
    const { type, props, children } = vDom;
    const el = document.createElement(type);
    for(let key in props) {
        setAttrs(el, key, props[key]);
    }
    children.map((c) => {
        // 如果是元素节点继续递归，文本节点直接生成就行
        c = c instanceof Element ? render(c) : document.createTextNode(c);
        el.appendChild(c); // 添加到父元素中
    })
    // 创建完的元素返回出去
    return el;
}
/**
 * 渲染DOM的函数
 */
function renderDom(rDom, rootElement) {
    rootElement.appendChild(rDom);
}
 
export {
    createElement,
    render,
    setAttrs,
    renderDom
};