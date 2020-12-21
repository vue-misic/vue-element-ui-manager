
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const reg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}
