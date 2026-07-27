import {
  Tray,
  nativeImage,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
} from 'electron';
import appIcon from '../../resources/icon.png?asset';
import { productName } from '@/../shared/app-info';

//创建托盘
export const createTray = (menu: (MenuItem | MenuItemConstructorOptions)[]) => {
  const tray = new Tray(nativeImage.createFromPath(appIcon));

  const contextMenu = Menu.buildFromTemplate(menu);

  tray.setToolTip(productName);
  tray.setContextMenu(contextMenu);

  return tray;
};
