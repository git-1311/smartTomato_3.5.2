import { _decorator, Color, Component, Enum } from 'cc';
const { ccclass, property, requireComponent, disallowMultiple, executeInEditMode, menu } = _decorator;

enum CType{
    LR,
    UD,
    all
}
const LRTipObj = { type: Color,visible:function(){return this.type == CType.LR}}
const UDTipObj = { type: Color,visible:function(){return this.type == CType.UD}}
const allTipObj = { type: Color,visible:function(){return this.type == CType.all}}
// /**
// * 渐变颜色，注意这会覆盖默认的节点颜色设置
// */

@ccclass('GradientColor')
@menu("tools/彩色组件")@requireComponent(cc.RenderComponent)@disallowMultiple@executeInEditMode
export default class GradientColor extends Component {
// /**4个元素分别是：左下、右下、左上、右上 */
    @property({visible:false})
    colors: Color[] = [Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE];
    @property({type:Enum(CType)})
    type:CType = CType.all
    @property(LRTipObj)
    get L(){return this.getWith(0)}
    set L(v){this.setWith(v,0)}
    @property(LRTipObj)
    get R(){return this.getWith(1)}
    set R(v){this.setWith(v,1)}
    @property(UDTipObj)
    get U(){return this.getWith(2)}
    set U(v){this.setWith(v,2)}
    @property(UDTipObj)
    get D(){return this.getWith(0)}
    set D(v){this.setWith(v,0)}
    private getWith(self:number){
        return this.colors[self]
    }
    private setWith(v:Color,self:number){
        this.colors[this.getPartner(self)] = v;
        this.colors[self] = v;
        this.markForRender();
    }
    private getPartner(self:number){
        switch (this.type) {
        case CType.all: return self;
        case CType.LR: return [2,3,0,1][self];
        case CType.UD: return [1,0,3,2][self];
        }
    }
    
    @property(allTipObj)
    get LD(){return this.colors[0]}
    set LD(v){this.colors[0] = v;this.markForRender()}
    @property(allTipObj)
    get RD(){return this.colors[1]}
    set RD(v){this.colors[1] = v;this.markForRender()}
    @property(allTipObj)
    get LU(){return this.colors[2]}
    set LU(v){this.colors[2] = v;this.markForRender()}
    @property(allTipObj)
    get RU(){return this.colors[3]}
    set RU(v){this.colors[3] = v;this.markForRender()}
    protected onEnable() {
        this.replaceFunction();
    }
    protected onDisable() {
        this.restoreFunction();
    }
    protected resetInEditor() {
        this.markForRender();
    }
// /**获取符合规定的渲染组件
// * - 只支持 Sprite（SIMPLE 和 FILLED）和 Label
// */
    get renderComponent(){
        let rc = this.getComponent(cc.RenderComponent);
        if(!(rc instanceof cc.Sprite || rc instanceof cc.Label)){
        cc.error("不支持此渲染组件,已删除");
        this.node.removeComponent(rc)
        }
        if (!rc){
        cc.error("缺少渲染组件,已默认添加Label");
        rc = this.addComponent(cc.Label)
        }
        if(rc instanceof cc.Sprite){
        const {SIMPLE,FILLED} =  cc.Sprite.Type
        if(rc.type !==SIMPLE &&  rc.type !==FILLED){
        cc.error("不支持Sprite组件的类型，已修改为SIMPLE")
        rc.type = SIMPLE
        }
        }
        return rc
    }
// /**
// * 替换颜色填充函数
// */
    protected replaceFunction() {
// // 获取装配器
        const assembler = this.renderComponent._assembler;
        if (!(assembler instanceof cc.Assembler2D)) return;
// // 替换颜色填充函数
        assembler.updateColor = () => {
// // 获取颜色数据缓存
        const uintVDatas = assembler._renderData.uintVDatas[0];
        if (!uintVDatas) return;
// // 顶点数据
        const floatsPerVert = assembler.floatsPerVert;  // 每个顶点的数据数量
        const colorOffset = assembler.colorOffset;      // 颜色偏移
        const nodeColor = this.node.color;              // 节点颜色
        let offset = 0;
        for (let i = colorOffset, l = uintVDatas.length; i < l; i += floatsPerVert) {
        uintVDatas[i] = (this.colors[offset++] || nodeColor)._val;
        }
        }
// // 标记
        this.markForRender();
    }
// /**
// * 还原颜色填充函数
// */
    protected restoreFunction() {
// // 获取装配器
        const assembler = this.renderComponent._assembler;
        if (!(assembler instanceof cc.Assembler2D)) return;
// // 恢复颜色填充函数
        assembler.updateColor = cc.Assembler2D.prototype.updateColor;
// // 标记
        this.markForRender();
    }
// /**
// * 标记
// */
    protected markForRender() {
        this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const { ccclass, property, requireComponent, disallowMultiple, executeInEditMode, menu } = cc._decorator;
// enum CType{
//     LR,
//     UD,
//     all
// }
// const LRTipObj = { type: cc.Color,visible:function(){return this.type == CType.LR}}
// const UDTipObj = { type: cc.Color,visible:function(){return this.type == CType.UD}}
// const allTipObj = { type: cc.Color,visible:function(){return this.type == CType.all}}
// /**
//  * 渐变颜色，注意这会覆盖默认的节点颜色设置
//  */
// @ccclass
// @menu("tools/彩色组件")
// @requireComponent(cc.RenderComponent)
// @disallowMultiple
// @executeInEditMode
// export default class GradientColor extends cc.Component {
// 
//     /**4个元素分别是：左下、右下、左上、右上 */
//     @property({visible:false})
//     colors: cc.Color[] = [cc.Color.WHITE, cc.Color.WHITE, cc.Color.WHITE, cc.Color.WHITE];
//     @property({type:cc.Enum(CType)})
//     type:CType = CType.all
//     @property(LRTipObj)
//     get L(){return this.getWith(0)}
//     set L(v){this.setWith(v,0)}
//     @property(LRTipObj)
//     get R(){return this.getWith(1)}
//     set R(v){this.setWith(v,1)}
//     @property(UDTipObj)
//     get U(){return this.getWith(2)}
//     set U(v){this.setWith(v,2)}
//     @property(UDTipObj)
//     get D(){return this.getWith(0)}
//     set D(v){this.setWith(v,0)}
// 
//     private getWith(self:number){
//         return this.colors[self]
//     }
//     private setWith(v:cc.Color,self:number){
//         this.colors[this.getPartner(self)] = v;
//         this.colors[self] = v;
//         this.markForRender();
//     }
//     private getPartner(self:number){
//         switch (this.type) {
//             case CType.all: return self;
//             case CType.LR: return [2,3,0,1][self];
//             case CType.UD: return [1,0,3,2][self];
//         }
//     }
//     
//     @property(allTipObj)
//     get LD(){return this.colors[0]}
//     set LD(v){this.colors[0] = v;this.markForRender()}
//     @property(allTipObj)
//     get RD(){return this.colors[1]}
//     set RD(v){this.colors[1] = v;this.markForRender()}
//     @property(allTipObj)
//     get LU(){return this.colors[2]}
//     set LU(v){this.colors[2] = v;this.markForRender()}
//     @property(allTipObj)
//     get RU(){return this.colors[3]}
//     set RU(v){this.colors[3] = v;this.markForRender()}
// 
// 
// 
// 
// 
// 
//     protected onEnable() {
//         this.replaceFunction();
//     }
// 
//     protected onDisable() {
//         this.restoreFunction();
//     }
// 
//     protected resetInEditor() {
//         this.markForRender();
//     }
// 
//     /**获取符合规定的渲染组件
//      * - 只支持 Sprite（SIMPLE 和 FILLED）和 Label
//      */
//     get renderComponent(){
//         let rc = this.getComponent(cc.RenderComponent);
//         if(!(rc instanceof cc.Sprite || rc instanceof cc.Label)){
//             cc.error("不支持此渲染组件,已删除");
//             this.node.removeComponent(rc)
//         }
//         if (!rc){
//             cc.error("缺少渲染组件,已默认添加Label");
//             rc = this.addComponent(cc.Label)
//         } 
//         if(rc instanceof cc.Sprite){
//             const {SIMPLE,FILLED} =  cc.Sprite.Type
//             if(rc.type !==SIMPLE &&  rc.type !==FILLED){
//                 cc.error("不支持Sprite组件的类型，已修改为SIMPLE")
//                 rc.type = SIMPLE
//             }
//         }
//         return rc
//     }
//     /**
//      * 替换颜色填充函数
//      */
//     protected replaceFunction() {
//         // 获取装配器
//         const assembler = this.renderComponent._assembler;
//         if (!(assembler instanceof cc.Assembler2D)) return;
//         // 替换颜色填充函数
//         assembler.updateColor = () => {
//             // 获取颜色数据缓存
//             const uintVDatas = assembler._renderData.uintVDatas[0];
//             if (!uintVDatas) return;
//             // 顶点数据
//             const floatsPerVert = assembler.floatsPerVert;  // 每个顶点的数据数量
//             const colorOffset = assembler.colorOffset;      // 颜色偏移
//             const nodeColor = this.node.color;              // 节点颜色
//             let offset = 0;
//             for (let i = colorOffset, l = uintVDatas.length; i < l; i += floatsPerVert) {
//                 uintVDatas[i] = (this.colors[offset++] || nodeColor)._val;
//             }
//         }
//         // 标记
//         this.markForRender();
//     }
// 
//     /**
//      * 还原颜色填充函数
//      */
//     protected restoreFunction() {
//         // 获取装配器
//         const assembler = this.renderComponent._assembler;
//         if (!(assembler instanceof cc.Assembler2D)) return;
//         // 恢复颜色填充函数
//         assembler.updateColor = cc.Assembler2D.prototype.updateColor;
//         // 标记
//         this.markForRender();
//     }
// 
//     /**
//      * 标记
//      */
//     protected markForRender() {
//         this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
//     }
// 
// }
