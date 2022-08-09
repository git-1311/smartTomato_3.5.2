// /**更新当前时间对象，并且每当时间以秒为单位变化时将发出相应事件 */
// /**当前时间信息对象 */

import { _decorator } from 'cc';
import evt from "../../manger/main/Event";
import { Time } from "./DayTime";
import { tt } from "./timeTools";
const Days = ["日","一","二","三","四","五","六"]
class CurTime extends FullTime{
    static getInst(){
        const t = new CurTime(new Date());
        t.update()
        return t;
    }
    all_s: number;
    update(){
        const data = new Date()
        this.Date = data;
        const all_ms = data.getTime()
        const allSecondsNum = Math.floor(all_ms/1000);
        if(this.all_s !== allSecondsNum){
            this.all_s = allSecondsNum;
            tt.resetUTCTime(this,all_ms);
            evt.mian.emit(evt.mianE.secondsChange);
            if(this.s==0){
                evt.mian.emit(evt.mianE.minutesChange);
            }
        } 
    }
}
const curTime = CurTime.getInst()  as Omit<Readonly<CurTime>,"reset"|"addSelf">
window["curTime"] = curTime;
export default curTime

export class FullTime extends Time{
    constructor(
// /**当前时间的原生Date对象 */
        public Date:Date
    ){super()}
    get year(){
        return this.Date.getFullYear()
    }
    get month(){
        return this.Date.getMonth() +1;
    }
// /**日 */
    get date(){
        return this.Date.getDate()
    }
// /**星期 */
    get day(){
        return this.Date.getDay()
    }
// /**星期的中文 */
    get day_zh(){
        return Days[this.day]
    }
    get ms(){
        return this.Date.getMilliseconds()
    }
    get day_ms(){
        return  tt.intoMS(this)
    }
    get all_ms(){
        return this.Date.getTime()
    }
    reset(all_ms:number = this.all_ms){
        this.Date.setTime(all_ms);
        return tt.resetUTCTime(this,all_ms);
    }
    
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import evt from "../../manger/main/Event";
// import { Time } from "./DayTime";
// import { tt } from "./timeTools";
// 
// const Days = ["日","一","二","三","四","五","六"]
// export class FullTime extends Time{
//     constructor(
//         /**当前时间的原生Date对象 */
//         public Date:Date
//     ){super()}
//     get year(){
//         return this.Date.getFullYear()
//     }
//     get month(){
//         return this.Date.getMonth() +1;
//     }
//     /**日 */
//     get date(){
//         return this.Date.getDate()
//     }
//     /**星期 */
//     get day(){
//         return this.Date.getDay()
//     }
//     /**星期的中文 */
//     get day_zh(){
//         return Days[this.day]
//     }
//     get ms(){
//         return this.Date.getMilliseconds()
//     }
//     get day_ms(){
//         return  tt.intoMS(this)
//     }
//     get all_ms(){
//         return this.Date.getTime()
//     }
//     reset(all_ms:number = this.all_ms){
//         this.Date.setTime(all_ms);
//         return tt.resetUTCTime(this,all_ms);
//     }
//     
// }
// class CurTime extends FullTime{
//     static getInst(){
//         const t = new CurTime(new Date());
//         t.update()
//         return t;
//     }
//     all_s: number;
//     /**更新当前时间对象，并且每当时间以秒为单位变化时将发出相应事件 */
//     update(){
//         const data = new Date()
//         this.Date = data;
//         const all_ms = data.getTime()
//         const allSecondsNum = Math.floor(all_ms/1000);
//         if(this.all_s !== allSecondsNum){
//             this.all_s = allSecondsNum;
//             tt.resetUTCTime(this,all_ms);
//             evt.mian.emit(evt.mianE.secondsChange);
//             if(this.s==0){
//                 evt.mian.emit(evt.mianE.minutesChange);
//             }
//         } 
//     }
// }
// 
// /**当前时间信息对象 */
// const curTime = CurTime.getInst()  as Omit<Readonly<CurTime>,"reset"|"addSelf">
// window["curTime"] = curTime;
// export default curTime
