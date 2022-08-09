import { _decorator, Component, Widget } from 'cc';
const { ccclass, property, executeInEditMode, menu ,disallowMultiple,requireComponent} = _decorator;

// /**
// * 设置widget撑满父节点
// * @param widget
// */
export function initWidget(widget:Widget){
    widget.isAlignBottom = widget.isAlignTop = widget.isAlignRight = widget.isAlignLeft= true;
    widget.bottom = widget.top = widget.right = widget.left = 0;
}

@ccclass('FitMargin')
@menu("UI/FitMargin")@executeInEditMode@disallowMultiple@requireComponent(cc.Widget)
export class FitMargin extends Component {
// /**某些贴边ui的统一基准边距 */
    static readonly margin = {
        top :0,
        bottom :0,
        left :0,
        right :0,
    }
    static setMargin(mg:Partial<typeof FitMargin.margin>){
        for (const key in this.margin) {
        if(mg[key] != undefined ){
        this.margin[key] = mg[key];
        }
        }
    }
    private _widget:Widget;
    get widget(){return this._widget ??= this.getComponent(Widget)}
    onLoad() {
        CC_EDITOR && initWidget(this.widget);
        this.fitMargin()
    }
    fitMargin(){
        for (const key in FitMargin.margin) {
        this.widget[key] = FitMargin.margin[key];
        }
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const { ccclass, property, executeInEditMode, menu ,disallowMultiple,requireComponent} = cc._decorator;
// /** 
//  * 有些贴边的UI可能不能按设计时的边距贴边，比如全面屏的刘海区域等。<br/>
//  * 
//  * 所以就要为这些UI添加统一的基准边距。
// */
// @ccclass
// @menu("UI/FitMargin")
// @executeInEditMode
// @disallowMultiple
// @requireComponent(cc.Widget)
// export class FitMargin extends cc.Component {
//     /**某些贴边ui的统一基准边距 */
//     static readonly margin = {
//         top :0,
//         bottom :0,
//         left :0,
//         right :0,
//     }
//     static setMargin(mg:Partial<typeof FitMargin.margin>){
//         for (const key in this.margin) {
//             if(mg[key] != undefined ){
//                 this.margin[key] = mg[key];
//             }
//         }
//     }
// 
//     private _widget:cc.Widget;
//     get widget(){return this._widget ??= this.getComponent(cc.Widget)}
// 
//     onLoad() {
//         CC_EDITOR && initWidget(this.widget);
//         this.fitMargin()
//     }
//     fitMargin(){
//         for (const key in FitMargin.margin) {
//             this.widget[key] = FitMargin.margin[key];
//         }
//     }
// }
// 
// /**
//      * 设置widget撑满父节点
//      * @param widget 
//      */
// export function initWidget(widget:cc.Widget){
//     widget.isAlignBottom = widget.isAlignTop = widget.isAlignRight = widget.isAlignLeft= true;
//     widget.bottom = widget.top = widget.right = widget.left = 0;
// }
