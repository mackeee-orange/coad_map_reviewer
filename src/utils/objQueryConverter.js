export const generateQueryFromJson = json => {
  let jsonObj = null,
    output = ''
  try {
    jsonObj = JSON.parse(JSON.stringify(json))
    output = _generateQueryFromObj(jsonObj)
  } catch (e) {
    return e.message
  }
  return output
}

const _generateQueryFromObj = (obj, key = '') => {
  let type = Object.prototype.toString.call(obj).slice(8, -1)
  switch (type) {
    case 'Array':
      return obj
        .map((item, index, that) => {
          return _generateQueryFromObj(item, key + '[' + index + ']')
        })
        .join('&')
    case 'Object':
      return Object.keys(obj)
        .map((item, index, that) => {
          return _generateQueryFromObj(
            obj[item],
            key === '' ? encodeURIComponent(item) : key + '[' + encodeURIComponent(item) + ']'
          )
        })
        .join('&')
    default:
      return key + '=' + encodeURIComponent(obj)
  }
}
