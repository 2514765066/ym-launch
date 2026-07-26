export type AppNode = {
  id: string;
  label: string;
  keyword: string;
  path: string;
  kind: 'app';
};

export type GroupNode = {
  id: string;
  label: string;
  keyword: string;
  children: string[];
  kind: 'group';
};

export type Node = AppNode | GroupNode;

export type HotCornerPosition =
  'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
