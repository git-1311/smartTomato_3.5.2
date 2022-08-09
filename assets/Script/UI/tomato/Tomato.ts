import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import UI, { UIID } from "../../manger/UImanger/UI";
import { Time } from "../../tools/time/DayTime";

@ccclass('Tomato')
export default class Tomato extends UI {
    readonly id: UIID = "tomato";
// /**结束时刻 */
// // @property(cc.Label)
// // private end_label:cc.Label = null;
// // end_time = Time.getBindTime(this.end_label,"getHMS");
// // /**总时间 */
// // @property(cc.Label)
// // all_label:cc.Label = null;
// // all_time = Time.getBindTime(this.all_label,"getHMS");
    protected onOpen(): Promise<void> {
        cc.warn("onOpen")
        return
    }
    protected onLoad(): void {
        cc.warn("onLoad")

    }
    protected start(): void {
        cc.warn("start")

    }
    
    
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import UI, { UIID } from "../../manger/UImanger/UI";
// import { Time } from "../../tools/time/DayTime";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class Tomato extends UI {
//     readonly id: UIID = "tomato";
//     /**结束时刻 */
//     // @property(cc.Label)
//     // private end_label:cc.Label = null;
//     // end_time = Time.getBindTime(this.end_label,"getHMS");
// 
//     // /**总时间 */
//     // @property(cc.Label)
//     // all_label:cc.Label = null;
//     // all_time = Time.getBindTime(this.all_label,"getHMS");
// 
// 
//     protected onOpen(): Promise<void> {
//         cc.warn("onOpen")
//         return 
//     }
//     protected onLoad(): void {
//         cc.warn("onLoad")
//         
//     }
//     protected start(): void {
//         cc.warn("start")
//         
//     }
//     
//     
// }
