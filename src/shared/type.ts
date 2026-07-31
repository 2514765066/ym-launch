type BaseNode = {
  id: string;
  label: string;
  keyword: string;
};

export type AppNode = BaseNode & {
  path: string;
  kind: 'app';
};

export type GroupNode = BaseNode & {
  children: string[];
  kind: 'group';
};

export type Node = AppNode | GroupNode;

export type HotCornerPosition =
  'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
