const API_KEY = '8e9e024e6039c02ab15a7c80bff64998'

const inputCidade = document.getElementById("input")
const inputButton = document.getElementById("input-button")
const button = document.getElementById("button")
const cidadeTitulo = document.querySelector(".cidade")
const temperaturaTitulo = document.querySelector("#temperatura")
const ventoTitulo = document.querySelector("#vento")
const temperatura = document.querySelector("#dados-temperatura")
const vento = document.querySelector("#dados-vento")

const mostrarResult = document.getElementById("result")
const semCidade = document.getElementById("sem-cidade")

const cidadeNaoEncontrada = () => {
    semCidade.innerText = "Cidade não encontrada"
    semCidade.classList.add("sem-cidade")
    mostrarResult.classList.remove("result")
}


inputCidade.addEventListener('keyup', event => { //Adicionar opção de onClick com o Enter
    if(event.key === "Enter") {
        event.preventDefault()
        pegarCidade()
    }
})

const pegarCidade = () => {           //pega a cidade no input e faz o tratamento antes de pegar as coordenadas

    const cidade = inputCidade.value
    inputCidade.value = ""
    if(cidade.length === 0) {
        inputButton.classList.toggle("treme")
        inputCidade.classList.add("placeholder")
    } else {
        pegarCoordenadas(cidade)
    }
}

const pegarCoordenadas = async (cidade) => {  // pega as coordenadas na api e faz o tratamento de invalidações 
    const urlCoordenadas = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade},BRA&limit=1&appid=${API_KEY}`
    const req = await fetch(urlCoordenadas)
    const coordenadas = await req.json()

    if(coordenadas.length === 0) {
        cidadeNaoEncontrada()
    } else {
        const cidade = coordenadas[0].name
        const lat = coordenadas[0].lat
        const long = coordenadas[0].lon

        pegarDados(cidade, lat, long)
    }
}

const pegarDados = async (cidade, lat, long) => { //pega os dados através das coordenadas e joga na tela
    const urlDados = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`

    const req = await fetch(urlDados)
    const dados = await req.json()
    
    const temp = dados.main.temp
    const vent = dados.wind.speed
    
    cidadeTitulo.innerHTML = cidade
    temperatura.innerHTML = Math.round(temp) + " ºC"
    vento.innerHTML = Math.round(vent*3.6) + " km/h"
    temperaturaTitulo.innerHTML = "Temperatura"
    ventoTitulo.innerHTML = "Vento"
    mostrarResult.classList.add("result")
    semCidade.classList.remove("sem-cidade")
    inputCidade.classList.remove("placeholder")
}