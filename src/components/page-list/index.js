import List from '@/components/list/list'
import pagination from '@dxy/pure-components/dist/pagination'
import debounce from '@/utils/debounce'
import $ from 'jquery'
import initpagination from '@/utils/jqpaginator.min'
import '@/css/pagination.less'

// console.log({$})
initpagination(window, $)
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
  async init () {
    try {
      await this.initList()
      // this.initPage()
      this.onInit()
      // this.pageHandler(1, 0)
    } catch (err) {
      console.error('page list 错误', err)
    }
  }
  /**
   * 初始化 List
   */
  async initList () {
    let config = {
      'news': {id: 43},
      'character': {id: 39631},
      'hotspot': {id: 8928},
      'relation': {id: 7972},
      'manage': {id: 444},
      'scholarship': {id: 3380}
    }
    let url = location.search.slice(1)
    let idbox = config[url]
    let res = await this.api({page: 1, ...this.params, ...idbox})
    if (!res || !res.success) throw Error(res)

    let { items = [], pageBean = {} } = res.results
    this.List = new List(this.listConfig)
    this.List.list = items
    Object.assign(this.pageConfig, pageBean)
    console.log({pageBean})
    console.log('pageConfig!', this.pageConfig)


    this.initPage()
  }
  /**
   * 初始化 Page
   */
  initPage () {

    // this.Page = new pagination({ ...this.pageConfig, clickPageHandler: debounce(this.pageHandler, this.debounceTime).bind(this) })
    const {
      ele,
      pageNo,
      totalCount,
      pageSize
    } = this.pageConfig
    console.log('pageConfig')

    let source = [...(new Array(totalCount)).keys()]
    $(ele).pagination({
      dataSource: source,
      pageSize,
      showGoInput: true,
      showGoButton: true,
      nextText: '下一页',
      prevText: '上一页',
      goButtonText: '确定',
      formatNavigator: '<span>共<%=totalPage%>页</span>',
      afterPaging: debounce(this.pageHandler, this.debounceTime).bind(this),
      callback: function(data, pagination) {
        // template method of yourself
        // var html = template(data);
        // dataContainer.html(html);
      }
    });
  }
  /**
   * 点击分页时的操作函数
   * @param {number} page - 当前页数
   * @param {number} old - 上一次的页数
   */
  async pageHandler (page) {
    console.log({page})
    this.onLoading(true)
    try {
      let config = {
        'news': {id: 43},
        'character': {id: 39631},
        'hotspot': {id: 8928},
        'relation': {id: 7972},
        'manage': {id: 444},
        'scholarship': {id: 3380}
      }
      let url = location.search.slice(1)
      let idbox = config[url]
      let res = await this.api({page, ...this.params, ...idbox})
      if (!res || !res.success) throw Error(res)
      res = this.onSuccess(res) || res
      this.pageChangeToDo(page, res)
      // this.onPageClick(page, old)
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
    // this.Page.update({
    //   cur: page,
    //   limit: pageBean.pageSize,
    //   total: pageBean.totalCount
    // })
    this.List.list = items
  }
}

export default PageList
