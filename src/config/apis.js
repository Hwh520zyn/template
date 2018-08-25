const { protocol, host } = window.location
const root = `${protocol}//${host}`
// console.log(root)
const mockRoot = 'http://f2e.dxy.net/mock-api/client/'

// 是否开启mock代理，0：不代理；1：代理线上；2：代理测试
const mockProxy = 0

const apiMap = {
  // demo
  // example: submit: ['post', 'submit', '5a002f098eda7f5e17603a10']
  demo: ['get', 'apiPath', '5b026e89ab672884de9dd704'],
  pageList: ['get', '/healthzh/list', '5b178010e1540c84e3377b5f'],
  infoPageList: ['get', '/channellist', '5b178010e1540c84e3377b5f'],
  submitInfo: ['post', '/survey/submit']
}

const apis = {}

for (let api in apiMap) {
  const data = apiMap[api]
  let url = `${root}${data[1]}`
  // console.log(url)
  if (process.env.MOCK_DATA && data[2]) {
    url = `${mockRoot}${data[2]}`
    // console.log(url)
    if (mockProxy) {
      url += `?_mockProxyStatus=${mockProxy}`
    }
  }
  apis[api] = {
    url,
    method: data[0]
  }
}

export default apis
