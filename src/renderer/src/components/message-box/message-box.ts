import { render } from 'vue';
import Dialog from './index.vue';

// 确认框展示数据
export const data = reactive({
  title: '',
  description: '',
  confirmButtonText: '',
  cancelButtonText: '',
  visible: false,
});

export interface ConfirmOption {
  title: string;
  description: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

interface ConfirmRequest {
  option: ConfirmOption;
  resolve: (result: boolean) => void;
}

// 等待展示的确认请求
const requestQueue: ConfirmRequest[] = [];

// 当前正在展示的确认请求
let activeRequest: ConfirmRequest | null = null;

// 确认框是否已挂载
let isCreated = false;

// 展示队列中的下一个确认请求
const showNextConfirm = () => {
  if (activeRequest || requestQueue.length === 0) {
    return;
  }

  // 下一个待处理请求
  const request = requestQueue.shift();

  if (!request) {
    return;
  }

  activeRequest = request;

  Object.assign(data, {
    title: request.option.title,
    description: request.option.description,
    confirmButtonText: request.option.confirmButtonText ?? '',
    cancelButtonText: request.option.cancelButtonText ?? '',
    visible: true,
  });
};

// 首次调用时挂载确认框
const ensureMessageBoxCreated = () => {
  if (isCreated) {
    return;
  }

  isCreated = true;

  // 确认框挂载容器
  const container = document.createElement('div');

  document.body.appendChild(container);

  // 确认框组件节点
  const vnode = h(Dialog);

  render(vnode, container);
};

// 结算当前确认请求并继续处理队列
export const resolveConfirm = (result: boolean) => {
  // 当前待结算请求
  const request = activeRequest;

  if (!request) {
    return;
  }

  activeRequest = null;
  data.visible = false;
  request.resolve(result);

  nextTick(() => {
    showNextConfirm();
  });
};

// 将确认请求加入队列并返回独立结果
export const confirm = (option: ConfirmOption) => {
  // 当前请求的 Promise 控制器
  const { promise, resolve } = Promise.withResolvers<boolean>();

  requestQueue.push({
    option,
    resolve,
  });

  ensureMessageBoxCreated();
  showNextConfirm();

  return promise;
};
