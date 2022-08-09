import { _decorator, Component } from 'cc';
const {ccclass, property,disallowMultiple,requireComponent,menu} = _decorator;

@ccclass('SwitchBtn')
@menu('默认组件/SwitchBtn')@requireComponent(cc.Button)@disallowMultiple()
export default class SwitchBtn extends Component {
    @property({visible:()=>{return false}})
    _selected = -1;
    @property({tooltip:"被选中的子节点的下标",step:1})
    get selected(){
        return this._selected;
    }
    set selected(index){
        const children = this.node.children;
        if(children.length == 0) index = -1;
        else{
        if(index<0 || index==children.length) index =0;
        else if(index>children.length) index = children.length-1;

        children.forEach((child,i)=>{
        if(index===i){
        child.active = true;
        this.node.setContentSize(child.getContentSize());
        }else{
        child.active = false;
        }
        })
        this._selected = index;
        }
    }
    
    @property({ type: Component.EventHandler,tooltip:"点击时调用，将返回选中的节点和下标" })
    onClick: Component.EventHandler = new Component.EventHandler();
    get btn(){
        return this.getComponent(cc.Button)
    }
    init_in_DEV(): void {
        if(this.btn.clickEvents.length===0){
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "SwitchBtn";
        clickEventHandler.handler = "next";
        this.btn.clickEvents.push(clickEventHandler);
        this.btn._init();
        }
        this.next()
    }
    next(){
        this.selected++;
        if(this.onClick && this.node.children.length )
        this.onClick.emit([this.node.children[this.selected],this.selected])
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const {ccclass, property,disallowMultiple,requireComponent,menu} = cc._decorator;
// 
// @ccclass
// @menu('默认组件/SwitchBtn')
// @requireComponent(cc.Button)
// @disallowMultiple()
// export default class SwitchBtn extends cc.Component {
//     @property({visible:()=>{return false}})
//     _selected = -1;
//     @property({tooltip:"被选中的子节点的下标",step:1})
//     get selected(){
//         return this._selected;
//     }
//     set selected(index){
//         const children = this.node.children;
//         if(children.length == 0) index = -1;
//         else{
//             if(index<0 || index==children.length) index =0;
//             else if(index>children.length) index = children.length-1;
// 
//             children.forEach((child,i)=>{
//                 if(index===i){
//                     child.active = true;
//                     this.node.setContentSize(child.getContentSize());
//                 }else{
//                     child.active = false;
//                 }
//             })
//             this._selected = index;
//         }
//     }
//     
//     @property({ type: cc.Component.EventHandler,tooltip:"点击时调用，将返回选中的节点和下标" })
//     onClick: cc.Component.EventHandler = new cc.Component.EventHandler();
// 
//     get btn(){
//         return this.getComponent(cc.Button)
//     }
// 
//     init_in_DEV(): void {
//         if(this.btn.clickEvents.length===0){
//             var clickEventHandler = new cc.Component.EventHandler();
//             clickEventHandler.target = this.node;
//             clickEventHandler.component = "SwitchBtn";
//             clickEventHandler.handler = "next";
//             this.btn.clickEvents.push(clickEventHandler);
//             this.btn._init();
//         }
//         this.next()
//     }
// 
//     next(){
//         this.selected++;
//         if(this.onClick && this.node.children.length )
//         this.onClick.emit([this.node.children[this.selected],this.selected])
//     }
// 
// 
// }
