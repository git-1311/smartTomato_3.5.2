import { _decorator, Component, Event } from 'cc';
const {ccclass, property,executeInEditMode} = _decorator;

import { tt } from "../../Script/tools/time/timeTools";
export const enum RouletteState{stop,touch,end,virtual}

@ccclass('Roulette')
@executeInEditMode
export default class Roulette extends Component {
    @property
    get set(){return false}
    set set(v){
        let c = this.node.children[0]
        this.node.height = c.height*1.8;
        this.node.width = c.width;
        this.node.children.forEach((child,index,children)=>{
        child.name = index.toString();
        child.getComponent(cc.Label).string =children.length>10? tt.fitNumToStr(index):child.name;
        })
    }
    static readonly evevt = "numberChange";
// /**监听轮盘的变化*/
    static monitor(roulettes:Roulette[],callBack:Function,target){
        for (const roulette of roulettes) {
        roulette.node.on(this.evevt,callBack,target)
        }
    }
    @property({tooltip:"惯性运动【距离】系数"})
    protected inertia = 0.5;
    @property({tooltip:"惯性运动【速度】系数"})
    protected speed = 4;
    @property({tooltip:"溢出将影响下一位，可不填",type:Roulette})
    next:Roulette =null;
    @property({tooltip:"变成圆形，且都可见，用于debug"})
    private isCircle = false;
    @property({visible:false})
    private _num = 0;
    @property({step:1,tooltip:"当前整数数值"})
    get num(){return this._num};
    set num(v){
        this.angle =this.diff * v;
    }
    @property({tooltip:"当前在轮盘的实际位置"})
    get realNum(){
        const total = this.node.childrenCount
        return ((this._angle/this.diff) + total)%total
        };
        set realNum(v){
        this.angle = this.diff * v;
    }
    
    @property({visible:false})
    protected _angle = 0;
    @property({step:1})
    get angle(){return this._angle};
    set angle(v){
        const old = this._num;
        const total = this.node.childrenCount
        if(this.next){
        const rest =  Math.floor(v/360) % total;
        this.next.realNum += rest
        }

        this._angle =this.angleFit(v);
        this._num = Math.floor(((this._angle/this.diff) + total)%total);
        this.refresh();
// //处于监听滚动的状态，才会发射事件
        if(old!=this._num && this.Monitor) this.node.emit(Roulette.evevt);
    }
// // @property({visible:false})
    private _spacing = -72;
// // @property({step:1})
    get spacing(){return this._spacing};
    set spacing(v){
        this._spacing = v;
        this.refresh();
    }
    @property({tooltip:"是否监听触摸事件"})
    private Monitor = true;//要在属性检查器显示，不能以下划线开头
    get monitor(){return this.Monitor};
    set monitor(v){
        if(v){
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        }else{
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        }
        this.Monitor = v;
    }
    
// /**各子节点间的角度差值 */
    protected diff:number
// /**轮盘半径 */
    protected R:number;
// /**标记轮盘状态 */
    protected state = RouletteState.stop
// /**该值每帧流失20%，以防止过久停留也有很高速度*/
    protected averageDelta: number = 0;
    onLoad () {
        this.monitor = this.Monitor;
        this.R = this.node.children.reduce((preValue,c)=>{
        return preValue + c.height + this.spacing;
        },0) / Math.PI;
        this.diff  = 360/this.node.childrenCount;
        this.refresh();
    }
    touchStart(e?:Event.EventTouch){
        this.averageDelta = 0;
        cc.Tween.stopAllByTarget(this);
        this.state = RouletteState.touch
        this.node.scale = 1.1
    }
    touchMove(e:Event.EventTouch){
        let delta = e.getDeltaY();
        delta/=128;
// //方向改变，均值置为0
        if(this.averageDelta*delta < 0) this.averageDelta =  0
// //相当于：取最近几次的均值，越近，权值越大
        this.averageDelta += delta;
        this.realNum += delta;
    }
    touchEnd(e?:Event.EventTouch){
        this.node.scale = 1;
        this.state = RouletteState.end;

// //惯性运动【距离】调节处
        const delta = this.averageDelta*this.inertia;
        const end = delta+this.realNum;
        const fitEnd  = delta>0 ? Math.ceil(end) : Math.floor(end);
// //惯性运动【速度】调节处
        const t = Math.abs(fitEnd - this.realNum)/this.speed;

        return new Promise<void>((resolve,reject)=>{
        cc.tween<Roulette>(this)
        .to(t,{realNum:fitEnd},{ easing: 'sineOut'})
        .call(()=>{
        this.state = RouletteState.stop;
        resolve()
        })
        .start()

        })
    }
    
    private refresh(){
        const endAngle = this.diff*0.5;
        const fullAngle = this.diff*0.3;
        this.node.children.forEach((child,index)=>{


// //获取角度
        let angle = this.angle - this.diff * index;
        angle = this.angleFit(angle)

// //设置位置
        child.y = Math.sin(angle/180*Math.PI )*this.R
        child.x = this.isCircle ? Math.cos(angle/180*Math.PI )*this.R : 0;

        angle = Math.abs(angle);
// /**变化系数*/
        const x = this.isCircle ? 1
        : angle < fullAngle ? 1
        : angle > endAngle ? 0
        : (endAngle - angle)/(endAngle - fullAngle)

        child.opacity = 255 *   x;
        child.scale = 0.85 + 0.15*x;
        })
    }
    angleFit(v:number){
        while (true) {
        if(v>180) v-=360;
        else if(v<-180) v+=360;
        else return v
        }
    }
    protected update(dt: number): void {
        if(this.state== RouletteState.touch){
        this.averageDelta*=0.8
        }
    }
    
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import { tt } from "../../Script/tools/time/timeTools";
// 
// const {ccclass, property,executeInEditMode} = cc._decorator;
// export const enum RouletteState{stop,touch,end,virtual}
// @ccclass
// @executeInEditMode
// export default class Roulette extends cc.Component {
//     @property
//     get set(){return false}
//     set set(v){
//         let c = this.node.children[0]
//         this.node.height = c.height*1.8;
//         this.node.width = c.width;
//         this.node.children.forEach((child,index,children)=>{
//             child.name = index.toString();
//             child.getComponent(cc.Label).string =children.length>10? tt.fitNumToStr(index):child.name;
//         })
//     }
//     static readonly evevt = "numberChange";
//     /**监听轮盘的变化*/
//     static monitor(roulettes:Roulette[],callBack:Function,target){
//         for (const roulette of roulettes) {
//             roulette.node.on(this.evevt,callBack,target)
//         }
//     }
// 
// 
// 
//     @property({tooltip:"惯性运动【距离】系数"})
//     protected inertia = 0.5;
//     @property({tooltip:"惯性运动【速度】系数"})
//     protected speed = 4;
// 
//     @property({tooltip:"溢出将影响下一位，可不填",type:Roulette})
//     next:Roulette =null;
//     @property({tooltip:"变成圆形，且都可见，用于debug"})
//     private isCircle = false;
// 
//     @property({visible:false})
//     private _num = 0;
//     @property({step:1,tooltip:"当前整数数值"})
//     get num(){return this._num};
//     set num(v){
//         this.angle =this.diff * v;
//     }
// 
//     @property({tooltip:"当前在轮盘的实际位置"})
//     get realNum(){
//         const total = this.node.childrenCount
//         return ((this._angle/this.diff) + total)%total
//     };
//     set realNum(v){
//         this.angle = this.diff * v;
//     }
//     
//     @property({visible:false})
//     protected _angle = 0;
//     @property({step:1})
//     get angle(){return this._angle};
//     set angle(v){
//         const old = this._num;
//         const total = this.node.childrenCount
//         if(this.next){
//             const rest =  Math.floor(v/360) % total;
//             this.next.realNum += rest
//         }
// 
//         this._angle =this.angleFit(v);
//         this._num = Math.floor(((this._angle/this.diff) + total)%total);
//         this.refresh();
//         //处于监听滚动的状态，才会发射事件
//         if(old!=this._num && this.Monitor) this.node.emit(Roulette.evevt);
//     }
// 
//     // @property({visible:false})
//     private _spacing = -72;
//     // @property({step:1})
//     get spacing(){return this._spacing};
//     set spacing(v){
//         this._spacing = v;
//         this.refresh();
//     }
//     @property({tooltip:"是否监听触摸事件"})
//     private Monitor = true;//要在属性检查器显示，不能以下划线开头
//     get monitor(){return this.Monitor};
//     set monitor(v){
//         if(v){
//             this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
//             this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
//             this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
//             this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
//         }else{
//             this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
//             this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
//             this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
//             this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
//         }
//         this.Monitor = v;
//     }
// 
//     
//     /**各子节点间的角度差值 */
//     protected diff:number
//     /**轮盘半径 */
//     protected R:number;
//     /**标记轮盘状态 */
//     protected state = RouletteState.stop
//     /**该值每帧流失20%，以防止过久停留也有很高速度*/
//     protected averageDelta: number = 0;
//     onLoad () {
//         this.monitor = this.Monitor;
//         this.R = this.node.children.reduce((preValue,c)=>{
//             return preValue + c.height + this.spacing;
//         },0) / Math.PI;
//         this.diff  = 360/this.node.childrenCount;
//         this.refresh();
//     }
// 
//     touchStart(e?:cc.Event.EventTouch){
//         this.averageDelta = 0;
//         cc.Tween.stopAllByTarget(this);
//         this.state = RouletteState.touch
//         this.node.scale = 1.1
//     }
//     touchMove(e:cc.Event.EventTouch){
//         let delta = e.getDeltaY();
//         delta/=128;
//         //方向改变，均值置为0
//         if(this.averageDelta*delta < 0) this.averageDelta =  0
//         //相当于：取最近几次的均值，越近，权值越大
//         this.averageDelta += delta;
//         this.realNum += delta;
//     }
//     touchEnd(e?:cc.Event.EventTouch){
//         this.node.scale = 1;
//         this.state = RouletteState.end;
// 
//         //惯性运动【距离】调节处
//         const delta = this.averageDelta*this.inertia;
//         const end = delta+this.realNum;
//         const fitEnd  = delta>0 ? Math.ceil(end) : Math.floor(end);
//         //惯性运动【速度】调节处
//         const t = Math.abs(fitEnd - this.realNum)/this.speed;
// 
//         return new Promise<void>((resolve,reject)=>{
//             cc.tween<Roulette>(this)
//                 .to(t,{realNum:fitEnd},{ easing: 'sineOut'})
//                 .call(()=>{
//                     this.state = RouletteState.stop;
//                     resolve()
//                 })
//             .start()
// 
//         })
//     }
// 
// 
//     
//     private refresh(){
//         const endAngle = this.diff*0.5;
//         const fullAngle = this.diff*0.3;
//         this.node.children.forEach((child,index)=>{
//             
// 
//             //获取角度
//             let angle = this.angle - this.diff * index;
//             angle = this.angleFit(angle)
// 
//             //设置位置
//             child.y = Math.sin(angle/180*Math.PI )*this.R
//             child.x = this.isCircle ? Math.cos(angle/180*Math.PI )*this.R : 0;
// 
//             angle = Math.abs(angle);
//             /**变化系数*/
//             const x = this.isCircle ? 1
//                 : angle < fullAngle ? 1 
//                 : angle > endAngle ? 0 
//                 : (endAngle - angle)/(endAngle - fullAngle)
// 
//             child.opacity = 255 *   x;
//             child.scale = 0.85 + 0.15*x;
//         })
//     }
//     angleFit(v:number){
//         while (true) {
//             if(v>180) v-=360;
//             else if(v<-180) v+=360;
//             else return v
//         }
//     }
//     protected update(dt: number): void {
//         if(this.state== RouletteState.touch){
//             this.averageDelta*=0.8
//         }
//     }
// 
//     
// }
