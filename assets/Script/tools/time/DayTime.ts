import { _decorator } from 'cc';
import { tt } from "./timeTools";

export class Time{
    static getInst(t:tt.FitTime=0){
        return tt.resetTime(new Time(),tt.fitIntoMS(t))
    }
// /**
// * 获取一个被监控的Time，只要Time修改就会调用相应回调
// */
    static getMonitorTime(callBack:Function,target?){
        return new Proxy(new Time(),{
        set:function(obj: Time, key: string, value: any){
        if(obj[key] === value) return true

        obj[key] = value;
        tt.resetTime(this);
        target ? callBack.call(target) : callBack()
        return true
        }
        })
    }
    h: number = 0;
    m: number = 0;
    s: number = 0;
    get all_ms(){
        return tt.intoMS(this)
    }
    getHMS(gap = " : "){
        return `${this.h}${gap}${this.m}${gap}${this.s}`
    }
    getHM(gap = " : "){
        return `${this.h}${gap}${this.m}`
    }
    getMS(gap = " : "){
        return `${this.m}${gap}${this.s}`
    }
    clone(){
        return Time.getInst(this)
    }
    add(t:tt.FitTime){
        return Time.getInst(tt.intoMS(this)+tt.fitIntoMS(t));
    }
    addSelf(t:tt.FitTime){
        return tt.resetTime(this,tt.intoMS(this)+tt.fitIntoMS(t));
    }
    reset(t:tt.FitTime){
        return tt.resetTime(this,tt.fitIntoMS(t))
    }
    
// /**获取一段时间后的毫秒数 */
    getLaterTime(t:tt.FitTime):number{
        return this.all_ms + tt.fitIntoMS(t);
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import { tt } from "./timeTools";
// 
// export class Time{
//     static getInst(t:tt.FitTime=0){
//         return tt.resetTime(new Time(),tt.fitIntoMS(t))
//     }
//     /**
//      * 获取一个被监控的Time，只要Time修改就会调用相应回调
//      */
//     static getMonitorTime(callBack:Function,target?){
//         return new Proxy(new Time(),{
//             set:function(obj: Time, key: string, value: any){
//                 if(obj[key] === value) return true
// 
//                 obj[key] = value;
//                 tt.resetTime(this);
//                 target ? callBack.call(target) : callBack()
//                 return true
//             }
//         })
//     }
//     h: number = 0;
//     m: number = 0;
//     s: number = 0;
//     get all_ms(){
//         return tt.intoMS(this)
//     }
//     getHMS(gap = " : "){
//         return `${this.h}${gap}${this.m}${gap}${this.s}`
//     }
//     getHM(gap = " : "){
//         return `${this.h}${gap}${this.m}`
//     }
//     getMS(gap = " : "){
//         return `${this.m}${gap}${this.s}`
//     }
//     clone(){
//         return Time.getInst(this)
//     }
//     add(t:tt.FitTime){
//         return Time.getInst(tt.intoMS(this)+tt.fitIntoMS(t));
//     }
//     addSelf(t:tt.FitTime){
//         return tt.resetTime(this,tt.intoMS(this)+tt.fitIntoMS(t));
//     }
//     reset(t:tt.FitTime){
//         return tt.resetTime(this,tt.fitIntoMS(t))
//     }
//     
//     /**获取一段时间后的毫秒数 */
//     getLaterTime(t:tt.FitTime):number{
//         return this.all_ms + tt.fitIntoMS(t);
//     }
// }
