const Koa = require("koa");
const router = require('koa-route');
const { koaBody } = require('koa-body');
const fs = require('fs');
const path = require('path');
const app = new Koa();

// 内存使用
const memory = require("./lib/memory");
// 内存监控
const easyMonitor = require('easy-monitor');
easyMonitor('mKa');

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));

app.use(router.get('/', ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<form action="http://localhost:3000/uploadfile" method="post" enctype="multipart/form-data"><input type="file" name="file" id="file" value="" multiple="multiple" /><input type="submit" value="提交"/></form><a href="/downloadfile">下载</a>';
}));

app.use(router.post('/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  console.log(file)
  // 创建可读流
  const reader = fs.createReadStream(file.filepath);
  let filePath = path.join(__dirname, 'public/upload/') + `/${file.originalFilename}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = "上传成功！";
}));

app.use(router.post('/downloadfile', async (ctx, next) => {
  let filePath = path.join(__dirname, 'public/upload/') + `/refresh.png`;
  // 创建可读流
  const reader = fs.createReadStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(ctx.response);
  return ctx.body = "上传成功！";
}));



app.listen(3000, () => {
  console.log("Server running on 3000");
  console.log(memory.memory())
});
