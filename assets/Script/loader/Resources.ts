import { _decorator, AssetManager, Asset } from 'cc';
import { UIID } from "../manger/UImanger/UI";
export type onProgressFn = (finished: number, total: number, item: AssetManager.RequestItem) => void;

export default class res {
    static loadUI(id:UIID){
        return this.load(`UI/${id}/${id}`,cc.Prefab);
    }
// /** 所有载入的资源*/
// // static readonly cacheList: cc.Asset[]=[];
// /**
// * 包装了 cc.resources.load ,其最后一个参数 onComplete 改为用Promise返回结果<br/>
// *
// * 并对加载资源的效果做统一处理
// */
    static load<T extends Asset>(path: string, type?: new()=> T, onProgress?: onProgressFn): Promise<T>;
    static load<T extends Asset>(paths: string[], type?: new()=> T, onProgress?:onProgressFn): Promise<Array<T>>;
    static load<T extends Asset>(path: string, onProgress:onProgressFn): Promise<T>;
    static load<T extends Asset>(paths: string[], onProgress: onProgressFn): Promise<Array<T>>;
    static load(param1, param2?, param3?){  
// //参数适配
        const path:string | string[] = param1;
        let type: typeof cc.Asset = param2;
        let onProgress: onProgressFn = param3;
        if(!(param2.$super)){//有.$super属性，表示是cc的类； instanceof cc.Object，表示是cc的实例
        type = null;
        onProgress = param2;
        }

// //统一处理 cc.resources.load 并用 Promise 返回结果
        return new Promise((resolve,reject)=>{
        cc.resources.load(path,type,onProgress,function(error: Error, assets) {
        if(error){
        cc.error(`从${path}加载资源失败！`,error)
        reject()
        }else{
        res.cacheAssets(assets);
        resolve(assets)
        }
        })
        })
    }
// /**记录 load 载入的资源或资源数组*/
    static cacheAssets(assets: Asset | Asset[]) {
        if(assets instanceof Array){
        for (const asset of assets) {
        this.cacheAsset(asset)
        }
        }else{
        this.cacheAsset(assets)
        }
    }
// /**记录 load 载入的资源*/
    static cacheAsset(asset: Asset){
        asset.addRef();
// // this.cacheList.push(asset);
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import { UIID } from "../manger/UImanger/UI";
// 
// 
// export type onProgressFn = (finished: number, total: number, item: cc.AssetManager.RequestItem) => void;
// 
// export default class res {
// 
//     static loadUI(id:UIID){
//         return this.load(`UI/${id}/${id}`,cc.Prefab);
//     }
//     /** 所有载入的资源*/
//     // static readonly cacheList: cc.Asset[]=[];
// 
//     /**
//      * 包装了 cc.resources.load ,其最后一个参数 onComplete 改为用Promise返回结果<br/>
//      * 
//      * 并对加载资源的效果做统一处理
//      */
//     static load<T extends cc.Asset>(path: string, type?: new()=> T, onProgress?: onProgressFn): Promise<T>;
//     static load<T extends cc.Asset>(paths: string[], type?: new()=> T, onProgress?:onProgressFn): Promise<Array<T>>;
//     static load<T extends cc.Asset>(path: string, onProgress:onProgressFn): Promise<T>;
//     static load<T extends cc.Asset>(paths: string[], onProgress: onProgressFn): Promise<Array<T>>;
//     static load(param1, param2?, param3?){  
//         //参数适配
//         const path:string | string[] = param1;
//         let type: typeof cc.Asset = param2;
//         let onProgress: onProgressFn = param3;
//         if(!(param2.$super)){//有.$super属性，表示是cc的类； instanceof cc.Object，表示是cc的实例
//             type = null;
//             onProgress = param2;
//         }
// 
//         //统一处理 cc.resources.load 并用 Promise 返回结果
//         return new Promise((resolve,reject)=>{
//             cc.resources.load(path,type,onProgress,function(error: Error, assets) {
//                 if(error){
//                     cc.error(`从${path}加载资源失败！`,error)
//                     reject()
//                 }else{
//                     res.cacheAssets(assets);
//                     resolve(assets)
//                 }
//             })
//         })
//     }
// 
//     /**记录 load 载入的资源或资源数组*/
//     static cacheAssets(assets: cc.Asset | cc.Asset[]) {
//         if(assets instanceof Array){
//             for (const asset of assets) {
//                 this.cacheAsset(asset)
//             }
//         }else{
//             this.cacheAsset(assets)
//         }
//     }
//     /**记录 load 载入的资源*/
//     static cacheAsset(asset: cc.Asset){
//         asset.addRef();
//         // this.cacheList.push(asset);
//     }
// }
