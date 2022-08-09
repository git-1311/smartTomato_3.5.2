import { _decorator, systemEvent, SystemEvent, Event, macro } from 'cc';
import CurTime from "../../tools/time/Current";
import { Time } from "../../tools/time/DayTime";
import evt from "./Event";
namespace mm{
    export function init(){
        loadConfig();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e:Event.EventKeyboard)=>{
        });
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e:Event.EventKeyboard)=>{
        });
    }
    function loadConfig(){
    }
    function onKeyDown(e:Event.EventKeyboard) {
        console.log(e.keyCode,e);
        switch (e.keyCode) {
            case macro.KEY.a:
                break;
            case macro.KEY.d:
                break;
            case macro.KEY.b:
                break;
        }
    }
    function onMouseWheel(e:Event.EventMouse) {
    }
}
window["mm"] = mm;
export default mm;

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import CurTime from "../../tools/time/Current";
// import { Time } from "../../tools/time/DayTime";
// import evt from "./Event";
// 
// namespace mm{
// 
// 
//     export function init(){
//         
//         loadConfig();
//         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e:cc.Event.EventKeyboard)=>{
// 
//         });
//         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e:cc.Event.EventKeyboard)=>{
// 
//         });
//     }
//     function loadConfig(){
//         
//     }
//     function onKeyDown(e:cc.Event.EventKeyboard) {
//         console.log(e.keyCode,e);
//         switch (e.keyCode) {
//             case cc.macro.KEY.a:
//                 break;
//             case cc.macro.KEY.d:
//                 break;
//             case cc.macro.KEY.b:
//                 break;
//         }
//     }
//     function onMouseWheel(e:cc.Event.EventMouse) {
//         
//     }
//     
//    
// 
// 
// }
// window["mm"] = mm;
// export default mm;
