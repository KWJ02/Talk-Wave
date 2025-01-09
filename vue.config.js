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
          '**/*',          // 모든 파일을 포함
          'dist/**/*'      // dist 폴더 내 모든 파일을 포함
        ],
        extraResources: ['./dist/**']  // dist 폴더 내 모든 파일을 리소스로 추가
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
