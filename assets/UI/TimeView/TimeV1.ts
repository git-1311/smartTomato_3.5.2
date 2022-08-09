import { _decorator, Component, Enum } from 'cc';
const {ccclass, property} = _decorator;

import evt from "../../Script/manger/main/Event";
import curTime from "../../Script/tools/time/Current";
import { tt } from "../../Script/tools/time/timeTools";
import Roulette from "../Roulette/Roulette";
import TimeViewHM from "./TimeViewHM";
import TimeViewPPP from "./TimeViewPPP";
enum MainType{
    HM,
    PPP
}

@ccclass('TimeV1')
export default class TimeV1 extends Component {
    @property
    private _main = MainType.HM;
    @property({type:Enum(MainType)})
    get main(){return this._main}
    set main(v){
        this._main = v;
        const main = (v==MainType.HM ? this.hm :this.ppp).node;
        const near = (v!==MainType.HM ? this.hm :this.ppp).node;
        near.getComponentsInChildren(Roulette).forEach(r=>{
        r.monitor = false
        })
        main.getComponentsInChildren(Roulette).forEach(r=>{
        r.monitor = true
        })
        const ms = 2.5, ns = 0.6
        main.scale = ms;
        near.scale = ns;
        near.x = main.width/2*ms;
        main.x = -near.x;
        near.once(cc.Node.EventType.TOUCH_START,()=>{
        cc.log("TOUCH_START");
        this.main = this._main==MainType.PPP ?MainType.HM:MainType.PPP
        })

    }
    @property(TimeViewHM)
    hm:TimeViewHM = null;
    @property(TimeViewPPP)
    ppp:TimeViewPPP = null;
    get mainView(){
        return this._main==MainType.HM ? this.hm :this.ppp
    }
    protected onLoad(): void {
        this.main = this._main;
        evt.mian.on(evt.mianE.minutesChange,this.onMinutesChange,this);
    }
    onMinutesChange() {
        if(this.main === MainType.PPP){
        this.ppp.fitHM()
        }
    }
    start () {
        this.hm.setTime(curTime.getLaterTime({h:3}));
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import evt from "../../Script/manger/main/Event";
// import curTime from "../../Script/tools/time/Current";
// import { tt } from "../../Script/tools/time/timeTools";
// import Roulette from "../Roulette/Roulette";
// import TimeViewHM from "./TimeViewHM";
// import TimeViewPPP from "./TimeViewPPP";
// 
// enum MainType{
//     HM,
//     PPP
// }
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class TimeV1 extends cc.Component {
//     @property
//     private _main = MainType.HM;
//     @property({type:cc.Enum(MainType)})
//     get main(){return this._main}
//     set main(v){
//         this._main = v;
//         const main = (v==MainType.HM ? this.hm :this.ppp).node;
//         const near = (v!==MainType.HM ? this.hm :this.ppp).node;
//         near.getComponentsInChildren(Roulette).forEach(r=>{
//             r.monitor = false
//         })
//         main.getComponentsInChildren(Roulette).forEach(r=>{
//             r.monitor = true
//         })
//         const ms = 2.5, ns = 0.6
//         main.scale = ms;
//         near.scale = ns;
//         near.x = main.width/2*ms;
//         main.x = -near.x;
//         near.once(cc.Node.EventType.TOUCH_START,()=>{
//             cc.log("TOUCH_START");
//             this.main = this._main==MainType.PPP ?MainType.HM:MainType.PPP
//         })
// 
//     }
// 
//     @property(TimeViewHM)
//     hm:TimeViewHM = null;
//     @property(TimeViewPPP)
//     ppp:TimeViewPPP = null;
// 
//     get mainView(){
//         return this._main==MainType.HM ? this.hm :this.ppp
//     }
//     protected onLoad(): void {
//         this.main = this._main;
//         evt.mian.on(evt.mianE.minutesChange,this.onMinutesChange,this);
//     }
//     onMinutesChange() {
//         if(this.main === MainType.PPP){
//             this.ppp.fitHM()
//         }
//     }
//     start () {
//         this.hm.setTime(curTime.getLaterTime({h:3}));
//     }
// }
