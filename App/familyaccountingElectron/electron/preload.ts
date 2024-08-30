import { ipcRenderer, contextBridge } from 'electron'


// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
  saveFilePath: (filePath: string) => ipcRenderer.send('save-file-path', filePath),
  readFile: (filePath: string) => ipcRenderer.sendSync('read-file', filePath),
  openFile: (filePath: string) => ipcRenderer.sendSync('open-file', filePath),
  runPython: (scriptName : string, ...args: any[]) => ipcRenderer.invoke('run-python', scriptName, ...args),

  // You can expose other APTs you need here.
  // ...
})
