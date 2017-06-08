import { AsyncStorage } from 'react-native'
import _ from 'lodash'
const encoding = require('NativeModules').Encoding

const authKey = 'auth'
const userKey = 'user'

class AuthService {
  getAuthInfo (cb) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if (err) {
        console.log('AsyncStorage error: ', err)
        return cb(err)
      }
      if (!val) {
        console.log('AsyncStorage no val: ', val)
        return cb()
      }

      const zippedObj = _.fromPairs(val)
      if (!zippedObj[authKey]) {
        console.log('AsyncStorage no authKey ', zippedObj)
        return cb ()
      }

      const authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }
      return cb (null, authInfo)
    })
  }

  login (creds, cb) {
    const authStr = creds.username + ':' + creds.password

    encoding.base64Encode(authStr, (encodedAuth) => {
      fetch('https://api.github.com/user', {
        headers: {
          'Authorization' : 'Basic ' + encodedAuth
        }
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response
        }
        throw {
          badCredentials: response.status === 401,
          unknownError: response.status !== 401
        }
      })
      .then((response) => {
        return response.json()
      })
      .then((results) => {
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(results)]
        ], (err) => {
          if(err) {
            throw err
          }
          return cb({success: true})
        })
      })
      .catch((err) => {
        return cb(err)
      })
    })

  } // end login method

} // end AuthService module

module.exports = new AuthService()
