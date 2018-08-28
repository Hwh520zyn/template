import '@/css/public.less'
import '@/css/interdetail.less'
import isMobile from '@/utils/isMobile'
import $ from 'jquery'
$(document).on('click', function (e) {
  if (!isMobile) {
    e.preventDefault()
  }
})

