// /**全局的事件分发对象 */
// /**全局的事件的事件名 */
// /**每次时间以秒为单位变化时，将发送该事件 */
// /**鼠标滚轮滚动 */
// // type EvtBy<T> = {
// //     [key in keyof cc.EventTarget] :
// //         cc.EventTarget[key]  extends (type : string,...other:any)=>any
// //         ? PreciseParam0<cc.EventTarget[key],T>
// //         : cc.EventTarget[key]
// // }

import { _decorator, EventTarget } from 'cc';
namespace evt{
    export const mian  = new EventTarget();
    export const enum mianE {
        secondsChange = "secondsChange",
        minutesChange = "minutesChange",
        mouseWheel = "mouseWheel",
    }
}
export default evt

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// namespace evt{
//     /**全局的事件分发对象 */
//     export const mian  = new cc.EventTarget();
//     /**全局的事件的事件名 */
//     export const enum mianE {
//         /**每次时间以秒为单位变化时，将发送该事件 */
//         secondsChange = "secondsChange",
//         minutesChange = "minutesChange",
//         /**鼠标滚轮滚动 */
//         mouseWheel = "mouseWheel",
//     }
//     
// }
// 
// 
// 
// export default evt
// 
// // type EvtBy<T> = { 
// //     [key in keyof cc.EventTarget] : 
// //         cc.EventTarget[key]  extends (type : string,...other:any)=>any
// //         ? PreciseParam0<cc.EventTarget[key],T>
// //         : cc.EventTarget[key]
// // }
