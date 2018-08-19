import List from '@/components/list/list'
import InfiniteLoad from '@/components/infinite-load/index'

/**
 * @constructor PullList
 */
class PullList {
  /**
   * constructor
   * @param {object} option
   * @param {object} option.listConfig - List 组件的配置项
   * @param {api～callback} option.api - 请求的函数
   * @param {object} option.params - 请求要添加的额外参数
   * @param {function} option.onInit - 初始化之前触发
   * @param {onPageChange～callback} option.onPageChange - 点击分页触发
   * @param {onLoading～callback} option.onLoading - loading
   * @param {onSuccess～callback} option.onSuccess - 请求成功触发
   * @param {onError～callback} option.onError - 请求错误触发
   * @param {onStop～callback} option.onStop - 下拉到最下面触发
   * @param {number} [option.debounceTime=500] - 点击分页按钮的 debounce 延时(毫秒)
   *
   * @callback api～callback
   * @description 请求的 api 函数
   * @returns {promise} 需要返回一个 promise
   *
   * @callback onPageChange～callback
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
    pullConfig,
    api = () => (new Promise((resolve) => resolve({}))),
    params = {},
    onInit = () => { },
    onPageChange = () => { },
    onLoading = () => { },
    onSuccess = (res) => res,
    onError = () => { },
    onStop = () => { }
  }) {
    Object.assign(this, {
      listConfig,
      pullConfig,
      onInit,
      onPageChange,
      onLoading,
      api,
      params,
      onSuccess,
      onError,
      onStop
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
      this.pageHandler(1, 0, true)
    } catch (err) {
      console.error('pull list 错误', err)
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
    this.Page = new InfiniteLoad({ ...this.pullConfig, onChange: this.pageHandler.bind(this) })
  }
  /**
   * 点击分页时的操作函数
   * @param {number} page - 当前页数
   * @param {number} old - 上一次的页数
   * @param {boolean} isInit - 是否初始化的发起（也就是第一次发起）
   */
  async pageHandler (page, old, isInit = false) {
    this.onLoading(true)
    try {
      let res = await this.api({ page, ...this.params })
      if (!res || !res.success) throw Error(res)
      res = this.onSuccess(res) || res
      this.pageChangeToDo(page, res)
      this.onPageChange(page, old)
    } catch (err) {
      console.error('page list 请求出错', err)
      this.onError(err)
    } finally {
      this.onLoading(false)
      // 不管成功还是失败，如果是第一次，无限下拉组件就要判断是否需要重复判断
      if (isInit) {
        this.Page.scrollToDo(isInit)
      }
    }
  }
  /**
   * 当 page 更改时触发
   * @param {number} page - 选择的页数
   * @param {object} res - 返回的数据
   */
  pageChangeToDo (page, res) {
    let { items = [], pageBean = {} } = res.results
    this.Page.errorTimes = 0
    this.Page.page = page
    this.List.list = this.List.list.concat(items)
    if (this.isStop(page, pageBean)) {
      this.Page.stop = true
      this.onStop()
    }
  }
  /**
   * 判断是否最后一页
   * @param {number} page - 当前页数
   * @param {object} pageBean - pageBean 参数
   */
  isStop (page, pageBean) {
    let { pageSize, totalCount } = pageBean
    return totalCount <= page * pageSize
  }
}

export default PullList
