// //this为此返回函数的调用者，
// //一般将此函数赋为一个对象的属性方法就不会用错。
// /**
// * @param Class 实例的类型
// * @returns 返回记录的实例，如果没有会使用构造函数创造一个
// */
// /**
// * @param Class 实例的类型
// * @param instance 使用该实例更新记录的实例
// * @returns 返回新记录的实例
// */
// /**
// * @param Class 实例的类型
// * @param args 使用这些参数为构造函数的参数，去更新记录的实例
// * @returns 返回新记录的实例
// */

import { _decorator } from 'cc';
namespace Single{
    export function create<T>(resetData:(..._args)=>T){
        let data:T;
        return function creator(...args):T{
            if(!data || args.length!=0){
                data = resetData(...args)
            }
            return data
        }
    }
    export function read<T>(getDataFn:(...args)=>T,...args){
        let data:T;
        return function ():T{
            return data || (data = getDataFn.apply(this,args))
        }
    }
    const instanceCreators = new Map<new()=>any,(...args: any[]) => any>();
    export function get<T>(Class: { new(..._args): T }):T
    export function get<T>(Class: { new(..._args): T },instance:T):T
    export function get<T>(Class: { new(..._args): T },...args):T
    export function get<T>(Class: { new(..._args): T },...args){
        let creator = instanceCreators.get(Class);
        if (!creator) {
            creator = create(
                function resetData(...r_args){
                    let data:T;
                    if(r_args.length===0) data =  new Class();
                    else if(r_args.length===1 && r_args[0] instanceof Class) data =  r_args[0];
                    else data = new Class(...r_args);
                    return data
                }
            )
            instanceCreators.set(Class, creator);
        }
        return creator(...args)
    }
}
export default Single;

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// namespace Single{
//     
//     export function create<T>(resetData:(..._args)=>T){
//         let data:T;
//         return function creator(...args):T{
//             if(!data || args.length!=0){
//                 data = resetData(...args)
//             }
//             return data
//         }
//     }
// 
//     export function read<T>(getDataFn:(...args)=>T,...args){
//         let data:T;
//         return function ():T{
//             return data || (data = getDataFn.apply(this,args))
//             //this为此返回函数的调用者，
//             //一般将此函数赋为一个对象的属性方法就不会用错。
//         }
//     }
// 
// 
// 
//     const instanceCreators = new Map<new()=>any,(...args: any[]) => any>();
//     /**
//      * @param Class 实例的类型
//      * @returns 返回记录的实例，如果没有会使用构造函数创造一个
//      */
//     export function get<T>(Class: { new(..._args): T }):T
//     /**
//      * @param Class 实例的类型
//      * @param instance 使用该实例更新记录的实例
//      * @returns 返回新记录的实例
//      */
//     export function get<T>(Class: { new(..._args): T },instance:T):T
//     /**
//      * @param Class 实例的类型
//      * @param args 使用这些参数为构造函数的参数，去更新记录的实例
//      * @returns 返回新记录的实例
//      */
//     export function get<T>(Class: { new(..._args): T },...args):T
//     export function get<T>(Class: { new(..._args): T },...args){
//         let creator = instanceCreators.get(Class);
//         if (!creator) {
//             creator = create(
//                 function resetData(...r_args){
//                     let data:T;
//                     if(r_args.length===0) data =  new Class();
//                     else if(r_args.length===1 && r_args[0] instanceof Class) data =  r_args[0];
//                     else data = new Class(...r_args);
//                     return data
//                 }
//             )
//             instanceCreators.set(Class, creator);
//         }
//         return creator(...args)
//     }
// }
// export default Single;
