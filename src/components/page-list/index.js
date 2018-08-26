import List from '@/components/list/list'
import Pagination from '@dxy/pure-components/dist/pagination'
import debounce from '@/utils/debounce'

/**
 * @constructor PageList
 */
class PageList {
  /**
   * constructor
   * @param {object} option
   * @param {object} option.listConfig - List 组件的配置项
   * @param {object} option.pageConfig - Pagination 组件的配置项
   * @param {api～callback} option.api - 请求的函数
   * @param {object} option.params - 请求要添加的额外参数
   * @param {function} option.onInit - 初始化之前触发
   * @param {onPageClick～callback} option.onPageClick - 点击分页触发
   * @param {onLoading～callback} option.onLoading - loading
   * @param {onSuccess～callback} option.onSuccess - 请求成功触发
   * @param {onError～callback} option.onError - 请求错误触发
   * @param {number} [option.debounceTime=500] - 点击分页按钮的 debounce 延时(毫秒)
   *
   * @callback api～callback
   * @description 请求的 api 函数
   * @returns {promise} 需要返回一个 promise
   *
   * @callback onPageClick～callback
   * @description 点击分页时触发
   * @param {number} page - 当前点击的页数
   * @param {number} old - 上一次点击的页数
   *
   * @callback onLoading～callback
   * @description loading 时触发
   * @param {boolean} loading - 加载开始/加载结束
   *
   * @callback onSuccess～callback
   * @description 发送请求之后成功调用
   * @param {any} res - 返回的数据
   * @returns {any} 应返回一个新的数据，返回的新数据会覆盖原来的数据，若不返回则使用原来的数据
   *
   * @callback onError～callback
   * @description 发送请求之后错误调用
   * @param {error} err - 错误对象
   */
  constructor ({
    listConfig,
    pageConfig,
    api = () => (new Promise((resolve) => resolve({}))),
    params = {},
    onInit = () => { },
    onPageClick = () => { },
    onLoading = () => { },
    onSuccess = (res) => res,
    onError = () => { },
    debounceTime = 500
  }) {
    Object.assign(this, {
      listConfig,
      pageConfig,
      onInit,
      onPageClick,
      onLoading,
      api,
      params,
      onSuccess,
      onError,
      debounceTime
    })
    this.init()
  }
  /**
   * 初始化
   */
  init () {
    try {
      this.initList()
      this.initPage()
      this.onInit()
      this.pageHandler(1, 0)
    } catch (err) {
      console.error('page list 错误', err)
    }
  }
  /**
   * 初始化 List
   */
  initList () {
    this.List = new List(this.listConfig)
  }
  /**
   * 初始化 Page
   */
  initPage () {
    this.Page = new Pagination({ ...this.pageConfig, clickPageHandler: debounce(this.pageHandler, this.debounceTime).bind(this) })
  }
  /**
   * 点击分页时的操作函数
   * @param {number} page - 当前页数
   * @param {number} old - 上一次的页数
   */
  async pageHandler (page, old) {
    this.onLoading(true)
    try {
      let url = location.search
      var idbox = {}
      if (url === '?news') {
        idbox = {id: 43}
      } else if (url === '?character') {
        idbox = {id: 39631}
      } else if (url === '?hotspot') {
        idbox = {id: 8928}
      } else if (url === '?relation') {
        idbox = {id: 7972}
      } else if (url === '?manage') {
        idbox = {id: 444}
      } else if (url === '?scholarship') {
        idbox = {id: 3380}
      }
      let res = await this.api({page, ...this.params, ...idbox})
      if (!res || !res.success) throw Error(res)
      res = this.onSuccess(res) || res
      this.pageChangeToDo(page, res)
      this.onPageClick(page, old)
    } catch (err) {
      console.error('page list 请求出错', err)
      this.onError(err)
    } finally {
      this.onLoading(false)
    }
  }
  /**
   * 当 page 更改时触发
   * @param {number} page - 选择的页数
   * @param {object} res - 返回的数据
   */
  pageChangeToDo (page, res) {
    let { items = [], pageBean = {} } = res.results
    this.Page.update({
      cur: page,
      limit: pageBean.pageSize,
      total: pageBean.totalCount
    })
    this.List.list = items
  }
}

export default PageList
