export default function mountMethodDemo(app) {
  app.get('/method/get', (req, res) => {
    res.send('GET request')
  })
  app.post('/method/post', (req, res) => {
    res.send('POST request')
  })
  app.put('/method/put', (req, res) => {
    res.send('PUT request')
  })
  app.delete('/method/delete', (req, res) => {
    res.send('DELETE request')
  })
  // Express 使用 path-to-regexp 来匹配路由路径，
  // 路由路径可以是 字符串、字符串模式 或 正则表达式。
  // 匹配路径中含有 world 的路径
  app.get(/world/, (req, res) => {
    res.send('hello hello')
  })

  // app.route() 可以用来创建链式路由，可以避免重复的路由名称。
  app
  .route('/route/any')
  .all((req, res, next) => {
    console.log('pre all', req.method, req.path)
    next()
  })
  .get((req, res) => {
    console.log('get request')
    res.send('get request')
  })
  .post((req, res) => {
    console.log('post request')
    res.send('post request')
  })

}
