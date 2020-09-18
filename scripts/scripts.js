//Declarando funções
//Função de retornar um JSON
const fetchJson = (url) => {
    return fetch(url).then(resposta => resposta.json())
}
/*Temporizador para o banner */
const cupom = document.querySelector(".cupom")
let temporizador = document.querySelector(".info h4 > span")
let sec = Number(temporizador.innerText.split(":")[2])
let min = Number(temporizador.innerText.split(":")[1])


const timer = () => {
    if(min !== 0 && sec >= 0) {
        if(sec === 0) {
            min--
            sec = 59
            temporizador.innerText = `00:0${min}:${sec}`
        } else {
            sec--
            sec <= 9 
            ? temporizador.innerText = `00:0${min}:0${sec}` 
            : temporizador.innerText = `00:0${min}:${sec}`
        }
    } else if (min === 0 && sec !== 0 ) {
        sec--
        sec <= 9 
        ? temporizador.innerText = `00:0${min}:0${sec}` 
        : temporizador.innerText = `00:0${min}:${sec}`

    }else {
        cupom.style.display = "none"
        clearInterval(id);

    }
}
/*Responsável por para setInterval do contador do cupom */
const id = setInterval(timer, 1000)

/*Auto-preencher input de cupom da sacola ao clicar no banner */
document.querySelector("#ticket").value = '';
cupom.addEventListener('click', () => {
    const codigo = document.querySelector(".cupom .esquerda h4").innerText.split(": ")[1]
    document.querySelector("#ticket").value = codigo;
    clearInterval(id)
    cupom.style.display = "none"
})  



const criarTopFilmes = (filme) => {
    const card = document.createElement("div")
    card.classList.add("top-card")
    card.innerHTML = `
            <div class="card-content">
                <span class="estrela"><img src="./images/favoritar.svg" alt="estrela de favoritar"></span>
                <div>
                    <p class="titulo"><span>${filme.title}</span></p>
                    <p class="nota"> <span><img src="./images/estrela.svg" alt="estrela"></span> <span>${filme.vote_average}</span></p>
                </div>
                <footer>
                    <p>Sacola</p>
                    <p>R$:<span> ${filme.price.toFixed(2)}</span></p>
                </footer>
            </div>
         `
    card.style.background = `url(${filme.poster_path})`
    card.style.backgroundSize = "cover"
    card.style.backgroundRepeat = "no-repeat"

    return card
}


const criarFilmes = (filme) => {
    const card = document.createElement("div")
    card.classList.add("filme")
    card.innerHTML = `
            <div class="card-content">
                <span class="estrela"><img src="./images/favoritar.svg" alt="estrela de favoritar"></span>
                <div>
                    <p class="titulo"><span>${filme.title}</span></p>
                    <p class="nota"> <span><img src="./images/estrela.svg" alt="estrela"></span> <span>${filme.vote_average}</span></p>
                </div>
                <footer>
                    <p>Sacola</p>
                    <p>R$:<span> ${filme.price.toFixed(2)}</span></p>
                </footer>
            </div>
         `
    card.style.backgroundImage = `url(${filme.poster_path})`
    card.style.backgroundSize = "cover"
    card.style.backgroundRepeat = "no-repeat"

    return card

}

/*Fetch de filmes e lógica dos botões de gênero */
const cardsTop = document.querySelector(".cards-top");
const cardsFilme = document.querySelector(".filmes");
const botoes = document.querySelectorAll(".botoes-filtro > button")

const removeClasseActive = () => {
    botoes.forEach(bot => {
        if(bot.classList.contains("active")) {
            bot.classList.remove("active")
        }
    })
}

fetchJson("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
    .then(respostaJson => {
        /*Criando top filmes */
        for(let i = 0; i < 5; i++) {
             let card = criarTopFilmes(respostaJson.results[i]);
             cardsTop.append(card)  
         }

         /*Criando os filmes segundo o click*/
        for(let i = 0; i < 20; i++){
            let card = criarFilmes(respostaJson.results[i])
            cardsFilme.append(card)
        }
         botoes.forEach(botao => {
             botao.addEventListener('click', () => {
                 removeClasseActive();
                 botao.classList.add("active")
                 cardsFilme.innerHTML = '';
                 if(!botao.id) {
                    for(let i = 0; i < 20; i++){
                        card = criarFilmes(respostaJson.results[i])
                        cardsFilme.append(card)
                    }
                 } else {
                     fetchJson(`https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=${botao.id}&language=pt-BR`)
                        .then(filmesGenero => {
                            for(let i = 0; i < 20; i++) {
                                let card = criarFilmes(filmesGenero.results[i])
                                cardsFilme.append(card)
                            }
                        })
                    }
                })
         })
    })


    

//Criar uma ou mais funções da lógica da sacola
//Adicionar ouvintes de eventos nos filmes - no then