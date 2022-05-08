import CryptoJs from 'crypto-js'

export default {
  /**
   * 加密
   */
  encrypt (word) {
    const key = CryptoJs.enc.Utf8.parse('1234567890ABCDEF')
    const srcs = CryptoJs.enc.Utf8.parse(word)
    const encrypted = CryptoJs.AES.encrypt(srcs, key, {
      mode: CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7
    })
    return encrypted.toString()
  },

  // console.log("加密：" + cryptoAES.encrypt(加密的字段))
  // console.log("解密：" +  cryptoAES.decrypt(解密的字段));

  /**
   * 解密
   */
  decrypt (word) {
    const key = CryptoJs.enc.Utf8.parse('1234567890ABCDEF')
    const decrypt = CryptoJs.AES.decrypt(word, key, {
      mode: CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7
    })
    return CryptoJs.enc.Utf8.stringify(decrypt).toString()
  }

}
