import { app, BrowserWindow, ipcMain, shell } from 'electron'
//import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import express from 'express';
import { execFile, exec } from 'node:child_process';

//const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null


function createWindow() {
  win = new BrowserWindow({
    width: 1200,  // Ancho de la ventana
    height: 800, // Altura de la ventana
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    console.log('VITE_DEV_SERVER_URL:', RENDERER_DIST)
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    const appServer = express();
    const port = 8080;

    appServer.use(express.static(RENDERER_DIST));

    appServer.listen(port, () => {
      console.log(`Servidor de producción iniciado en http://localhost:${port}`);
      if (win) {
        win.loadURL(`http://localhost:${port}`);
      }
    });
  }
} 

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('save-file-path', (event, filePath) => {
  if (filePath.includes('.pdf')) {
    fs.writeFileSync('ruta_pdf.txt', filePath);
  } else {
    fs.writeFileSync('ruta_excel.txt', filePath);
  }
  console.log('Ruta guardada:', event);

});

ipcMain.on('read-file', (event, filePath) => {
  const data = fs.readFileSync(filePath);
  event.returnValue= data;
});



ipcMain.on('open-file', (event, filePath) => {
  shell.openPath(filePath)
  .then((error) => {
    if (error) {
      event.returnValue = `Error abriendo archivo: ${error}`;
    } else {
      event.returnValue = 'Archivo abierto';
    }
  });
});

ipcMain.handle('run-python', async (event, scriptName, ...args) => {
  const scriptPath = path.join(__dirname, 'python-scripts', scriptName);
  const requirementsPath = path.join(__dirname, "python-scripts", "requirements.txt");
  const pythonExecutablePath = path.join(process.resourcesPath, 'executables', 'main.exe');
  console.log('Ejecutando script de Python:', scriptPath, args);

  exec(`pip install -r ${requirementsPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('Error al instalar dependencias:', error);
    return;
  }
  if (stderr) {
    console.error('Error en la instalación:', stderr);
    return;
  }
  console.log('Dependencias instaladas correctamente:', stdout);
});
  console.log('Ejecutando script de Python:', event);
  return new Promise((resolve, reject) => {
    execFile(pythonExecutablePath, args, (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        console.error('Error ejecutando script de Python:', error);
        return reject(error);
      }
      if (stderr) {
        console.error('Error en la salida de Python:', stderr);
        return reject(stderr);
      }
      resolve(stdout);
    });
  });
});

app.whenReady().then(createWindow)
