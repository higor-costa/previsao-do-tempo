'use strict';

navigator.geolocation.getCurrentPosition(localizacao => {
    previsaoLocalizacao(localizacao.coords.latitude, localizacao.coords.longitude)
})

function previsao(json) {
    $('.nome-cidade').html(json.results.city)
    $('#data').html(json.results.date)
    $('.temperatura').html(`${json.results.temp}°`)
    $('#descricao').html(json.results.description)

    const condicaoClimatica = json.results.forecast[0].condition
    trocaIcon(condicaoClimatica)
}

function trocaIcon(condicaoClimatica) {
    $('.container__icon').prop('src', `assets/icon/${condicaoClimatica}.png`)
    $('.container__icon').prop('alt', `${condicaoClimatica}`)
    $('.container__icon').prop('title', `${condicaoClimatica}`)
}

function previsaoDiaria(json) {
    $('#dia-01').html(`${json.results.forecast[1].weekday} ${json.results.forecast[1].date}`)
    $('#dia-02').html(`${json.results.forecast[2].weekday} ${json.results.forecast[2].date}`)
    $('#dia-03').html(`${json.results.forecast[3].weekday} ${json.results.forecast[3].date}`)
    $('#dia-04').html(`${json.results.forecast[4].weekday} ${json.results.forecast[4].date}`)
    $('#dia-05').html(`${json.results.forecast[5].weekday} ${json.results.forecast[5].date}`)

    $('#temperaturas-01').html(`${json.results.forecast[1].max}° ${json.results.forecast[1].min}°`)
    $('#temperaturas-02').html(`${json.results.forecast[2].max}° ${json.results.forecast[2].min}°`)
    $('#temperaturas-03').html(`${json.results.forecast[3].max}° ${json.results.forecast[3].min}°`)
    $('#temperaturas-04').html(`${json.results.forecast[4].max}° ${json.results.forecast[4].min}°`)
    $('#temperaturas-05').html(`${json.results.forecast[5].max}° ${json.results.forecast[5].min}°`)

    const previsao = json.results.forecast
    trocaIconDiarios(previsao)
}

function trocaIconDiarios(previsao) {
    const clima = [
        previsao[1].condition,
        previsao[2].condition,
        previsao[3].condition,
        previsao[4].condition,
        previsao[5].condition,
    ]

    $('#icon-01').prop('src', `assets/icon/${clima[0]}.png`)
    $('#icon-01').prop('alt', `${clima[0]}`)
    $('#icon-01').prop('title', `${clima[0]}`)

    $('#icon-02').prop('src', `assets/icon/${clima[1]}.png`)
    $('#icon-02').prop('alt', `${clima[1]}`)
    $('#icon-02').prop('title', `${clima[1]}`)

    $('#icon-03').prop('src', `assets/icon/${clima[2]}.png`)
    $('#icon-03').prop('alt', `${clima[2]}`)
    $('#icon-03').prop('title', `${clima[2]}`)

    $('#icon-04').prop('src', `assets/icon/${clima[3]}.png`)
    $('#icon-04').prop('alt', `${clima[3]}`)
    $('#icon-04').prop('title', `${clima[3]}`)

    $('#icon-05').prop('src', `assets/icon/${clima[4]}.png`)
    $('#icon-05').prop('alt', `${clima[4]}`)
    $('#icon-05').prop('title', `${clima[4]}`)
}

function tempoHoje(json) {
    $('#tempMax').html(json.results.forecast[0].max)
    $('#tempMin').html(json.results.forecast[0].min)
    $('#porDoSol').html(json.results.sunset)
    $('#nascerDoSol').html(json.results.sunrise)
    $('#umidade').html(json.results.humidity)
    $('#vento').html(json.results.wind_speedy)
}

function previsaoLocalizacao(latitude, longitude) {
    const urlApi = `https://api.hgbrasil.com/weather?format=json-cors&key=5aa52a69&lat=${latitude}&lon=${longitude}&user_ip=remote`

    fetch(urlApi)
        .then(resposta => resposta.json())
        .then(json => {
            console.log(json.results)
            previsao(json)
            previsaoDiaria(json)
            tempoHoje(json)
            exibirPrevisao()
        })
        .catch(error => alert('Erro ao pesquisar dados. Por favor, Tente novamente!', error))
}

function pesquisaPorNome(cidade, estado) {
    const urlApi = `https://api.hgbrasil.com/weather?format=json-cors&key=5aa52a69&city_name=${cidade},${estado}`

    fetch(urlApi)
        .then(resposta => resposta.json())
        .then(json => {
            console.log(json.results)
            previsao(json)
            previsaoDiaria(json)
            tempoHoje(json)
            exibirPrevisao()
        })  
        .catch(error => alert('Erro ao pesquisar dados. Por favor, Tente novamente!', error))
}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
})

document.querySelector('.form__btn').addEventListener('click', (e) => {

    const form = e.target.parentNode
    const cidade = form.cidade.value
    const estado = form.uf.value

    if (cidade == '' || estado == '') {
        return
    }
    else if (Error) {
        pesquisaPorNome(cidade, estado)
        return
    } 
    
    pesquisaPorNome(cidade, estado)
})

function exibirPrevisao () {
    $("main").css({"height": "auto"})
    $(".tela-inicial").css({"display": "none"})
    $(".container").css({"display": "block"})
}