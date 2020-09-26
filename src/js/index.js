import { createElement, render, renderDom } from "./virtuaDom.js";
import domDiff from "./domDiff.js";
import doPatch from "./doPatch.js";
/**
 * 把表示虚拟DOM的对象转成虚拟DOM
 */
const vDom = createElement('ul',
  {
    class: 'list',
    style: 'width: 300px; height: 300px; background-color: orange;'
  },
  [
    createElement('p',
      {
        class: 'text',
        'data-index': 0
      },
      ['第1个列表项']
    ),
    createElement('li',
      {
        class: 'item',
        'data-index': 1
      },
      [
        createElement('p',
          { class: 'text' },
          [
            createElement('span',
              {
                class: 'title'
              },
              ['第2个列表项']
            )
          ]
        )
      ]
    ),
    createElement('li',
      {
        class: 'item',
        'data-index': 2
      },
      ['第3个列表项']
    )
  ]
)
/**
 * 把虚拟DOM转成真实DOM
 */
const rDom = render(vDom);
renderDom(rDom, document.getElementById('app'));
const vDom2 = createElement('ul',
  {
    class:'list-wrap',
    style: 'width: 300px; height: 300px; background-color: orange;'
  },
  [
    createElement('p',
      {
        class:'title',
        'data-index':0
      },
      ['特殊列表项']
    ),
    createElement('li',
      {
        class:'item',
        'data-index':1
      },
      [
        createElement('p',
          {class:'text'},
          []
        )
      ]
    ),
    createElement('div',
      {
        class:'item',
        'data-index':2
      },
      ['第3个列表项']
    )
  ]
)
const patches = domDiff(vDom, vDom2);
/**
 * 打补丁
 */
doPatch(rDom, patches);
console.log(patches,'patches');