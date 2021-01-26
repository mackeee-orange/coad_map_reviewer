const _snakeToCamel = key => {
  let str = `${key}`
  return str.replace(/_([a-z])/gi, (all, letter) => {
    return letter.toUpperCase()
  })
}

const _camelToSnake = key => {
  let str = `${key}`
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export const transformCamelToSnake = obj => {
  if (typeof obj != 'object') {
    return obj
  }

  for (let oldName in obj) {
    if (obj.hasOwnProperty(oldName)) {
      let newName = _camelToSnake(oldName)
      if (newName !== oldName) {
        obj[newName] = obj[oldName]
        delete obj[oldName]
      }

      if (typeof obj[newName] == 'object') {
        obj[newName] = transformCamelToSnake(obj[newName])
      }
    }
  }
  return obj
}

export const transformSnakeToCamel = obj => {
  if (typeof obj != 'object') {
    return obj
  }

  for (let oldName in obj) {
    if (obj.hasOwnProperty(oldName)) {
      let newName = _snakeToCamel(oldName)
      if (newName !== oldName) {
        obj[newName] = obj[oldName]
        delete obj[oldName]
      }

      if (typeof obj[newName] == 'object') {
        obj[newName] = transformSnakeToCamel(obj[newName])
      }
    }
  }
  return obj
}
