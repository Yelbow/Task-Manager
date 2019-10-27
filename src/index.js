const express = require('express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    filteFilter(req, file, cb){
        if (!file.originalname.match(/\.(doc | docx)$/)) {
            return cb( new Error('please upload a pdf') )
        }

        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('listening on port '+port+'...')
})
