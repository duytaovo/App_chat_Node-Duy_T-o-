define(['var/emojione', 'var/invisibleChar', 'function/unicodeTo'], function (
  emojione,
  invisibleChar,
  unicodeTo
) {
  return function (str, self) {
    str = str
      .replace(/&#10;/g, '\n')
      .replace(/&#09;/g, '\t')
      .replace(/<img[^>]*alt="([^"]+)"[^>]*>/gi, '$1')
      .replace(/\n|\r/g, '')
      .replace(/<br[^>]*>/gi, '\n')
      .replace(/(?:<(?:div|p|ol|ul|li|pre|code|object)[^>]*>)+/gi, '<div>')
      .replace(/(?:<\/(?:div|p|ol|ul|li|pre|code|object)>)+/gi, '</div>')
      .replace(/\n<div><\/div>/gi, '\n')
      .replace(/<div><\/div>\n/gi, '\n')
      .replace(/(?:<div>)+<\/div>/gi, '\n')
      .replace(/([^\n])<\/div><div>/gi, '$1\n')
      .replace(/(?:<\/div>)+/gi, '</div>')
      .replace(/([^\n])<\/div>([^\n])/gi, '$1\n$2')
      .replace(/<\/div>/gi, '')
      .replace(/([^\n])<div>/gi, '$1\n')
      .replace(/\n<div>/gi, '\n')
      .replace(/<div>\n/gi, '\n\n')
      .replace(/<(?:[^>]+)?>/g, '')
      .replace(new RegExp(invisibleChar, 'g'), '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x60;/g, '`')
      .replace(/&#60;/g, '<')
      .replace(/&#62;/g, '>')
      .replace(/&amp;/g, '&')

    switch (self.saveEmojisAs) {
      case 'image':
        str = unicodeTo(str, self.emojiTemplate)
        break
      case 'shortname':
        str = emojione.toShort(str)
    }
    return str
  }
})
