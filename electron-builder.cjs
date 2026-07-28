const { name, productName } = require('./package.json');

/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: `com.2514765066.${name}`,
  productName,
  files: ['out', 'resources'],
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
