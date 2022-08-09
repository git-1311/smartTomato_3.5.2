import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import Roulette, { RouletteState } from "./Roulette";
import Roulette_H1 from "./Roulette_H1";

@ccclass('RouletteM2')
export default class Roulette_M2 extends Roulette {
// // barTouch = false;
// // get minute(){
// //     return this.next.num*10 + this.num;
// // }
// // set minute(v){
// //     v=(v+60)%60
// //     this.num = v%10;
// //     this.next.num = Math.floor(v/10);
// // }
// // @property({tooltip:"当前在轮盘的实际位置"})
// // get realNum(){
// //     return ((this._angle/this.diff) + 10)%10
// // };
// // set realNum(v){
// //     if(this.barTouch){
// //         v = this.jumpV(v)
// //     }
// //     this.angle = this.diff * v;
// // }
// // jumpV(v:number){
// //     const delta =v - this.realNum;
// //     let Ftarget = (v+10)%10;
// //     if(Ftarget<=0.5){
// //         return v;
// //     }else if(Ftarget<4.5){
// //         return delta>0 ? 4.5 : 0.5
// //     }else if(Ftarget<=5.5){
// //         return v;
// //     }else if(Ftarget<9.5){
// //         return delta>0 ? 9.5 : 5.5
// //     }else{
// //         return v;
// //     }
// // }
// // touchStart(e:cc.Event.EventTouch){
// //     this.barTouch = e.target != this.node;
// //     super.touchStart(e)
// // }
// // touchEnd(e:cc.Event.EventTouch){
// //     if(!this.barTouch){
// //         return super.touchEnd()
// //     }
// //     this.node.scale = 1;
// //     this.state = RouletteState.end;
// //     //惯性运动【距离】调节处
// //     const delta = this.averageDelta*this.inertia;
// //     const end = delta+this.realNum;
// //     // const fitEnd  = (end- end%5) + Math.sign(delta)*5;
// //     const fitEnd  = (end- end%5) + Math.abs(end%5)>2.5 ? Math.sign(delta)*5 :0;
// //     //惯性运动【速度】调节处
// //     // let t = Math.abs(fitEnd - this.realNum)/this.speed;
// //     return new Promise<void>((resolve,reject)=>{
// //         cc.tween<Roulette>(this)
// //             .to(0.15,{realNum:fitEnd},{ easing: 'sineOut'})
// //             .call(()=>{
// //                 this.state = RouletteState.stop;
// //                 this.barTouch = false;
// //                 resolve();
// //             })
// //         .start()
// //     })
// // }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import Roulette, { RouletteState } from "./Roulette";
// import Roulette_H1 from "./Roulette_H1";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class Roulette_M2 extends Roulette {
//     // barTouch = false;
//     // get minute(){
//     //     return this.next.num*10 + this.num;
//     // }
//     // set minute(v){
//     //     v=(v+60)%60
//     //     this.num = v%10;
//     //     this.next.num = Math.floor(v/10);
//     // }
//     // @property({tooltip:"当前在轮盘的实际位置"})
//     // get realNum(){
//     //     return ((this._angle/this.diff) + 10)%10
//     // };
//     // set realNum(v){
//     //     if(this.barTouch){
//     //         v = this.jumpV(v)
//     //     }
//     //     this.angle = this.diff * v;
//     // }
//     // jumpV(v:number){
//     //     const delta =v - this.realNum;
//     //     let Ftarget = (v+10)%10;
//     //     if(Ftarget<=0.5){
//     //         return v;
//     //     }else if(Ftarget<4.5){
//     //         return delta>0 ? 4.5 : 0.5
//     //     }else if(Ftarget<=5.5){
//     //         return v;
//     //     }else if(Ftarget<9.5){
//     //         return delta>0 ? 9.5 : 5.5
//     //     }else{
//     //         return v;
//     //     }
//     // }
//     // touchStart(e:cc.Event.EventTouch){
//     //     this.barTouch = e.target != this.node;
//     //     super.touchStart(e)
//     // }
//     // touchEnd(e:cc.Event.EventTouch){
//     //     if(!this.barTouch){
//     //         return super.touchEnd()
//     //     }
//     //     this.node.scale = 1;
//     //     this.state = RouletteState.end;
// 
//     //     //惯性运动【距离】调节处
//     //     const delta = this.averageDelta*this.inertia;
//     //     const end = delta+this.realNum;
//     //     // const fitEnd  = (end- end%5) + Math.sign(delta)*5;
//     //     const fitEnd  = (end- end%5) + Math.abs(end%5)>2.5 ? Math.sign(delta)*5 :0;
//     //     //惯性运动【速度】调节处
//     //     // let t = Math.abs(fitEnd - this.realNum)/this.speed;
//     //     return new Promise<void>((resolve,reject)=>{
//     //         cc.tween<Roulette>(this)
//     //             .to(0.15,{realNum:fitEnd},{ easing: 'sineOut'})
//     //             .call(()=>{
//     //                 this.state = RouletteState.stop;
//     //                 this.barTouch = false;
//     //                 resolve();
//     //             })
//     //         .start()
// 
//     //     })
//     // }
// }
