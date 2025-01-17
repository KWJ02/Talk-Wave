import { app, BrowserWindow, ipcMain, Notification, Menu } from 'electron'
import path from 'path'

let mainWindow

Menu.setApplicationMenu(null)

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 760,
    minWidth: 1200,
    minHeight: 760,
    resizable: false,
    useContentSize: true,
    center: true,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')  // preload 스크립트 추가
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, '../public/icon_crab.png'),
  })

  // 개발/프로덕션 환경에 따른 로드 방식 분기
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8080')
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('focus', () => {
    if (mainWindow) {
      mainWindow.flashFrame(false)  // setFlashFrame 대신 flashFrame 사용
    }
  })
}

// 알림 이벤트 처리
ipcMain.on('notify', (event, { title, body }) => {
  const notification = new Notification({ title, body })
  notification.show()

  // 현재 윈도우가 포커스되어 있지 않을 때만 깜빡임 시작
  if (mainWindow && !mainWindow.isFocused()) {
    mainWindow.flashFrame(true)  // setFlashFrame 대신 flashFrame 사용
  }
})

// 앱 준비 완료 시 창 생성
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})