export const range = (begin, end, step) => {
  return step === 0
    ? []
    : Math.sign(end - begin) !== Math.sign(step)
    ? []
    : [...Array(Math.ceil((end - begin) / step)).keys()].map(e =>
        fixedToMaxDigit(begin, step)(begin + e * step)
      )
}

const toFixedToN = digit => n => Number.parseFloat(n.toFixed(digit))
const getDigit = n => {
  const a = n.toString()
  return !a.includes('.') ? 0 : a.length - a.indexOf('.') - 1
}
const maxDigit = (...params) => Math.max(...params.map(getDigit))
const fixedToMaxDigit = (...params) => toFixedToN(maxDigit(...params))
