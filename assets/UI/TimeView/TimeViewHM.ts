import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import curTime from "../../Script/tools/time/Current";
import { Time } from "../../Script/tools/time/DayTime";
import { tt } from "../../Script/tools/time/timeTools";
import Roulette from "../Roulette/Roulette";
import Roulette_H from "../Roulette/Roulette_H";
import TimeViewPPP from "./TimeViewPPP";

@ccclass('TimeViewHM')
export default class TimeViewHM extends Component {
    @property(Roulette)
    h:Roulette = null;
    @property(Roulette)
    m1:Roulette = null;
    @property(Roulette)
    m2:Roulette = null;
    @property(TimeViewPPP)
    ppp:TimeViewPPP = null;
    isMain = false;
    onLoad(){
        Roulette.monitor([this.h,this.m1,this.m2],()=>{
        this.ppp.setTime(this.getTime() - curTime.day_ms)
        },this)
    }
    setTime(t:tt.FitTime){
        const {h,m} = tt.fitIntoTime(t);
        this.h.num = h;
        this.m1.num = Math.floor(m/10);
        this.m2.num = m%10;
    }
    getTime(){
        return tt.intoMS({h:this.h.num,m:this.m1.num*10+this.m2.num})
    }
    
    start(){
        this.setTime(curTime);
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import curTime from "../../Script/tools/time/Current";
// import { Time } from "../../Script/tools/time/DayTime";
// import { tt } from "../../Script/tools/time/timeTools";
// import Roulette from "../Roulette/Roulette";
// import Roulette_H from "../Roulette/Roulette_H";
// import TimeViewPPP from "./TimeViewPPP";
// const {ccclass, property} = cc._decorator;
// @ccclass
// export default class TimeViewHM extends cc.Component {
//     @property(Roulette)
//     h:Roulette = null;
//     @property(Roulette)
//     m1:Roulette = null;
//     @property(Roulette)
//     m2:Roulette = null;
//     @property(TimeViewPPP)
//     ppp:TimeViewPPP = null;
// 
//     isMain = false;
//     onLoad(){
//         Roulette.monitor([this.h,this.m1,this.m2],()=>{
//             this.ppp.setTime(this.getTime() - curTime.day_ms)
//         },this)
//     }
//     setTime(t:tt.FitTime){
//        const {h,m} = tt.fitIntoTime(t);
//        this.h.num = h;
//        this.m1.num = Math.floor(m/10);
//        this.m2.num = m%10;
//     }
//     getTime(){
//         return tt.intoMS({h:this.h.num,m:this.m1.num*10+this.m2.num})
//     }
//     
//     start(){
//         this.setTime(curTime);
//     }
// }
