import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import path from 'path'

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 760,
    minWidth: 1200,
    minHeight: 760,
    resizable : false,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false
    }
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
}

// 알림 이벤트 처리
ipcMain.on('notify', (event, { title, body }) => {
  const notification = new Notification({ title, body })
  notification.show()
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