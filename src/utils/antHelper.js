/**
 * Antd のヘルパー
 * **/

export const addKeyForDataSource = list => {
  return list.map((item, idx) => {
    item['key'] = idx
    return item
  })
}
