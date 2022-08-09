// // this.target =  this.node;

import { _decorator, log, Component, error, warn, Widget, Button } from 'cc';
export function custom(){
    for (const key in Custom) {
        if(key.startsWith("custom")) 
            Custom[key]()
    }
    log(Custom);
}
namespace Custom{
    function customComponent(){
        const prototypeObj =  Component.prototype
        prototypeObj.forceGetComponent = function<T>(type: { new(): T }): T {
			let com = this.getComponent(type);
            if(!com){
                try {
                    com = this.addComponent(type);
                } catch (error) {
                    error(`添加组件${type}失败`,error);
                }
            }
			return com;
		}
        prototypeObj._init = function(){
            warn(`${this.name}未设置初始化方法`)
		}
    }
    function customWidget(){
        const prototypeObj =  Widget.prototype;
        prototypeObj._init = function(){
            this.isAlignTop = this.isAlignBottom = this.isAlignRight = this.isAlignLeft = true;
            this.top = this.bottom = this.right = this.left = 0;
		}
    }
    function customButton(){
        const prototypeObj =  Button.prototype;
        prototypeObj._init = function(){
            this.transition = Button.Transition.SCALE;
            this.duration = 0.1;
            this.zoomScale = 0.9;
		}
    }
}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// export function custom(){
//     for (const key in Custom) {
//         if(key.startsWith("custom")) 
//             Custom[key]()
//     }
//     cc.log(Custom);
// }
// namespace Custom{
//     function customComponent(){
//         const prototypeObj =  cc.Component.prototype
// 
//         prototypeObj.forceGetComponent = function<T>(type: { new(): T }): T {
// 			let com = this.getComponent(type);
//             if(!com){
//                 try {
//                     com = this.addComponent(type);
//                 } catch (error) {
//                     cc.error(`添加组件${type}失败`,error);
//                 }
//             }
// 			return com;
// 		}
// 
//         prototypeObj._init = function(){
//             cc.warn(`${this.name}未设置初始化方法`)
// 		}
//     }
// 
// 
//     function customWidget(){
//         const prototypeObj =  cc.Widget.prototype;
// 
//         prototypeObj._init = function(){
//             this.isAlignTop = this.isAlignBottom = this.isAlignRight = this.isAlignLeft = true;
//             this.top = this.bottom = this.right = this.left = 0;
// 		}
//     }
// 
// 
//     function customButton(){
//         const prototypeObj =  cc.Button.prototype;
// 
//         prototypeObj._init = function(){
//             // this.target =  this.node;
//             this.transition = cc.Button.Transition.SCALE;
//             this.duration = 0.1;
//             this.zoomScale = 0.9;
// 		}
//     }
// }
