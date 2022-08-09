// /**与时间相关的工具函数与常量 */
// //定义成常量：增强语义、以防手误写错
// /**转换相应时间为毫秒以便于计算 */

import { _decorator } from 'cc';
export namespace tt{
export const aDay_ms = 86400000;
export const aHour_ms = 3600000;
export const aMinute_ms = 60000;
export const aSecond_ms = 1000;
export function intoMS({s=0,m=0,h=0}){
    return  s*aSecond_ms + m*aMinute_ms  + h*aHour_ms;
}
export type BaseTime = Param<typeof intoMS>
export type RBaseTime = Required<BaseTime>
export type FitTime = BaseTime|number;
export function fitIntoMS(t:FitTime){
    return  (typeof t == "number")? t : intoMS(t)
}
export function fitIntoTime(t:FitTime){
    return  (typeof t == "number")? resetTime({},t) : t
}
export function fitIntoMinute(t:FitTime){
    let all_ms = (typeof t == "number")? t : intoMS(t);
    return Math.floor(all_ms/aMinute_ms);
}
export function resetTime(t:BaseTime,all_ms:number =intoMS(t)){
    all_ms += aDay_ms;
    t.h = Math.floor(all_ms/aHour_ms)%24;
    t.m = Math.floor((all_ms%aHour_ms)/aMinute_ms);
    t.s = Math.floor((all_ms%aMinute_ms)/aSecond_ms);
    return t;
}
export const timeOffset = new Date().getTimezoneOffset()*aMinute_ms;
export function resetUTCTime(t:BaseTime,all_ms:number){
    all_ms-=timeOffset;
    t.h = Math.floor(all_ms/aHour_ms)%24;
    t.m = Math.floor((all_ms%aHour_ms)/aMinute_ms);
    t.s = Math.floor((all_ms%aMinute_ms)/aSecond_ms);
    return t;
}
export function fitNumToStr(n:number){
    return n<10 ? "0"+n : n.toString();
}
} 

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// /**与时间相关的工具函数与常量 */
// export namespace tt{
// 
// //定义成常量：增强语义、以防手误写错
// export const aDay_ms = 86400000;
// export const aHour_ms = 3600000;
// export const aMinute_ms = 60000;
// export const aSecond_ms = 1000;
// /**转换相应时间为毫秒以便于计算 */
// export function intoMS({s=0,m=0,h=0}){
//     return  s*aSecond_ms + m*aMinute_ms  + h*aHour_ms;
// }
// export type BaseTime = Param<typeof intoMS>
// export type RBaseTime = Required<BaseTime>
// export type FitTime = BaseTime|number;
// 
// export function fitIntoMS(t:FitTime){
//     return  (typeof t == "number")? t : intoMS(t)
// }
// export function fitIntoTime(t:FitTime){
//     return  (typeof t == "number")? resetTime({},t) : t
// }
// export function fitIntoMinute(t:FitTime){
//     let all_ms = (typeof t == "number")? t : intoMS(t);
//     return Math.floor(all_ms/aMinute_ms);
// }
// 
// export function resetTime(t:BaseTime,all_ms:number =intoMS(t)){
//     all_ms += aDay_ms;
//     t.h = Math.floor(all_ms/aHour_ms)%24;
//     t.m = Math.floor((all_ms%aHour_ms)/aMinute_ms);
//     t.s = Math.floor((all_ms%aMinute_ms)/aSecond_ms);
//     return t;
// }
// 
// export const timeOffset = new Date().getTimezoneOffset()*aMinute_ms;
// export function resetUTCTime(t:BaseTime,all_ms:number){
//     all_ms-=timeOffset;
//     t.h = Math.floor(all_ms/aHour_ms)%24;
//     t.m = Math.floor((all_ms%aHour_ms)/aMinute_ms);
//     t.s = Math.floor((all_ms%aMinute_ms)/aSecond_ms);
//     return t;
// }
// export function fitNumToStr(n:number){
//     return n<10 ? "0"+n : n.toString();
// }
// }
