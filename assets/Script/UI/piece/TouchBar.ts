import { _decorator, Event, Component, Node, Vec2 } from 'cc';
const { ccclass, property, executeInEditMode, menu ,disallowMultiple,requireComponent} = _decorator;

import evt from "../../manger/main/Event";
import { Time } from "../../tools/time/DayTime";
import GradientColor from "../../tools/tools/GradientColor";
export const enum TouchType{
    start,
    move,
    end
}
export type TouchBarHandlerParam = {
    type:TouchType
// /**一个0~1的数字，表示此时触点在触摸跳的位置 */
    percent:number,
// /**上一帧Y轴的运动距离，表示速度和运动方向 */
    e:Event.EventTouch
}

@ccclass('TouchBar')
export default class TouchBar extends Component {
    
    @property({
        type: Node,
        tooltip:"用户看起来的触摸节点"
    })
    bg:Node | null =null;
    @property({
        type: Node,
        tooltip:"实际响应触摸事件的节点"
    })
    touch:Node | null=null;
    @property({
        type: Component.EventHandler,
        tooltip:"触摸回调"
    })
    onTouch: Component.EventHandler = new Component.EventHandler();
    onLoad () {
        this.touchOn();
    }
    touchOn() {
        this.touch.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.touch.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        this.touch.on(cc.Node.EventType.MOUSE_WHEEL, (e:cc.Event.EventMouse)=>{

        cc.log(e.getLocation(),e.getScrollY())
        });
    }
    onMouseWheel(worldPos: Vec2, scrollY: number){
        if(this.touch.getBoundingBoxToWorld().contains(worldPos)){
        cc.log(scrollY)
        }


    }
    onTouchEnd(e:Event.EventTouch) {
        e.stopPropagation();
        this.onTouch.emit([{
        type:TouchType.end,e
        }])
    }
    
    onTouchMove(e:Event.EventTouch) {
        e.stopPropagation()
        this.onTouch.emit([{
        type:TouchType.move,
        e
        }])




    }
    onTouchStart(e:Event.EventTouch) {
        e.stopPropagation()
        const percent = this.getTouchPercent(e.getLocation());
        this.onTouch.emit([{
        type:TouchType.start,
        percent,
        e
        }])
    }
// /**
// *
// * @param pos 触点：世界坐标
// * @returns 0~100的数字
// */
    getTouchPercent(pos: Vec2) {
        const width = this.bg.width;
        this.bg.convertToNodeSpaceAR(pos,pos);
        let percent =  1-(pos.x+ width/2)/width;
        return percent>1 ? 1
        : percent<0 ? 0
        : percent
    }
    start () {

    }
// // update (dt) {}
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import evt from "../../manger/main/Event";
// import { Time } from "../../tools/time/DayTime";
// import GradientColor from "../../tools/tools/GradientColor";
// 
// const { ccclass, property, executeInEditMode, menu ,disallowMultiple,requireComponent} = cc._decorator;
// export const enum TouchType{
//     start,
//     move,
//     end
// }
// export type TouchBarHandlerParam = {
//     type:TouchType
//     /**一个0~1的数字，表示此时触点在触摸跳的位置 */
//     percent:number,
//     /**上一帧Y轴的运动距离，表示速度和运动方向 */
//     e:cc.Event.EventTouch
// 
// }
// @ccclass
// export default class TouchBar extends cc.Component {
//     
//     @property({
//         type: cc.Node,
//         tooltip:"用户看起来的触摸节点"
//     })
//     bg:cc.Node =null;
//     @property({
//         type: cc.Node,
//         tooltip:"实际响应触摸事件的节点"
//     })
//     touch:cc.Node=null;
//     @property({
//         type: cc.Component.EventHandler,
//         tooltip:"触摸回调"
//     })
//     onTouch: cc.Component.EventHandler = new cc.Component.EventHandler();
// 
//     onLoad () {
//         this.touchOn();
//     }
//     touchOn() {
//         this.touch.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
//         this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
//         this.touch.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
//         this.touch.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
//         
//         this.touch.on(cc.Node.EventType.MOUSE_WHEEL, (e:cc.Event.EventMouse)=>{
//             
//             cc.log(e.getLocation(),e.getScrollY())
//         });
//     }
//     onMouseWheel(worldPos: cc.Vec2, scrollY: number){
//         if(this.touch.getBoundingBoxToWorld().contains(worldPos)){
//             cc.log(scrollY)
//         }
//         
// 
//     }
//     onTouchEnd(e:cc.Event.EventTouch) {
//         e.stopPropagation();
//         this.onTouch.emit([{
//             type:TouchType.end,e
//         }])
//     }
// 
//     
//     onTouchMove(e:cc.Event.EventTouch) {
//         e.stopPropagation()
//         this.onTouch.emit([{
//             type:TouchType.move,
//             e
//         }])
// 
//         
//         
//         
//     }
//     onTouchStart(e:cc.Event.EventTouch) {
//         e.stopPropagation()
//         const percent = this.getTouchPercent(e.getLocation());
//         this.onTouch.emit([{
//             type:TouchType.start,
//             percent,
//             e
//         }])
//     }
//     /**
//      * 
//      * @param pos 触点：世界坐标
//      * @returns 0~100的数字
//      */
//     getTouchPercent(pos: cc.Vec2) {
//         const width = this.bg.width;
//         this.bg.convertToNodeSpaceAR(pos,pos);
//         let percent =  1-(pos.x+ width/2)/width;
//         return percent>1 ? 1
//             : percent<0 ? 0
//             : percent
//     }
// 
//     start () {
// 
//     }
// 
//     // update (dt) {}
// }
