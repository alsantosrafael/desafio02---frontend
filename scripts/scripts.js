let sacolaFilmes = []; //Lista de filmes
const sidenav = document.querySelector(".sidenav");
//Declarando funções
//Função de retornar um JSON
const inputs = document.getElementsByTagName("input");


const fetchJson = (url) => {
  return fetch(url).then((resposta) => resposta.json());
};
const somaFinal = (sacolaFilmes) => {
  let resultado = sacolaFilmes.reduce((total, filme) => {
    return (total += filme.qtd * filme.preco);
  }, 0);
  return resultado;
};
/*Preenchendo Sidenav com lista vazia */
const criaSacolaVazia = () => {
  const sacola = document.createElement("div");
  sacola.classList.add("resto");
  sacola.innerHTML = `                <h3>Sua sacola está vazia</h3>
      <p>Adicione filmes agora</p>
      <div class="img-container">
          <img src="./images/Social Media.svg" alt="">
      </div>
      <h5>Insira seu cupom</h5>
      <label for="ticket">
          <input id="ticket" name="ticket" type="text" placeholder="Cupom de desconto">
          <img src="./images/Ticket.svg" alt="">
      </label>`;
  return sacola;
};
const criaSacola = () => {
  const sacola = document.querySelector(".resto");
  if (!sacola) {
    const sacola = criaSacolaVazia();
    return sacola;
  } else {
    const cod = document.querySelector(".resto label input").value;
    sacola.innerHTML = `<div><div class="container-sacola"></div><h5>Insira seu cupom</h5>
    <label for="ticket">
        <input id="ticket" name="ticket" type="text" placeholder="Cupom de desconto">
        <img src="./images/Ticket.svg" alt="">
    </label>
    <button id="confirma-dados" type="submit" >Confirme seus Dados <span>R$  ${somaFinal(
      sacolaFilmes
    )}</span></button></div>`;
  }
  document.querySelector("#confirma-dados").onclick = () => {
    const sacolaFinal = JSON.stringify(sacolaFilmes);
    localStorage.setItem("filmes", sacolaFinal);
    const voucher = document.querySelector("#ticket").value;

    localStorage.setItem("cupom", voucher);
    location.href = "http://127.0.0.1:5500/cadastro.html";
  };
  /**FALTA CORRIGIR A QUESTÃO DO CÓDIGO de DESCONTO */
};
//REVER
const atualizaItemSacola = (index) => {
  const filme = sacolaFilmes[index];

  console.log(filme.id);
  console.log(
    document.querySelector(`.resto`).querySelector(`#A${filme.id.toString()}`)
  );

  somaFinal(sacolaFilmes);
};

/*Quando reduzir a quantidade de um filme
preciso reduzir a quantidade no objeto do filme no array
preciso atualizar o valor na sidenav da sacola
preciso atulizar a quantidade no item na sidenav na sacola
se qtd === 0 preciso excluir o item da sacola  */

const criaItemNaSacola = () => {
  somaFinal(sacolaFilmes);
  const sacola = document.querySelector(".resto div");
  const containerSacola = document.querySelector(".container-sacola");
  containerSacola.innerHTML = "";
  for (let i = 0; i < sacolaFilmes.length; i++) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.id = `A${sacolaFilmes[i].id.toString()}`;

    item.innerHTML = `
    <div class="dados">
        <div>
          <img src=${sacolaFilmes[i].urlImg.replace(
            /(url\(|\)|")/g,
            ""
          )} alt="">
        </div>
        <div>
          <p>${sacolaFilmes[i].titulo}</p>
          <p id=preco>R$${sacolaFilmes[i].preco}</p>
        </div>
    </div>

    <div class="opt">
      <button class="adicionar" ><img src="./images/add.svg" alt=""></button>
      <p class="qtd">${sacolaFilmes[i].qtd}</p>
      <button class="deletar"><img src="./images/delete.svg"  alt=""></button>
    </div>`;

    // containerSacola.insertBefore(item, sacola.childNodes[0]);
    containerSacola.append(item);
    document.querySelector("#confirma-dados span").innerText = `R$: ${somaFinal(sacolaFilmes)}`;
    item.querySelector(".deletar").addEventListener("click", (event) => {

      const filmeId = event.currentTarget.closest(".item").id.substr(1);
      sacolaFilmes.forEach((filme, index) => {
        if (filme.id === filmeId) {
          filme.qtd--;
          criaItemNaSacola();
        }
        if (filme.qtd === 0) {
          sacolaFilmes.splice(index, 1)
          criaItemNaSacola();
        }
      });

    });
    item.querySelector(".adicionar").addEventListener("click", (event) => {
      const filmeId = event.currentTarget.closest(".item").id.substr(1);
      sacolaFilmes.forEach((filme, index) => {
        if (filme.id === filmeId) {
          sacolaFilmes[index].qtd++;
          // atualizaItemSacola(index)
          criaItemNaSacola();
          somaFinal(sacolaFilmes);
        }
      });
    });
  }
};
/*Temporizador para o banner */
const cupom = document.querySelector(".cupom");
let temporizador = document.querySelector(".info h4 > span");
let sec = Number(temporizador.innerText.split(":")[2]);
let min = Number(temporizador.innerText.split(":")[1]);

/*Preenchendo sidenav com lista vazia */
sidenav.append(criaSacolaVazia());

// Criando temporizador
const timer = () => {
  if (min !== 0 && sec >= 0) {
    if (sec === 0) {
      min--;
      sec = 59;
      temporizador.innerText = `00:0${min}:${sec}`;
    } else {
      sec--;
      sec <= 9
        ? (temporizador.innerText = `00:0${min}:0${sec}`)
        : (temporizador.innerText = `00:0${min}:${sec}`);
    }
  } else if (min === 0 && sec !== 0) {
    sec--;
    sec <= 9
      ? (temporizador.innerText = `00:0${min}:0${sec}`)
      : (temporizador.innerText = `00:0${min}:${sec}`);
  } else {
    cupom.style.display = "none";
    clearInterval(id);
  }
};
/*Responsável por para setInterval do contador do cupom */
const id = setInterval(timer, 1000);

/*Auto-preencher input de cupom da sacola ao clicar no banner */
document.querySelector("#ticket").value = "";
cupom.addEventListener("click", () => {
  const codigo = document
    .querySelector(".cupom .esquerda h4")
    .innerText.split(": ")[1];
  document.querySelector("#ticket").value = codigo;
  clearInterval(id);
  cupom.style.display = "none";
});

const criarTopFilmes = (filme) => {
  const card = document.createElement("div");
  card.classList.add("top-card");
  card.id = filme.id.toString();
  card.innerHTML = `
            <div class="card-content">
                <span class="estrela"><img src="./images/favoritar.svg" alt="estrela de favoritar"></span>
                <div>
                    <p class="titulo"><span>${filme.title}</span></p>
                    <p class="nota"> <span><img src="./images/estrela.svg" alt="estrela"></span> <span>${
                      filme.vote_average
                    }</span></p>
                </div>
                <footer>
                    <p>Sacola</p>
                    <p>R$:<span> ${filme.price.toFixed(2)}</span></p>
                </footer>
            </div>
         `;
  card.style.background = `url(${filme.poster_path})`;
  card.style.backgroundSize = "cover";
  card.style.backgroundRepeat = "no-repeat";
  card.style.backgroundPosition = "center";
  return card;
};

const criarFilmes = (filme) => {
  const card = document.createElement("div");
  card.classList.add("filme");
  card.id = filme.id.toString();
  card.innerHTML = `
            <div class="card-content">
                <span class="estrela"><img src="./images/favoritar.svg" alt="estrela de favoritar"></span>
                <div>
                    <p class="titulo"><span>${filme.title}</span></p>
                    <p class="nota"> <span><img src="./images/estrela.svg" alt="estrela"></span> <span>${
                      filme.vote_average
                    }</span></p>
                </div>
                <footer>
                    <p>Sacola</p>
                    <p>R$:<span> ${filme.price.toFixed(2)}</span></p>
                </footer>
            </div>
         `;
  card.style.backgroundImage = `url(${filme.poster_path})`;
  card.style.backgroundSize = "cover";
  card.style.backgroundRepeat = "no-repeat";
  card.style.backgroundPosition = "center";
  return card;
};

/*Fetch de filmes e lógica dos botões de gênero */
const cardsTop = document.querySelector(".cards-top");
const cardsFilme = document.querySelector(".filmes");
const botoes = document.querySelectorAll(".botoes-filtro > button");

const removeClasseActive = () => {
  botoes.forEach((bot) => {
    if (bot.classList.contains("active")) {
      bot.classList.remove("active");
    }
  });
};

const addFilmeSacola = (seletor) => {
  somaFinal(sacolaFilmes);
  const listaFilmes = document.querySelectorAll(`.${seletor}`);
  listaFilmes.forEach((filme) => {
    filme.addEventListener("click", () => {
      if (sacolaFilmes.length === 0) {
        sacolaFilmes.push({
          id: filme.id,
          titulo: filme.innerText.split("\n")[0],
          preco: Number(filme.innerText.split("R$: ")[1]),
          urlImg: filme.style.backgroundImage,
          qtd: 1,
        });
        criaSacola();
        criaItemNaSacola();
      } else {
        let flag = false;
        const id = filme.id;

        sacolaFilmes.forEach((film, ind) => {
          if (film.id === id) {
            sacolaFilmes[ind].qtd += 1;
            flag = true;
          }
        });
        if (flag === false) {
          sacolaFilmes.push({
            id: filme.id,
            titulo: filme.innerText.split("\n")[0],
            preco: Number(filme.innerText.split("R$: ")[1]),
            urlImg: filme.style.backgroundImage,
            qtd: 1,
          });
        }
        criaSacola();
        criaItemNaSacola();
      }
    });
  });
};

fetchJson(
  "https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR"
).then((respostaJson) => {
  /*Criando top filmes */

  for (let i = 0; i < 5; i++) {
    let card = criarTopFilmes(respostaJson.results[i]);
    cardsTop.append(card);
  }
  addFilmeSacola("top-card");

  /*Criando os filmes segundo o click*/
  for (let i = 0; i < 20; i++) {
    let card = criarFilmes(respostaJson.results[i]);
    cardsFilme.append(card);
  }
  addFilmeSacola("filme");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      removeClasseActive();
      botao.classList.add("active");
      cardsFilme.innerHTML = "";

      if (!botao.id) {
        for (let i = 0; i < 20; i++) {
          card = criarFilmes(respostaJson.results[i]);
          cardsFilme.append(card);
        }
      } else {
        fetchJson(
          `https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=${botao.id}&language=pt-BR`
        ).then((filmesGenero) => {
          for (let i = 0; i < 20; i++) {
            let card = criarFilmes(filmesGenero.results[i]);
            cardsFilme.append(card);
          }
          addFilmeSacola("filme");
        });
      }
    });
  });
});

/*Dúvidas: Como redirecionar a pagina ao clicar no botão levando os dados
Como fazer cada item ser obrigatório no cadastro
como adicionar ouvinte de evento aos botoes de adicionar e deletar quantidade de filme
como colocar a borda no pai do input com focus com toggle 
Terminar todos os hovers
Não Entendi o modelo de pseudo-classe inactive no figma*/
