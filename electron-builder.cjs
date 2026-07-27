const { name, productName } = require('./package.json');

/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.2514765066.ym-launcher',
  productName,
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
    artifactName: name + '-${version}.${ext}',
    shortcutName: '${productName}',
    uninstallDisplayName: '${productName}',
    deleteAppDataOnUninstall: true,
  },
};
