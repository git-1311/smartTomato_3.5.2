// /**所有底层UI的id */
// /**未打开，未加载预制体 */
// /**加载中 */
// /**
// * 打开（处于UI队列中）
// * - unshy：不位于栈顶时无法看到也无法点击，但仍在运行中
// * - shy ：不位于栈顶时处于休眠状态
// *  */
// /**处于暂时关闭的休眠状态 */
// /**用以保护对UI属性的正确访问 */

import { _decorator, warn, instantiate, Component } from 'cc';
const {ccclass, property,disallowMultiple,requireComponent} = _decorator;

import res from "../../loader/Resources";
import scene from "./UIScene";
export type UIID = PropertyNamesOf<All> ;
export const enum UIState{
    unuse,
    loading,
    opened,
    dormant,
}
class VirtualUI{
    state = UIState.unuse;
    isValid: boolean = true;
    private constructor(public readonly id:UIID){}
    async open(){
        if(this.state) {
            warn(`UI-${this.id}正在【${this.state}】中，请勿重复申请`);
            return Promise.resolve(false);
        }
        this.state = UIState.loading;
        console.time(`加载UI: 【${this.id}】 成功 `);
        const prefab = await res.loadUI(this.id);
        console.timeEnd(`加载UI: 【${this.id}】 成功 `);
        const node = instantiate(prefab);
        node.parent = scene.RN_UI;
        const ui = node.getComponent(UI);
        _all[ui.id] = ui;
        this.isValid = false;
        prefab.decRef();
        return ui.open()
    }
    static create(id:UIID):VirtualUI{
        return  new Proxy(new VirtualUI(id),this.handler)
    }
    static handler = {
        get:function (obj, key:keyof UI, receiver) {
            if(key in obj){
                return obj[key];
            }
            else{
                console.error(`UI-${obj.id} 还未打开，错误使用其属性:${key}`,obj)
            }
        },
        set:function (obj, key:keyof UI, value,receiver) {
            if(key in obj){
                obj[key] = value;
                return true
            }else{
                console.error(`UI-${obj.id} 还未打开，错误使用其属性:${key}`,obj);
                return false;
            }
        },
    }
}
class All{
    tomato = VirtualUI.create("tomato");
}
const _all = new All();
const handler1 = {
    get:function (obj: typeof _all, key:UIID, receiver) {
        if(obj[key].isValid){
            return obj[key] ;
        }else{
            console.error(`UI-${obj[key].id}已销毁`,obj);
        }
    },
}
export default abstract class UI extends Component implements VirtualUI{
    static all = new Proxy(_all,handler1) as Readonly<Record<UIID,UI>> 
    static topUI: UI;
// /**不位于栈顶时是否处于休眠状态*/
    readonly isShy: boolean = true;
    abstract readonly id:UIID;
    state = UIState.dormant;
    async open(){
// //onLoad的调用时机应该是：脚本所在节点加入节点树的那一刻，所以此语句应该不会被调用
        if(this._isOnLoadCalled==0) console.error("onLoad还未调用")
        this.putOnTop()
        console.time(`打开UI: 【${this.id}】`);
        await this.onOpen()
        console.timeEnd(`打开UI: 【${this.id}】`);
        return Promise.resolve(false)
    }
// /**将此节点放上栈顶 */
    private putOnTop() {
        const oldTop = UI.topUI;
        if(oldTop && oldTop.isShy){
            oldTop.node.active = false;
        }
        this.node.setSiblingIndex(-1);
        this.node.active = true;
        this.state = UIState.opened;
        UI.topUI = this;
    }
    async close(destroy = false){
        console.time(`关闭UI: 【${this.id}】`);
        await this.onClose()
        this.putOutTop()
        console.timeEnd(`关闭UI: 【${this.id}】`);
        if(destroy){
            this.node.destroy();
            console.log(`销毁UI，从下一帧开始，该对象将不再可用`);
        }else{
            this.node.active = false;
            this.state = UIState.dormant;
            console.log(`休眠UI`);
        }
        return 
    }
// /**将此节点从栈顶拿下来 */
    private putOutTop() {
        if(UI.topUI!=this) return
        UI.topUI =  null;
        const uiNs =  this.node.parent.children;
        const len = uiNs.length;
        for(let i = len-1 ; i>=0 ; i--){
            const ui = uiNs[i].getComponent(UI);
            if(ui?.state === UIState.opened && ui != this){
                UI.topUI = ui;
                ui.node.active = true;
                break
            }
        }
    }
// /**
// * 每次打开时调用的生命周期方法
// */
    protected abstract onOpen():Promise<void>;
// /**
// * 每次关闭前调用的生命周期方法
// */
    protected onClose(): Promise<void> {
        return 
    }
    protected onDestroy(): void {
        this.reassign();
    }
    private reassign(){
        const id = this.id;
        const ui = VirtualUI.create(id)
        _all[id] = ui;
    }
}

@ccclass('UI')
@disallowMultiple()@requireComponent(cc.BlockInputEvents)    @property({tooltip:"不位于栈顶时是否处于休眠状态"})
/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import res from "../../loader/Resources";
// import scene from "./UIScene";
// /**所有底层UI的id */
// export type UIID = PropertyNamesOf<All> ;
// 
// export const enum UIState{
//     /**未打开，未加载预制体 */
//     unuse,
//     /**加载中 */
//     loading,
//     /**
//      * 打开（处于UI队列中）
//      * - unshy：不位于栈顶时无法看到也无法点击，但仍在运行中
//      * - shy ：不位于栈顶时处于休眠状态
//      *  */
//     opened,
//     /**处于暂时关闭的休眠状态 */
//     dormant,
// }
// class VirtualUI{
//     state = UIState.unuse;
//     isValid: boolean = true;
//     private constructor(public readonly id:UIID){}
//     async open(){
//         if(this.state) {
//             cc.warn(`UI-${this.id}正在【${this.state}】中，请勿重复申请`);
//             return Promise.resolve(false);
//         }
//         this.state = UIState.loading;
//         console.time(`加载UI: 【${this.id}】 成功 `);
//         const prefab = await res.loadUI(this.id);
//         console.timeEnd(`加载UI: 【${this.id}】 成功 `);
//         const node = cc.instantiate(prefab);
//         node.parent = scene.RN_UI;
//         const ui = node.getComponent(UI);
//         _all[ui.id] = ui;
//         
//         this.isValid = false;
//         prefab.decRef();
// 
//         return ui.open()
//     }
// 
//     
//     static create(id:UIID):VirtualUI{
//         return  new Proxy(new VirtualUI(id),this.handler)
//     }
//     
//     /**用以保护对UI属性的正确访问 */
//     static handler = {
//         get:function (obj, key:keyof UI, receiver) {
//             if(key in obj){
//                 return obj[key];
//             }
//             else{
//                 console.error(`UI-${obj.id} 还未打开，错误使用其属性:${key}`,obj)
//             }
//         },
//         set:function (obj, key:keyof UI, value,receiver) {
//             if(key in obj){
//                 obj[key] = value;
//                 return true
//             }else{
//                 console.error(`UI-${obj.id} 还未打开，错误使用其属性:${key}`,obj);
//                 return false;
//             }
//         },
//     }
// }
// class All{
//     tomato = VirtualUI.create("tomato");
// }
// const _all = new All();
// const handler1 = {
//     get:function (obj: typeof _all, key:UIID, receiver) {
//         if(obj[key].isValid){
//             return obj[key] ;
//         }else{
//             console.error(`UI-${obj[key].id}已销毁`,obj);
//         }
//     },
// }
// 
// const {ccclass, property,disallowMultiple,requireComponent} = cc._decorator;
// @ccclass
// @disallowMultiple()
// @requireComponent(cc.BlockInputEvents)
// export default abstract class UI extends cc.Component implements VirtualUI{
//     static all = new Proxy(_all,handler1) as Readonly<Record<UIID,UI>> 
//     static topUI: UI;
// 
//     /**不位于栈顶时是否处于休眠状态*/
//     @property({tooltip:"不位于栈顶时是否处于休眠状态"})
//     readonly isShy: boolean = true;
// 
//     abstract readonly id:UIID;
//     state = UIState.dormant;
// 
//     async open(){
//         //onLoad的调用时机应该是：脚本所在节点加入节点树的那一刻，所以此语句应该不会被调用
//         if(this._isOnLoadCalled==0) console.error("onLoad还未调用")
//         
//         this.putOnTop()
//         console.time(`打开UI: 【${this.id}】`);
//         await this.onOpen()
//         console.timeEnd(`打开UI: 【${this.id}】`);
//         return Promise.resolve(false)
//     }
//     /**将此节点放上栈顶 */
//     private putOnTop() {
//         const oldTop = UI.topUI;
//         if(oldTop && oldTop.isShy){
//             oldTop.node.active = false;
//         }
//         this.node.setSiblingIndex(-1);
//         this.node.active = true;
//         this.state = UIState.opened;
//         UI.topUI = this;
//     }
//     async close(destroy = false){
//         console.time(`关闭UI: 【${this.id}】`);
//         await this.onClose()
//         this.putOutTop()
//         console.timeEnd(`关闭UI: 【${this.id}】`);
//         if(destroy){
//             this.node.destroy();
//             console.log(`销毁UI，从下一帧开始，该对象将不再可用`);
//         }else{
//             this.node.active = false;
//             this.state = UIState.dormant;
//             console.log(`休眠UI`);
//         }
//         return 
//     }
//     /**将此节点从栈顶拿下来 */
//     private putOutTop() {
//         if(UI.topUI!=this) return
//         UI.topUI =  null;
// 
//         const uiNs =  this.node.parent.children;
//         const len = uiNs.length;
//         for(let i = len-1 ; i>=0 ; i--){
//             const ui = uiNs[i].getComponent(UI);
//             if(ui?.state === UIState.opened && ui != this){
//                 UI.topUI = ui;
//                 ui.node.active = true;
//                 break
//             }
//         }
//     }
//     
//     
//     /**
//      * 每次打开时调用的生命周期方法
//      */
//     protected abstract onOpen():Promise<void>;
//     /**
//      * 每次关闭前调用的生命周期方法
//      */
//     protected onClose(): Promise<void> {
//         return 
//     }
// 
//     protected onDestroy(): void {
//         this.reassign();
//     }
// 
//     private reassign(){
//         const id = this.id;
//         const ui = VirtualUI.create(id)
//         _all[id] = ui;
//     }
// }
