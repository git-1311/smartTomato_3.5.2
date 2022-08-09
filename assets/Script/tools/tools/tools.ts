// //此脚本不应该导入其他脚本！！
// /**
// * 许多小型的工具函数
// */
// /**
// * 设置widget撑满父节点
// * @param widget
// */

import { _decorator, Widget } from 'cc';
export default et
namespace et{
    export function initWidget(widget:Widget){
        widget.isAlignBottom = widget.isAlignTop = widget.isAlignRight = widget.isAlignLeft= true;
        widget.bottom = widget.top = widget.right = widget.left = 0;
    }
}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// export default et
// 
// //此脚本不应该导入其他脚本！！
// /**
//  * 许多小型的工具函数
//  */
// namespace et{
//     
// 
//     
//     /**
//      * 设置widget撑满父节点
//      * @param widget 
//      */
//     export function initWidget(widget:cc.Widget){
//         widget.isAlignBottom = widget.isAlignTop = widget.isAlignRight = widget.isAlignLeft= true;
//         widget.bottom = widget.top = widget.right = widget.left = 0;
//     }
// 
// }
