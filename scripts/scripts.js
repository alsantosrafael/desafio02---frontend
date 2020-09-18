const fetchJson = (url) => {
    return fetch(url).then(resposta => resposta.json())
}

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
                    <p>R$:<span> ${filme.price}</span></p>
                </footer>
            </div>
         `
    card.style.backgroundImage = `url(${filme.poster_path})`
    card.style.backgroundSize = "cover"
    card.style.backgroundRepeat = "no-repeat"
    card.style.backgroundO
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
                    <p>R$:<span> ${filme.price}</span></p>
                </footer>
            </div>
         `
    card.style.backgroundImage = `url(${filme.poster_path})`
    card.style.backgroundSize = "cover"
    card.style.backgroundRepeat = "no-repeat"

    return card

}
//const topcards = document.querySelectorAll(".top-card")

const cardsTop = document.querySelector(".cards-top");
const cardsFilme = document.querySelector(".filmes");
const botoes = document.querySelectorAll(".botoes-filtro > button")



fetchJson("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR")
    .then(respostaJson => {
        /*Criando top filmes */
        for(let i = 0; i < 5; i++) {
             let card = criarTopFilmes(respostaJson.results[i]);
             cardsTop.append(card)  
         }

         /*Criando os filmes segundo o click*/
         botoes.forEach(botao => {
             botao.addEventListener('click', evento => {
                 evento.target()
                 if(botao.innerText === 'Todos'){
                     botoes.forEach(botao.classList.remove('active'))
                     botao.classList.add('active')
                     for(let i = 0; i < 10; i++){
                        let card = criarFilmes(respostaJson.results[i])
                        cardsFilme.append(card)
                     }
                 } else if(botao.innerText === 'Ação') {
                    botoes.forEach(botao.classList.remove('active'))
                    botao.classList.add('active')
                    //fetch(https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=<id do gênero>&language=pt-BR)
                 }
             })

         })
         for(let i = 0; i < 10; i++){
            let card = criarFilmes(respostaJson.results[i])
            cardsFilme.append(card)
         }
    })