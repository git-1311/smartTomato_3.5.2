import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import { tt } from "../../Script/tools/time/timeTools";
import Roulette from "./Roulette";

@ccclass('RouletteH')
export default class Roulette_H extends Roulette {
    
    
// // //关闭默认进位
// // @property({visible:false,override: true})
// // readonly next:Roulette =null;
// // @property(Roulette)
// // h1:Roulette_H1 = null;
// // get hour(){
// //     return this.h1.num*10 + this.num;
// // }
// // set hour(v){
// //     v = (v+24)%24;
// //     this.angle = this.diff * (v%10);
// //     this.h1.num =Math.floor(v/10);
// // }
// // @property({override: true})
// // get realNum(){
// //     const total = this.node.childrenCount
// //     return ((this._angle/this.diff) + total)%total
// // };
// // set realNum(v){
// //     // v = ((this.h1.num*10 + v))%24;
// //     // this.angle = this.diff * (v%10);
// //     // this.h1.num =Math.floor(v/10);
// // }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import { tt } from "../../Script/tools/time/timeTools";
// import Roulette from "./Roulette";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class Roulette_H extends Roulette {
//     
//     
//     // //关闭默认进位
//     // @property({visible:false,override: true})
//     // readonly next:Roulette =null;
//     // @property(Roulette)
//     // h1:Roulette_H1 = null;
//     // get hour(){
//     //     return this.h1.num*10 + this.num;
//     // }
//     // set hour(v){
//     //     v = (v+24)%24;
//     //     this.angle = this.diff * (v%10);
//     //     this.h1.num =Math.floor(v/10);
//     // }
//     // @property({override: true})
//     // get realNum(){
//     //     const total = this.node.childrenCount
//     //     return ((this._angle/this.diff) + total)%total
//     // };
//     // set realNum(v){
//     //     // v = ((this.h1.num*10 + v))%24;
//     //     // this.angle = this.diff * (v%10);
//     //     // this.h1.num =Math.floor(v/10);
//     // }
// }
