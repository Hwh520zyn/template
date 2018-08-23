export const lotteryBoxTpl = ({
  luckTime = 0,
  prizeImgs = [],
  maskMsg = ''
}) => `
<div>今日还有 <span class="J_lottery-count">${luckTime}</span> 次抽奖机会</div>
<div class="hbd-lottery J_lottery-box">
    <i class="hbd-lottery_dot"></i>
    <div class="lottery-prize_items">
        <div class="lottery-prize_item lottery-prize_item_1">
            <img src="${prizeImgs[0]}" alt="">
        </div>
        <div class="lottery-prize_item lottery-prize_item_2">
            <img src="${prizeImgs[1]}" alt="">
        </div>
        <div class="lottery-prize_item lottery-prize_item_3">
            <img src="${prizeImgs[2]}" alt="">
        </div>
        <div class="lottery-prize_item lottery-prize_item_8">
            <img src="${prizeImgs[7]}" alt="">
        </div>
        <div class="lottery-start J_lottery-start ">GO!
        </div>
        <div class="lottery-prize_item lottery-prize_item_4">
            <img src="${prizeImgs[3]}" alt="">
        </div>
        <div class="lottery-prize_item lottery-prize_item_7">
            <img src="${prizeImgs[7]}" alt="">
        </div>
        <div class="lottery-prize_item lottery-prize_item_6">
            <img src="${prizeImgs[5]}" alt="">
        </div>
        <div class="lottery-prize_item lottery-prize_item_5">
            <img src="${prizeImgs[4]}" alt="">
        </div>
    </div>
  
    <div class="lottery-mask J_lottery-mask">
        <div>
            <p class="lottery-msg">${maskMsg}</p>
            <div class="lottery-mask_close J_lottery-mask_close">关闭</div>
        </div>
    </div>
    
    
    <i class="hbd-lottery_dot"></i>
</div>
`
