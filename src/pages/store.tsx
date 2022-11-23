import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
  connectedAccount: '',
  contract: null,
  nfts: [],
});

const truncate = (text: string, startChars: number, endChars: number, maxLength: number) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const setAlert = (msg: string, color = 'green') => {
  setGlobalState('alert', { show: true, msg, color })
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: msg, color });
    setGlobalState('loading', { show: false, msg: msg });
  }, 8000)
}

const setLoadingMsg = (msg: string) => {
  const loading = getGlobalState('loading')
  setGlobalState('loading', { ...loading, msg })
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncate,
  setAlert,
  setLoadingMsg,
}
