// 已打开弹窗的内容选择器
const openDialogContentSelector =
  '[data-slot="dialog-content"][data-state="open"]';

// 判断当前是否存在打开的弹窗
export const hasOpenDialog = () => {
  return document.querySelector(openDialogContentSelector) !== null;
};
