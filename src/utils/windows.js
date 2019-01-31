export const openBrowserWindow = url => {
  window.open(url, '_blank', 'nodeIntegration=no');
}

export const addWindowEventListeners = (sendMessage) => {
  const verbose = window.statusVerbose
  window.addEventListener('message', function (msg) {
    if(window.statusVerbose) console.log('message', msg)
    if (msg.source === window.parent && window.statusVerbose) {
      console.log(msg.data)
    }

    if (msg.data && msg.data.type && msg.data.type === 'whisperMsg') {
      sendMessage(msg.data.msg)
    }
  })
}
