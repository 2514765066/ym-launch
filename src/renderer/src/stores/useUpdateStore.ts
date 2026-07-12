import { useConfigStore } from "@/stores/useConfigStore";
import eventEmitter from "@/hooks/eventEmitter";
import MessageBox from "@/components/ui/message-box";
import { getDayDiff } from "@/utils/time";
import Loading from "@/components/loading";
import { repoMap } from "@/map";
import { useStorage } from "@vueuse/core";

type Status =
  | "init"
  | "checking"
  | "updateAvailable"
  | "updateNotAvailable"
  | "downloading"
  | "downloaded"
  | "error";

export const useUpdateStore = defineStore("update", () => {
  const { config } = storeToRefs(useConfigStore());

  //最近更新时间
  const latestUpdateTime = useStorage("lastUpdateTime", Date.now());

  //状态
  const status = ref<Status>("init");

  //下载进度
  const downloadProgress = ref(0);

  //检查更新
  const checkUpdate = async () => {
    latestUpdateTime.value = Date.now();

    try {
      const installUpdate = async () => {
        //安装
        const res = await MessageBox.confirm({
          title: "安装新版本",
          description: "新版本下载完成,是否安装?",
        });

        //不安装
        if (!res) {
          return;
        }

        Loading.service();

        await electron.ipcRenderer.invoke("installUpdate");
      };

      //如果下载完成就直接安装
      if (status.value == "downloaded") {
        installUpdate();
        return;
      }

      status.value = "checking";

      //更新地址
      const updateUrl = repoMap[config.value.repo].updateUrl;

      const res = await electron.ipcRenderer.invoke("checkUpdata", updateUrl);

      //没有更新
      if (res == false) {
        status.value = "updateNotAvailable";
        return;
      }

      status.value = "updateAvailable";

      const checkResult = await MessageBox.confirm({
        title: "🎉发现新版本",
        description: `发现新版本${res},是否更新?`,
      });

      //不更新
      if (!checkResult) {
        status.value = "init";
        return;
      }

      status.value = "downloading";

      await electron.ipcRenderer.invoke("downloadUpdate");

      status.value = "downloaded";

      installUpdate();
    } catch (e) {
      eventEmitter.emit("error:show", "出错了,请重试");

      status.value = "init";

      console.error(e);
    }
  };

  //初始化
  const init = () => {
    if (!config.value.autoUpdate) {
      return;
    }

    //当前时间
    const now = Date.now();

    //对比上次时间
    const day = getDayDiff(latestUpdateTime.value, now);

    //改成当前时间
    latestUpdateTime.value = Date.now();

    //不自动更新
    if (day < 3) {
      return;
    }

    checkUpdate();
  };

  //监听下载进度
  electron.ipcRenderer.on("updateProgress", (_, percrent) => {
    downloadProgress.value = percrent;

    if (percrent == 100) {
      status.value = "init";
    }
  });

  init();

  return {
    status,
    downloadProgress,
    checkUpdate,
  };
});
