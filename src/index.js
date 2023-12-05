// creacion de un web services

const express = require('express') //COMMONJS
const {engine} = require ('express-handlebars')

const app = express()


// utilizar un motor de plantillas
app.engine('handlebars', engine());
// extension de las paginas
app.set('view engine', 'handlebars');
// ubicacion del directorio views
app.set('views', './src/views');



// RUTAS

// // ruta raiz http://localhost:3000
// app.get('/',(req,res)=>{
//     res.send("Bienvenidos")
// })
// // ruta http://localhost:3000/dashboard
// app.get('/dashboard',(req,res)=>{
//     res.send("Dashboard principal")
// })
// // Esta ruta debe estas al final, ya que el orden si importa
// // rutas que no tengamos
// app.use((req,res)=>{
//     res.send("404 - Not Found")
// })


// REQUEST

// // Mandar info en formato json
// app.use(express.json())
// app.post('/register',(req,res)=>{
//     const {pedido,solicitado} = req.body
//     res.send(`El pedido de ${pedido} es realizado por ${solicitado}.`)
// })

// app.get('/pedido/:tipo/:xyz',(req,res)=>{ //'/pedido/:tipo', tipo es la variable que recoge la informacion
// console.log(req.params)
// res.send(`El pedido es ${req.params.tipo}`)
// })

// app.get('/search',(req,res)=>{
//     if (req.query.tipo === "sencilla"){
//         res.send("Hamburguesa sencilla")
//     }else{
//         res.send("Otro tipo de hamburguesa")
//     }
// })


// RESPONSE

// texto
app.get('/hamburguesa/simple',(req,res)=>{
    res.send("Hamburguesa - simple")
})

console.log(__dirname)//obtener el path completo 
// imagen
app.get('/hamburguesa/doble',(req,res)=>{
    res.sendfile('./descarga.jpg',{
        root:__dirname //funciona en la carpeta en la que se encuentra trabajando, si es de otra ruta, se debe añadir la ruta completa.
    })
})
// archivo
app.get('/hamburguesa/triple',(req,res)=>{
    res.sendfile('./triple.docx',{ //se va a descargar el archivo
        root:__dirname //funciona en la carpeta en la que se encuentra trabajando, si es de otra ruta, se debe añadir la ruta completa.
    })
})
// JSON
app.get('/hamburguesa/mixta',(req,res)=>{
    res.status(200).json({
        "tipo":"Mixta",
        "extra":"No"
    })
})
// pagina
app.get('/hamburguesa/mixta',(req,res)=>{
    res.status(200).json({
        "tipo":"Mixta",
        "extra":"No"
    })
})

app.get('/hamburguesa/vegana',(req,res)=>{
    res.render('home')
})
app.get('/hamburguesa/about',(req,res)=>{
    res.render('about')
})


// middelwork
// es necesario el express json
app.use(express.json())
// ruta publica
app.get('/entrada',(req,res)=>{
    res.send("Entrada al pedido")
})
// Ruta privada
// crear un middleware
app.use((req,res,next)=>{
    const {email,password} = req.body
    if (email==="example@example.com" && password==="12345"){
        next()
    }else{
        res.send("Usuario no registrado")
    }
})
// las rutas debajo del middleware, van a ser protegidas, ya que el orden si importa
app.get('/pedido',(req,res)=>{
    res.send(`Bienvenido -${req.body.email}- Listo para tomar su orden`)
})



// iniciar el servidor en el puerto 3000
app.listen('3000')
console.log("Web server ejecutandose en el puerto 3000")

