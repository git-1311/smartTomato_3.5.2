import { _decorator, Component, Node } from 'cc';
const {ccclass, property} = _decorator;

import UI from "./UI";
import mm from "../main/MainManager";
import curTime from "../../tools/time/Current";
class Scene extends Component {
    static inst:Scene = null;
// /**所有底层UI的根节点 */
    RN_UI:Node | null = null;
    RN_float:Node | null = null;
    protected onLoad(){
        Scene.inst = this;
        mm.init()
    }
    protected update(dt: number): void {
        curTime.update();
    }
}
const scene = new Proxy({} as Readonly<Scene>,{
    get:function (obj,key) {
        return Scene.inst[key]
    }
})
export default scene;

@ccclass('UIScene')
    @property(cc.Node)    @property(cc.Node)
/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import UI from "./UI";
// import mm from "../main/MainManager";
// import curTime from "../../tools/time/Current";
// 
// 
// const {ccclass, property} = cc._decorator;
// @ccclass
// class Scene extends cc.Component {
//     static inst:Scene = null;
// 
//     /**所有底层UI的根节点 */
//     @property(cc.Node)
//     RN_UI:cc.Node = null;
// 
//     @property(cc.Node)
//     RN_float:cc.Node = null;
// 
//     protected onLoad(){
//         Scene.inst = this;
//         mm.init()
//     }
//     protected update(dt: number): void {
//         curTime.update();
//     }
// 
// 
// }
// const scene = new Proxy({} as Readonly<Scene>,{
//     get:function (obj,key) {
//         return Scene.inst[key]
//     }
// })
// 
// 
// export default scene;
