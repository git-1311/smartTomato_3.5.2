import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import curTime from "../../Script/tools/time/Current";
import { Time } from "../../Script/tools/time/DayTime";
import { tt } from "../../Script/tools/time/timeTools";
import Roulette from "../Roulette/Roulette";
import TimeViewHM from "./TimeViewHM";

@ccclass('TimeViewPPP')
export default class TimeViewPPP extends Component {
    @property
    get set(){return false}
    set set(v){
        this.node.height = 180
        this.node.children.forEach(c=>{
        c.height = 180;
        c.getComponent(cc.Widget).bottom = 0;
        })
    }
    
    @property(Roulette)
    p1:Roulette = null;
    @property(Roulette)
    p2:Roulette = null;
    @property(Roulette)
    p3:Roulette = null;
    hm:TimeViewHM = null;
    onLoad(){
        this.hm = this.node.parent.getComponentInChildren(TimeViewHM);
        Roulette.monitor([this.p1,this.p2,this.p3],this.fitHM,this)
    }
    fitHM(){
        this.hm.setTime(curTime.day_ms + this.getTime())
    }
    setTime(t:tt.FitTime){
        let allM = tt.fitIntoMinute(t);
        allM>1400 && (allM = 1400)
        allM<0 && (allM = 0)

        this.p1.num = allM%10;
        this.p2.num = Math.floor((allM%100)/10);
        this.p3.realNum = Math.floor(allM/100);
     }
     getTime(){
        return tt.intoMS({m:this.p1.num + this.p2.num*10 + this.p3.num*100})
     }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import curTime from "../../Script/tools/time/Current";
// import { Time } from "../../Script/tools/time/DayTime";
// import { tt } from "../../Script/tools/time/timeTools";
// import Roulette from "../Roulette/Roulette";
// import TimeViewHM from "./TimeViewHM";
// const {ccclass, property} = cc._decorator;
// @ccclass
// export default class TimeViewPPP extends cc.Component {
//     @property
//     get set(){return false}
//     set set(v){
//         this.node.height = 180
//         this.node.children.forEach(c=>{
//             c.height = 180;
//             c.getComponent(cc.Widget).bottom = 0;
//         })
//     }
//     
//     @property(Roulette)
//     p1:Roulette = null;
//     @property(Roulette)
//     p2:Roulette = null;
//     @property(Roulette)
//     p3:Roulette = null;
//     hm:TimeViewHM = null;
// 
//     onLoad(){
//         this.hm = this.node.parent.getComponentInChildren(TimeViewHM);
//         Roulette.monitor([this.p1,this.p2,this.p3],this.fitHM,this)
//     }
//     fitHM(){
//         this.hm.setTime(curTime.day_ms + this.getTime())
//     }
//     setTime(t:tt.FitTime){
//         let allM = tt.fitIntoMinute(t);
//         allM>1400 && (allM = 1400)
//         allM<0 && (allM = 0)
// 
//         this.p1.num = allM%10;
//         this.p2.num = Math.floor((allM%100)/10);
//         this.p3.realNum = Math.floor(allM/100);
//      }
//      getTime(){
//          return tt.intoMS({m:this.p1.num + this.p2.num*10 + this.p3.num*100})
//      }
// 
// }
