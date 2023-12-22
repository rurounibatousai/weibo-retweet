let repostIndex = 0;

// 先滚动到第一条微博的位置 获取要滚动到的 DOM 元素
const targetElement = document.querySelector('div.wbpro-scroller-item');
if (targetElement) {
  // 获取目标元素相对于视口的位置信息
  const boundingBox = targetElement.getBoundingClientRect();
  
  // 计算滚动的目标位置（这里假设你想要滚动到目标元素的下方）
  const scrollTarget = boundingBox.top - 44 - 57
  
  // 使用 scrollTo 方法垂直滚动到目标位置
  window.scrollTo({
    top: scrollTarget,
    behavior: 'smooth',
  });
}

const auto = () => {
  // 找到具有 data-index 的 dom
  const container = document.querySelectorAll('[data-index]');
  // 执行转发 function
  const repost = () => {
    // 匹配跟当前要转发的 data-index dom
    const currentRepostDom = Array.from(container).find((item: Element) => item.getAttribute('data-index') == `${repostIndex}`);
    if (currentRepostDom) {
      // 点击转发图标
      const openRepostCollections = currentRepostDom.querySelectorAll('.woo-font.woo-font--retweet.toolbar_retweetIcon_3_EwF');
      const openRepostEl = openRepostCollections[openRepostCollections.length - 1] as HTMLElement | undefined;

      if (openRepostEl) {
        openRepostEl.click();
      }

      // 延迟点击转发 这个时候会出现转发按钮
      setTimeout(() => {
        const repostTrigger = currentRepostDom.querySelectorAll('.woo-box-flex.woo-box-alignCenter.woo-pop-item-main')[1] as HTMLElement | undefined;

        if (repostTrigger) {
          repostTrigger.click();

          // 在点击转发按钮之前需要携带超话tag
          setTimeout(() => {
            // 此时textarea是activeElement 所以直接获取
            const textarea = document.querySelector('textarea.Form_input_3JT2Q') as unknown as HTMLTextAreaElement;
            if (textarea) {
              // 设置新的文本内容
              let newText = "#林俊杰[超话]# " + textarea.value;
              textarea.value = newText;

              // 创建并触发input事件，使用CustomEvent的detail参数传递数据
              let inputEvent = new CustomEvent('input', { detail: { newText: newText } });
              textarea.dispatchEvent(inputEvent);

              // 延迟点击转发按钮
              setTimeout(() => {
                const repostBtn = currentRepostDom.querySelector('.disabled.woo-button-main.woo-button-flat.woo-button-primary.woo-button-m.woo-button-round') as HTMLElement | null;

                if (repostBtn) {
                  repostBtn.click();

                  // 点击转发 icon 关闭评论区
                  setTimeout(() => {
                    if (openRepostEl) {
                      openRepostEl.click();

                      // 关闭评论区之后 等待 5s 再滚动
                      setTimeout(() => {
                        const newScrollPosition = (currentRepostDom as HTMLElement).offsetHeight;
                        // 滚动页面，滚动高度为当前转发元素的高度加上 100px
                        window.scrollBy(0, newScrollPosition);
                        repostIndex += 1;
                      }, 5000);
                    }
                  }, 2000);
                }
              }, 3000);
            }
          }, 2000)

        }
      }, 1000);
    } else {
      // 如果 currentRepostDom 不存在
      const nextRepostDom = Array.from(container).find((item: Element) => {
        const dataIndex = parseInt(item.getAttribute('data-index') || '0', 10);
        return dataIndex > repostIndex;
      });

      if (nextRepostDom) {
        // 获取下一个 data-index
        const nextRepostIndex = parseInt(nextRepostDom.getAttribute('data-index') || '0', 10);

        // 将下一个 data-index 赋给 repostIndex
        repostIndex = nextRepostIndex;

        // 重新运行 repost
        repost();
      } else {
        console.error('未找到匹配的下一个元素');
        // 可以在这里添加处理没有找到匹配元素的逻辑
      }
    }
  };

  repost();
};

// 设置动态的时间间隔，1-2 分钟的随机时间
setInterval(() => {
  auto();
  // 输出当前的 repostIndex
  console.log('Current repostIndex:', repostIndex);
}, Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000);
