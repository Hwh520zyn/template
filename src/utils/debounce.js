function debounce (callback, time = 500) {
  /* eslint no-unused-vars:off */
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, arguments)
    }, time)
  }
}

export default debounce
