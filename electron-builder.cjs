/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.2514765066.ym-launch',
  artifactName: 'ym-launch',
  productName: 'ym-launch',
  files: ['out'],
  asar: false,
  electronLanguages: ['zh-CN'],
  directories: {
    output: 'dist',
  },
  icon: 'build/icon.png',

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
