import CryptoJS from 'crypto-js'

/** @param {TodoAppData} data @param {string} password */
export function encryptData(data, password) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), password).toString()
}

/** @param {string} token @param {string} password */
export function decryptData(token, password) {
  const bytes = CryptoJS.AES.decrypt(token, password)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
