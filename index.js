const express = require ('express')
const server = express ()

// configurando json
server.use(
  express.urlencoded({
      extended: true,
  }),
)

server.use(express.json())

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = {nome: "NodeJS", tipo: "backend"}


// Crud

var cursos = [
  {
    id:1,
    nome: "NodeJS"
  },
 {
    id:2,
    nome: "PHP"
  }
]


// listando todos os cursos
server.get('/cursos', (req, res)=>{
  return res.status(200).json(cursos)
})

//listando curso por id
server.get('/cursos/:id',(req, res) =>{
  const id = req.params.id -1
  const curso = cursos[id] 
  return res.status(200).json({curso:`Aprendendo ${curso.nome}`})
})

// Criando um novo Curso
server.post('/cursos', (req, res)=>{
  const {id, nome} = req.body
  const curso = {
    id:id,
    nome: nome
  }
  //const found = array1.find(element => element > 10);
  const idCurso = cursos.find( el => el.id == id )
  if(idCurso){
    console.log("exixte curso")
    return res.status(422).json({message: "Curso Já exixtente!"})
  }
  
  cursos.push(curso)
  return res.status(201).json({message: "Curso Criado com sucesso!"})
})

// atualizando cursos com put (é necessario enviar todos os dados)
server.put('/cursos/:id', (req, res)=>{
  const id = req.params.id 
  const { nome } = req.body 
  const idCurso = cursos.find( el => el.id == id )
  if(!idCurso){    
    return res.status(422).json({message: "curso Não encontrado!"})
  }
  const curso = {
    id,
    nome
  }
  cursos[id-1]=curso
  return res.status(200).json({message:"Curso Atualizado com sucesso!"})
})

// deletando um Curso
server.delete('/curso/:id', (req, res)=>{
  const id = req.params.id 
  
  const idCurso = cursos.find( el => el.id == id )
  if(!idCurso){    
    return res.status(422).json({message: "curso Não encontrado!"})
  }
  cursos.splice(id-1,1)
  return res.status(200).json({message: "Curso excluido com sucesso", cursos})
})



server.listen (3000)