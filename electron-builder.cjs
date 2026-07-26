/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.2514765066.ym-launcher',
  artifactName: 'Ym Launcher',
  productName: 'Ym Launcher',
  files: ['out'],
  asar: false,
  electronLanguages: ['zh-CN'],
  directories: {
    output: 'dist',
  },
  icon: 'resources/icon.png',

  nsis: {
    differentialPackage: false,
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    artifactName: '${productName}-${version}.${ext}',
    shortcutName: '${productName}',
    uninstallDisplayName: '${productName}',
    deleteAppDataOnUninstall: true,
  },

  generateUpdatesFilesForAllChannels: false,
};
