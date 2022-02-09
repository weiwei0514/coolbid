var NodeRSA = require('node-rsa')
var fs = require('fs')

// const msg = '12345'
const cryptoMsg = 'rtRVsT70wdqRMa1eSKJNqwJ6KYZ5MFiIcuEeTVl9qeNsyrozwr3hn0Me5kE/HFqc/MpFOv9IUhU3Jz3j0JdV5Q=='

// Generate Key Pair
function generator() {
var key = new NodeRSA({ b: 512 })
key.setOptions({ encryptionScheme: 'pkcs1' })

var privatePem = key.exportKey('pkcs1-private-pem')
var publicPem = key.exportKey('pkcs1-public-pem')

fs.writeFile('./pem/public.pem', publicPem, (err) => {
if (err) throw err
console.log('Public Key Saved')
})
fs.writeFile('./pem/private.pem', privatePem, (err) => {
if (err) throw err
console.log('Private Key Saved')
})
}

// Encrypt
function encrypt(msg) {
fs.readFile('./pem/private.pem', function (err, data) {
var key = new NodeRSA(data)
let cipherText = key.encryptPrivate(msg, 'base64')
console.log(cipherText)
})
}

// Decrypt
function decrypt() {
fs.readFile('./pem/public.pem', function (err, data) {
var key = new NodeRSA(data)
let rawText = key.decryptPublic(cryptoMsg, 'utf8')
console.log(rawText)
})
}

generator()
encrypt('12345')
decrypt()

////////////////////////////////////////////////////////

const crypto = require('crypto')
const chalk = require('chalk')

const priPassword = 'CoolBidRSA'
const message = '12345'
play2RSA(message, priPassword)

async function play2RSA(message, priPassword) {
  const keyPair = await makeKeyPair(priPassword)
  console.log(chalk.bgBlue.bold(`PublicKey: ${keyPair.publicKey}`))
  console.log(chalk.bgGreen.bold(`PrivateKey: ${keyPair.privateKey}`))
  const crypted = encrypt(message, keyPair.publicKey)
  console.log(
    chalk.bgCyan.bold(`Encrypt Result: ${crypted.toString('base64')}`)
  )
  try {
    const decrypted = decrypt(crypted, keyPair.privateKey, priPassword)
    console.log(chalk.bgRed.bold(`Decrypt Result: ${decrypted.toString()}`))
  } catch (error) {
    console.log(chalk.bgWhite.bold('Decrypt Failed'))
  }
}

// Encrypt
function encrypt(data, key) {
  return crypto.publicEncrypt(key, Buffer.from(data))
}

// Decrypt
function decrypt(encrypted, key, priPassword) {
  const keyObj = {
    key: key,
    passphrase: priPassword
  }
  return crypto.privateDecrypt(keyObj, encrypted)
}

// Create KeyPair and encrypt PrivateKey again
function makeKeyPair(priPassword) {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: priPassword
        }
      },
      (err, publicKey, privateKey) => {
        const keyPair = {
          publicKey: publicKey,
          privateKey: privateKey
        }
        err !== null ? reject(err) : resolve(keyPair)
      }
    )
  })
}
