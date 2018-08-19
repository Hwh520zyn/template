import './index.less'
import {
  lotteryBoxTpl
} from './tpl'

/**
 * 抽奖模块
 */
class Lottery {
  constructor ({
    el, // 必填
    getPrizeApi, // 必填 获取奖品信息 api
    takePrizeApi, // 必填 抽奖 api
    checkPrizeApi, // 必填 轮询抽奖结果 api
    getPrize = () => {}, // 获取奖品信息
    beforLottery = () => true, // 抽奖前，如果返回 false , 则不能开始抽奖
    afterLottery = () => {}, // 抽奖结束，提供抽奖结果信息
    clearActive = true, // 抽奖结束后是否需要保留当前中奖位置状态
    delayTime = 2000, // 延时得到抽奖结果
    animateTime = 200, // 抽奖动画频率
    closeable = false // 是否可关闭遮罩
  }) {
    Object.assign(this, {
      getPrizeApi,
      getPrize,
      takePrizeApi,
      checkPrizeApi,
      beforLottery,
      afterLottery,
      clearActive,
      delayTime,
      animateTime,
      closeable
    })
    this.$el = document.querySelector(el)
    this.$lotteryStartEl = null
    this.$prizeItemsEl = null
    this.$prizeCount = null
    this._luckyTimes = 0
    this._maskVisible = false
    this.timer = null
    this.lotteryPrizeIndex = 0 // 奖品位置信息
    this.prizeConfig = null
    this.init()
  }

  /**
   * 初始化模板及数据
   */
  async init () {
    if (this.checkParam()) {
      await this.getPrizeConfig()
      this.renderLotteryBox()
      this.$prizeItemsEl = this.$el.querySelectorAll('.lottery-prize_item')
      this.$maskCloseBtnEl = this.$el.querySelector('.J_lottery-mask_close')
      this.initMask()
      this.initStartEvent()
    }
  }
  /**
   * 检查用户传入的参数是否符合规范
   */
  checkParam () {
    if (!(this.$el && !!this.getPrizeApi && !!this.takePrizeApi && !!this.checkPrizeApi)) {
      console.log('缺少必要参数')
      return false
    }
    return true
  }
  /**
   * 获取奖品信息
   */
  async getPrizeConfig () {
    let prizeInfo = await this.getPrizeApi()
    if (prizeInfo.success) {
      this.prizeConfig = prizeInfo.results
      this.getPrize(prizeInfo.results)
    }
  }
  /**
   * 渲染抽奖盘
   */
  renderLotteryBox () {
    let config = {
      luckTime: this.prizeConfig.lucky_times || 0,
      prizeImgs: [],
      maskMsg: this.prizeConfig.message
    }
    for (let prize of this.prizeConfig.prize_config) {
      config.prizeImgs.push(prize.image)
    }

    this.$el.innerHTML = lotteryBoxTpl(config)
    this.$lotteryStartEl = this.$el.querySelector('.J_lottery-start')
    this.$prizeCount = this.$el.querySelector('.J_lottery-count')
    this.luckyTimes = this.prizeConfig.lucky_times
  }
  /**
   * 初始化遮罩层
   */
  initMask () {
    this.maskVisible = !!this.prizeConfig.message
    if (this.closeable) {
      this.$maskCloseBtnEl.onclick = event => {
        this.maskVisible = false
      }
    } else {
      this.$maskCloseBtnEl.style.display = 'none'
    }
  }
  /**
   * 抽奖按钮事件绑定
   */
  initStartEvent () {
    this.$lotteryStartEl.onclick = event => {
      if (!this.$lotteryStartEl.classList.contains('disabled') && this.beforLottery()) {
        this.setStartBtnStatus(true)
        this.startPrizeAnimate()
        this.takePrizeApi().then(res => {
          if (res.results.key) {
            // 还未得到抽奖结果，需要轮询
            this.getPrizeResult(res.results.key)
          } else {
            // 得到结果，转到指定位置再提醒用户
            this.goTargetPrize(res).then(() => {
              this.luckyTimes = res.results.lucky_times || 0
            })
          }
        })
      }
    }
  }
  /**
   * 设置剩余抽奖次数
   */
  set luckyTimes (val) {
    this._luckyTimes = val
    this.setStartBtnStatus(!this._luckyTimes)
    this.$prizeCount.innerHTML = this._luckyTimes || 0
  }
  /**
   * 控制遮罩显隐
   */
  set maskVisible (val) {
    this._maskVisible = val
    this.$el.querySelector('.J_lottery-mask').style.display = val ? 'flex' : 'none'
    this.setStartBtnStatus(val)
  }

  /**
   * 控制抽奖按钮的可点击性
   * @param {Boolean} status 为 true 时，禁止抽奖按钮被点击
   */
  setStartBtnStatus (status) {
    if (status || !this.beforLottery()) {
      this.$lotteryStartEl.classList.add('disabled')
    } else if (this._luckyTimes) {
      this.$lotteryStartEl.classList.remove('disabled')
    }
  }

  /**
   * 轮询获奖结果
   * @param {String} key 轮询接口时需要携带的参数
   */
  getPrizeResult (key) {
    setTimeout(() => {
      this.checkPrizeApi({
        key
      }).then(res => {
        if (res.results.polling_again) {
          // 没有结果，继续轮询
          this.getPrizeResult(key)
        } else {
          this.goTargetPrize(res).then(() => {
            this.luckyTimes = res.results.lucky_times || 0
          })
        }
      })
    }, 1000)
  }

  /**
   * 抽奖结束后，至少转 2s 再转到指定奖品块处，然后停止动画
   * @param {Object} res 接口返回的抽奖结果
   */
  async goTargetPrize (res) {
    await new Promise((resolve) => {
      let prizeIndex = parseInt(res.results.order) || 1
      setTimeout(() => {
        this.stopPrizeAnimate(prizeIndex).then(() => {
          this.afterLottery(res)
          resolve()
        })
      }, this.delayTime)
    })
  }

  /*
   * 开启抽奖动画
   */
  startPrizeAnimate () {
    this.lotteryPrizeIndex = 0
    this.timer = setInterval(() => {
      this.lotteryPrizeIndex = this.lotteryPrizeIndex === 8 ? 1 : this.lotteryPrizeIndex + 1
      this.addPrizeMask()
      this.$el.querySelector(`.lottery-prize_item_${this.lotteryPrizeIndex}`).classList.remove('mask')
    }, this.animateTime)
    return this.timer
  }
  /**
   * 添加所有奖品的遮罩状态
   */
  addPrizeMask () {
    for (let i = 0, l = this.$prizeItemsEl.length; i < l; i++) {
      this.$prizeItemsEl[i].classList.add('mask')
    }
  }
  /**
   * 清除所有奖品的遮罩状态
   */
  clearPrizeActive () {
    for (let i = 0, l = this.$prizeItemsEl.length; i < l; i++) {
      this.$prizeItemsEl[i].classList.remove('mask')
    }
  }
  /**
   * 关闭抽奖动画
   */
  stopPrizeAnimate (index) {
    return new Promise((resolve, reject) => {
      try {
        if (index) {
          let stopTimer = null
          stopTimer = setInterval(() => {
            if (index === (this.lotteryPrizeIndex)) {
              clearInterval(stopTimer)
              clearInterval(this.timer)
              if (this.clearActive) {
                this.clearPrizeActive()
              }
              resolve()
            }
          }, 100)
        } else {
          clearInterval(this.timer)
          this.clearPrizeActive()
          resolve()
        }
      } catch (e) {
        reject(e)
      }
    })
  }

}

export default Lottery
