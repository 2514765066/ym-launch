import { appName } from "@/services/info";

export const repoMap = {
  gitee: {
    label: "Gitee",
    repoUrl: `https://gitee.com/yxingyus/${appName}`,
    updateUrl: `https://gitee.com/api/v5/repos/yxingyus/${appName}/releases/latest`,
    updateContentUrl: `https://gitee.com/yxingyus/${appName}/blob/main/release-note.md`,
    issueUrl: `https://gitee.com/yxingyus/${appName}/issues`,
  },
  github: {
    label: "GitHub",
    repoUrl: `https://github.com/2514765066/${appName}`,
    updateUrl: `https://api.github.com/repos/2514765066/${appName}/releases/latest`,
    updateContentUrl: `https://github.com/2514765066/${appName}/blob/main/release-note.md`,
    issueUrl: `https://github.com/2514765066/${appName}/issues`,
  },
};

export const updateMap = {
  checking: "正在检查更新...",
  updateAvailable: "发现更新",
  updateNotAvailable: "已是最新版",
  downloading: (value: number | string) => `下载中: ${value}%`,
};
