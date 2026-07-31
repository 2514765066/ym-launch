declare global {
  const __APP_VERSION__: string;
  const __APP_NAME__: string;
  const __APP_PRODUCT_NAME__: string;
}

//app版本
export const appVersion = __APP_VERSION__;

//app名称
export const appName = __APP_NAME__;

//产品名称
export const productName = __APP_PRODUCT_NAME__;

//本地数据前缀
export const storagePre = `${appName}:${appVersion.split('.')[0]}`;
