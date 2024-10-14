import express from 'express'
import path from 'path'

const router = express.Router()

router.get('/router/get', (req, res) => {
  res.send('GET router request')
})

router.post('/router/post', (req, res) => {
  res.send('POST router request')
})

// 设置 Response header
router.get('/response/set/header', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.set('token', '123456')
  res.send('<h1>hello express</h1>')
})

// res.xxx(json,send,download)设置响应数据
router.get('/response/download', (req, res) => {
  // 指定文件路径
  res.download(path.resolve('./package.json'))
})

export default router
