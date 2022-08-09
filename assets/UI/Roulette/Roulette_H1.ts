import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import Roulette from "./Roulette";
import Roulette_H from "./Roulette_H";

@ccclass('RouletteH1')
export default class Roulette_H1 extends Roulette {
// //关闭默认进位
    @property({visible:false,override: true})
    readonly next:Roulette =null;
    @property(Roulette)
    h2:Roulette_H = null;
    
    @property({override: true})
    get realNum(){
        const total = this.node.childrenCount
        return ((this._angle/this.diff) + total)%total
        };
        set realNum(v){
        const o = v;
        v = (v+3)%3;
        if(v>=2 && this.h2.num >= 4){
        v= o > 0 ? 0 : 2;
        }
        this.angle = this.diff * v;
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import Roulette from "./Roulette";
// import Roulette_H from "./Roulette_H";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class Roulette_H1 extends Roulette {
//     //关闭默认进位
//     @property({visible:false,override: true})
//     readonly next:Roulette =null;
// 
//     @property(Roulette)
//     h2:Roulette_H = null;
//     
//     @property({override: true})
//     get realNum(){
//         const total = this.node.childrenCount
//         return ((this._angle/this.diff) + total)%total
//     };
//     set realNum(v){
//         const o = v;
//         v = (v+3)%3;
//         if(v>=2 && this.h2.num >= 4){
//             v= o > 0 ? 0 : 2;
//         }
//         this.angle = this.diff * v;
//     }
// }
