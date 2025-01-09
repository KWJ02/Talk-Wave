module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background.js',
      builderOptions: {
        appId: 'talkwave.app',
        productName: 'TalkWave',
        win: {
          icon: 'build/icon.ico',
          target: [
            {
              target: 'nsis',
              arch: ['x64']
            }
          ]
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          createDesktopShortcut: true
        },
        files: [
          "**/*",
          "dist/**/*"
        ],
        extraResources: ['./dist/**']
      }
    }
  }
}