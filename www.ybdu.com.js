module.exports = load => {
  const join = load('url-join')
  return {
    filename: "www.ybdu.com.js",
    regexp: /www\.ybdu\.com/gi,
    opts: {
      charset: 'gbk'
    },
    chapter($, url) {
      const datas = []
      $('.mulu_list li').each(function(i, ele) {
        const self = $(this)
        const title = self.text().replace(/\s/g, '')
        const chapter_url = self.find('a').attr('href')
        datas.push({
          title,
          url: join(url, chapter_url)
        })
      })
      return datas
    },
    text($) {
      const trim = sourceString => {
        const dels = [
          '加入书签',
          '加入书架',
          '推荐投票',
          '返回书页',
          '上一页',
          '返回目录',
          '下一页',
          /\s+/gi,
          /(\－)*/gi
        ]
        dels.forEach(delString => {
          // 纯函数
          sourceString = sourceString.replace(delString, '')
        })
        return sourceString
      }
      const sourceString = $('#htmlContent').text()
      return trim(sourceString)
    }
  }
}
