import {ATTR, TEXT, REPLACE, REMOVE} from "./patchTypes.js";
import { setAttrs, render } from "./virtuaDom.js";
import Element from "./Element.js";
let finalPatches = {};
let rnIndex = 0;
function doPatch(rDom, patches) {
    finalPatches = patches;
    rNodeWalk(rDom);
}
function rNodeWalk(rNode) {
    const rnPatch = finalPatches[rnIndex++];
    const childNodes = rNode.childNodes;
    [...childNodes].map((c) => {
        rNodeWalk(c);
    })
    if(rnPatch) {
        patchAction(rNode, rnPatch);
    }
}
function patchAction(rNode, rnPatch) {
    rnPatch.map((p) => {
        switch(p.type) {
            // 替换更换的属性
            case ATTR:
                for(let key in p.attrs) {
                    const value = p.attrs[key];
                    if(value) {
                        setAttrs(rNode, key, value);
                    } else {
                        rNode.removeAttribute(key);
                    }
                }
                break;
            case TEXT:
                // 替换更改的文本
                rNode.textContent = p.text;
                break;
            case REPLACE:
                debugger;
                // 替换节点，判断一下是不是createElment创建出来的，然后进行替换
                const newNode = (p.newNode instanceof Element) ? render(p.newNode) : document.createTextNode(p.newNode);
                rNode.parentNode.replaceChild(newNode, rNode);
                break;
            case REMOVE:
                rNode.parentNode.removeChild(rNode);
                break;
            default :
            break;
        }
    })
}
export default doPatch;