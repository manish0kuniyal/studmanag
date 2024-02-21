const express= require('express')
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
  res.send('okok')
})

app.post('/run',(req,res)=>{
  res.json(req.body)
})

app.listen(4000,()=>{
  console.log('mio')
})