let input = document.getElementsByClassName("input")[0]
let op = document.querySelectorAll(".op")
let number = document.querySelectorAll(".number")
let clear= document.getElementsByClassName("clear")[0]
let igual= document.getElementsByClassName("igual")[0]
let flag = true

//Botões de operação
for(let i=0; i< op.length; i++){
    op[i].addEventListener("click", function(e){
        let opr = e.target.innerHTML
        if (opr == "÷"){
            opr = " / "
            input.textContent += opr
            flag = true
        }else if (opr == "×"){
            opr = " * "
            input.textContent += opr
            flag = true
        }else{
            opr = ` ${opr} `
            input.textContent += opr
            flag = true
        }

    })
}

//Botões Numéricos
for(let i=0; i< number.length; i++){
    number[i].addEventListener("click", function(e){
        if(flag == false){
            input.textContent = e.target.innerHTML
            flag = true
        }else{
            input.textContent += e.target.innerHTML
        }
    })
}

//Botão Clear 
clear.addEventListener("click", function(){
    input.textContent = ''
    flag = true
})

//Botão Igual
igual.addEventListener("click", function(){    
    console.log(input.textContent)
    let l = filtroEntrada(input.textContent)
    console.log(l)
    seletorOperacao(l)
    flag = false


})

//Criando um array separando os itens (números e operadores)
function filtroEntrada (n){
    let listValores = n.split(" ")
    return listValores
}

//identificando a primeira operação a ser feita (da direita para a esquerda) e executando-a.
function seletorOperacao(listValores){
    let im = listValores.indexOf("*")
    let id = listValores.indexOf("/")
    let iso = listValores.indexOf("+")
    let isu = listValores.indexOf("-")
    let list = []
    if(im >-1){
        list.push(im)
    }
    if(id >-1){
        list.push(id)
    }
    if(iso >-1){
        list.push(iso)
    }
    if(isu >-1){
        list.push(isu)
    }

    let min = Math.min(...list)
    if(im == min){
        listValores = mult(listValores)
    }
    else if(id == min){
        listValores = divisao(listValores)
    }
    else if(iso == min){
        listValores = soma(listValores)
    }
    else if(isu == min){
        listValores = subtracao(listValores)
    }

}

//Operação de Multiplicação
function mult(listValores){
    let idxMult = listValores.indexOf("*")
    let na = idxMult -1
    let np = idxMult +1
    let result = listValores[na] * listValores[np]
    listValores[na] = "@"
    listValores[np] = "@"
    listValores[idxMult] = result
    listValores = organizarArray(listValores)
    if(listValores.length > 2){
        seletorOperacao(listValores)
    }else{
        if (listValores[0] == ''){
            input.textContent = listValores[1]
        }else{
            input.textContent = listValores[0]
        }
    }
}

//Operação de Divisão
function divisao(listValores){
    let idxMult = listValores.indexOf("/")
    let na = idxMult -1
    let np = idxMult +1
    let result = Number(listValores[na]) / Number(listValores[np])
    listValores[na] = "@"
    listValores[np] = "@"
    listValores[idxMult] = result
    listValores = organizarArray(listValores)
    if(listValores.length > 2){
        seletorOperacao(listValores)
    }else{
        if (listValores[0] == ''){
            input.textContent = listValores[1]
        }else{
            input.textContent = listValores[0]
        }
    }
}

//Operação de Soma
function soma(listValores){
    let idxMult = listValores.indexOf("+")
    let na = idxMult -1
    let np = idxMult +1
    let result = Number(listValores[na]) + Number(listValores[np])
    listValores[na] = "@"
    listValores[np] = "@"
    listValores[idxMult] = result
    listValores = organizarArray(listValores)
    if(listValores.length > 2){
        seletorOperacao(listValores)
    }else{
        if (listValores[0] == ''){
            input.textContent = listValores[1]
        }else{
            input.textContent = listValores[0]
        }
        
    }
}

//Operação de subtração
function subtracao(listValores){
    let idxMult = listValores.indexOf("-")
    let na = idxMult -1
    let np = idxMult +1
    let result = Number(listValores[na]) - Number(listValores[np])
    listValores[na] = "@"
    listValores[np] = "@"
    listValores[idxMult] = result
    listValores = organizarArray(listValores)
    if(listValores.length > 2){
        console.log(listValores)
        seletorOperacao(listValores)
    }else{
        if (listValores[0] == ''){
            input.textContent = listValores[1]
        }else{
            input.textContent = listValores[0]
        }
    }
}

//Função para organizar o array após uma operação.
function organizarArray(listValores){
    let listOrganizada = [];
    for(let i of listValores){
        if(i != "@" || i == "*" || i == "/" || i == "+" || i == "-"){
            listOrganizada.push(i)
        }
    }
    return listOrganizada
}