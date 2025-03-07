import { app, BrowserWindow } from 'electron';
import { exec } from 'child_process';

let mainWindow;

app.on('ready', () => {
  
  mainWindow = new BrowserWindow({
    fullscreen:true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load React dev server in development mode
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('focus', () => {
    console.log("Window Focused");
  });
  mainWindow.on('blur', () => {
    console.log("Window Lost Focus");
    
  });

});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
