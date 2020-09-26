import {ATTR, TEXT, REPLACE, REMOVE} from "./patchTypes.js";
const patches = {};
let vnIndex = 0;
function domDiff(oldVDom, newVDom) {
    let index = 0;
    vNodeWalk(oldVDom, newVDom, index);
    return patches;
}
function vNodeWalk(oldNode, newNode, index) {
    let vNodePatch = [];
    if(!newNode) {
        // 删除节点
        vNodePatch.push({
            type:REMOVE,
            index
        });
    } else if (typeof oldNode === "string" && typeof newNode === "string") {
        // 节点文本发生变化
        if(oldNode !== newNode) {
            vNodePatch.push({
                type:TEXT,
                text:newNode
            });
        }
    } else if(oldNode.type === newNode.type) {
        // 属性发生变化
        const attrPatch = attrsWalk(oldNode.props, newNode.props);
        if(Object.keys(attrPatch).length > 0) {
            vNodePatch.push({
                type:ATTR,
                attrs:attrPatch
            });
        };
        // 遍历孩子
        childrenWalk(oldNode.children, newNode.children);
    } else {
        // 节点type改变
        vNodePatch.push({
            type:REPLACE,
            newNode
        })
    }
    if(vNodePatch.length > 0) {
        patches[index] = vNodePatch;
    }
}
function attrsWalk(oldAttrs, newAttrs) {
    let attrPatch = {};
    for(let key in oldAttrs) {
        // 修改属性
        if(oldAttrs[key] !== newAttrs[key]) {
            attrPatch[key] = newAttrs[key];
        }
    }
    for(let key in newAttrs) {
        // 新增加的属性
        if(!oldAttrs.hasOwnProperty(key)) {
            attrPatch[key] = newAttrs[key];
        }
    }
    return attrPatch;
}
function childrenWalk(oldChildren, newChildren) {
    oldChildren.map((c, idx) => {
        vNodeWalk(c, newChildren[idx], ++ vnIndex); // ++ vnIndex为了取出来深度遍历的索引
    })
}
export default domDiff;