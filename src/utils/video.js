import qs from 'qs'
/**
 * 视频播放用法
 * <div id=""
 *      class="videoWrap"
 *      data-source-video="http://assets.dxycdn.com/app/cms/js/video/qcloud.js?file_id=7447398155054693399&app_id=1252348435"
 * >
 * </div>
 */

/**
 * @constructor HbdVideo
 * @param {Object} videoConfig - 视频初始化配置项，控制尺寸大小
 *
 * @api - returnVideoList
 * @description 返回videoList
 */
export default class HbdVideo {
  constructor ({
    videoConfig = {
      auto_play: '0',
      file_id: '',
      app_id: '',
      width: null,
      height: null,
      https: 1
    }
  }) {
    Object.assign(this, {
      videoConfig,
      myVideos: []
    })

    this.init()
  }

  /**
   * @description 初始化
   */
  init () {
    let _class = 'videoWrap'
    let el = document.getElementsByClassName(_class)
    if (el === null) {
      return
    }

    for (let i = 0; i < el.length; i++) {
      let videoUrl = el[i].getAttribute('data-source-video')
      let _id = el[i].getAttribute('id')

      if (!videoUrl) {
        return
      }

      let { app_id, file_id } = this.getUrlParams(videoUrl)

      this.videoConfig.app_id = app_id
      this.videoConfig.file_id = file_id

      // 初始化 _Video
      let _Video = new window
        .qcVideo
        .Player(
          _id,
          this.videoConfig
        )

      this.myVideos.push(_Video)
    }
  }

  /**
   * @description 默认取当前url，也可以传其他url
   * @param {string} string
  */
  getUrlParams (string = '') {
    let paramString = string || window.location.href
    let reg = /\?(.+)/
    let result = paramString.match(reg)
    return result
      ? qs.parse(result[1])
      : ''
  }

  /**
   * @description 暴露api 返回videoList
   */
  returnVideoList () {
    return this.myVideos
  }
}
