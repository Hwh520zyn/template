const { protocol, host } = window.location
const root = `${protocol}//${host}/client/`

const mockRoot = 'http://f2e.dxy.net/mock-api/client/'

// 是否开启mock代理，0：不代理；1：代理线上；2：代理测试
const mockProxy = 0

const apiMap = {
  // demo
  // example: submit: ['post', 'submit', '5a002f098eda7f5e17603a10']
  demo: ['get', 'apiPath', '5b026e89ab672884de9dd704'],
  pageList: ['get', '', '5b178010e1540c84e3377b5f']
}

const apis = {}

for (let api in apiMap) {
  const data = apiMap[api]
  let url = `${root}${data[1]}`
  if (process.env.MOCK_DATA && data[2]) {
    url = `${mockRoot}${data[2]}`
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
