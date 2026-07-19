export type AppNode = {
  id: string;
  label: string;
  path: string;
  kind: 'app';
};

export type GroupNode = {
  id: string;
  label: string;
  children: string[];
  kind: 'group';
};

export type Node = AppNode | GroupNode;
