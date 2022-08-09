import { _decorator, ProgressBar, Node } from 'cc';
const {ccclass, property,executeInEditMode} = _decorator;

@ccclass('ProgressBar')
@executeInEditMode
export default class ProgressBar extends ProgressBar {
    @property(Node)
    point:Node | null = null;
    @property
    get Init(){
        return false;
    }
    set Init(value){
        this.init_DEV()
    }
    onLoad () {
        this.init_DEV()
    }
    init_DEV(){
        if(!CC_DEV)return;
        if(this.barSprite)this.initBar();
    }
    initPoint(bar:Node) {
        this.point.parent = bar;
        if(this.mode=== cc.ProgressBar.Mode.HORIZONTAL){
        const x = this.node.width*(this.reverse?-this.progress:this.progress);
        this.point.setPosition(x,0);
        }else if(this.mode=== cc.ProgressBar.Mode.VERTICAL){
        const y = this.node.height*(this.reverse?-this.progress:this.progress);
        this.point.setPosition(0,y);
        }
    }
    initBar() {
        const bar = this.barSprite.node;
        bar.parent = this.node;
        let widget = this.barSprite.getComponent(cc.Widget);
        if(!widget) widget = this.barSprite.addComponent(cc.Widget);

        widget.alignMode = cc.Widget.AlignMode.ONCE;
        widget.isAlignTop = widget.isAlignBottom = widget.isAlignRight = widget.isAlignLeft = true;
        widget.top = widget.bottom = widget.right = widget.left = 0;

        if(this.mode=== cc.ProgressBar.Mode.HORIZONTAL){

        this.totalLength = this.node.width;
        if(this.reverse){
        bar.anchorX = 1;
        widget.isAlignLeft = false;
        widget.right = 0;
        }else{
        bar.anchorX = 0;
        widget.isAlignRight = false;
        widget.left = 0;
        }
        }else if(this.mode=== cc.ProgressBar.Mode.VERTICAL){
        this.totalLength = this.node.height;
        if(this.reverse){
        bar.anchorY = 1;
        widget.isAlignBottom = false;
        widget.top = 0;
        }else{
        bar.anchorY = 0;
        widget.isAlignTop = false;
        widget.bottom = 0;
        }
        }
        if(this.point)this.initPoint(bar);
    }
    start () {

    }
// // update (dt) {}
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const {ccclass, property,executeInEditMode} = cc._decorator;
// 
// @ccclass
// @executeInEditMode
// export default class ProgressBar extends cc.ProgressBar {
// 
//     @property(cc.Node)
//     point:cc.Node = null;
//     @property
//     get Init(){
//         return false;
//     }
//     set Init(value){
//         this.init_DEV()
//     }
// 
//     onLoad () {
//         this.init_DEV()
//     }
//     init_DEV(){
//         if(!CC_DEV)return;
//         if(this.barSprite)this.initBar();
//     }
//     initPoint(bar:cc.Node) {
//         this.point.parent = bar;
//         if(this.mode=== cc.ProgressBar.Mode.HORIZONTAL){
//             const x = this.node.width*(this.reverse?-this.progress:this.progress);
//             this.point.setPosition(x,0);
//         }else if(this.mode=== cc.ProgressBar.Mode.VERTICAL){
//             const y = this.node.height*(this.reverse?-this.progress:this.progress);
//             this.point.setPosition(0,y);
//         }
//     }
//     initBar() {
//         const bar = this.barSprite.node;
//         bar.parent = this.node;
//         let widget = this.barSprite.getComponent(cc.Widget);
//         if(!widget) widget = this.barSprite.addComponent(cc.Widget);
// 
//         widget.alignMode = cc.Widget.AlignMode.ONCE;
//         widget.isAlignTop = widget.isAlignBottom = widget.isAlignRight = widget.isAlignLeft = true;
//         widget.top = widget.bottom = widget.right = widget.left = 0;
// 
//         if(this.mode=== cc.ProgressBar.Mode.HORIZONTAL){
//             
//             this.totalLength = this.node.width;
//             if(this.reverse){
//                 bar.anchorX = 1;
//                 widget.isAlignLeft = false;
//                 widget.right = 0;
//             }else{
//                 bar.anchorX = 0;
//                 widget.isAlignRight = false;
//                 widget.left = 0;
//             }
//         }else if(this.mode=== cc.ProgressBar.Mode.VERTICAL){
//             this.totalLength = this.node.height;
//             if(this.reverse){
//                 bar.anchorY = 1;
//                 widget.isAlignBottom = false;
//                 widget.top = 0;
//             }else{
//                 bar.anchorY = 0;
//                 widget.isAlignTop = false;
//                 widget.bottom = 0;
//             }
//         }
//         if(this.point)this.initPoint(bar);
//     }
// 
//     start () {
// 
//     }
// 
//     // update (dt) {}
// }
