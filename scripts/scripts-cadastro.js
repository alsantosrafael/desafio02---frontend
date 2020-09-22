const somaFinal = (sacolaFilmes) => {
    let resultado = sacolaFilmes.reduce((total, filme) => {
      return (total += filme.qtd * filme.preco);
    }, 0);
    return resultado;
  };

const criaSacola = () => {

    const sacola = document.createElement("div");
    sacola.classList.add("resto")
    if (sacolaFilmes.length===0) {
      const sacola = criaSacolaVazia();
      return sacola;
    } else {
      sacola.innerHTML = `<div><div class="container-sacola"></div><h5>Insira seu cupom</h5>
      <label for="ticket">
          <input id="ticket" name="ticket" type="text" placeholder="Cupom de desconto">
          <img src="./images/Ticket.svg" alt="">
      </label>
      <button id="confirma-dados" type="submit" >Confirmar a compra <span>R$  ${somaFinal(sacolaFilmes)}</span></button></div>`;
    }

    return sacola
}
const criaItemNaSacola = (filme) => {
  if(voucher !== undefined) {
    document.querySelector("#ticket").value = voucher
  } else {
    document.querySelector("#ticket").value = ''
  }
    const sacola = document.querySelector(".resto div")
    const containerSacola = document.querySelector(".container-sacola")
    // containerSacola.innerHTML = ''
      const item = document.createElement("div");
      item.classList.add("item");
      item.id = `A${filme.id.toString()}`;
  
      item.innerHTML = `
      <div class="dados">
          <div>
            <img src=${filme.urlImg.replace(/(url\(|\)|")/g, '')} alt="">
          </div>
          <div>
            <p>${filme.titulo}</p>
            <p id=preco>R$${filme.preco}</p>
          </div>
      </div>
  
      <div class="opt">
        <button class="adicionar" ><img src="./images/add.svg" alt=""></button>
        <p class="qtd">${filme.qtd}</p>
        <button class="deletar"><img src="./images/delete.svg"  alt=""></button>
      </div>`;
  
    containerSacola.append(item)
    if(document.querySelector("#ticket").value === 'HTMLNAOELINGUAGEM') {
      document.querySelector("#confirma-dados span").innerText= `R$: ${(somaFinal(sacolaFilmes)*0.9).toFixed(2)}`
    } else {
      document.querySelector("#confirma-dados span").innerText= `R$: ${somaFinal(sacolaFilmes).toFixed(2)}`
    }
  
    item.querySelector(".deletar").addEventListener("click", (event) => {

        const filmeId = event.currentTarget.closest(".item").id.substr(1);
        sacolaFilmes.forEach((filme,index) => {
          if (filme.id === filmeId) {
            filme.qtd--;
            if(filme.qtd === 0) {
                sacolaFilmes.splice(index, 1)
            }
          }

        });
        containerSacola.innerHTML = ''
        for(let i = 0; i < sacolaFilmes.length; i++) {
            criaItemNaSacola(sacolaFilmes[i])
        }
        if(document.querySelector("#ticket").value === 'HTMLNAOELINGUAGEM') {
          document.querySelector("#confirma-dados span").innerText= `R$: ${(somaFinal(sacolaFilmes)*0.9).toFixed(2)}`
        } else {
          document.querySelector("#confirma-dados span").innerText= `R$: ${somaFinal(sacolaFilmes).toFixed(2)}`
        }
      });
      item.querySelector(".adicionar").addEventListener("click", (event) => {
        const filmeId = event.currentTarget.closest(".item").id.substr(1);
        sacolaFilmes.forEach((filme, index) => {
          if (filme.id === filmeId) {
            sacolaFilmes[index].qtd++;
            // atualizaItemSacola(index)
            containerSacola.innerHTML = ''
            for(let i = 0; i < sacolaFilmes.length; i++) {
                criaItemNaSacola(sacolaFilmes[i])
            }
            if(document.querySelector("#ticket").value === 'HTMLNAOELINGUAGEM') {
              document.querySelector("#confirma-dados span").innerText= `R$: ${(somaFinal(sacolaFilmes)*0.9).toFixed(2)}`
            } else {
              document.querySelector("#confirma-dados span").innerText= `R$: ${somaFinal(sacolaFilmes).toFixed(2)}`
            }
          }
        });
      });
  
  }

const filmes = localStorage.getItem('filmes')
const sacolaFilmes = JSON.parse(filmes);
const voucher = localStorage.getItem('cupom');
const sidenav = document.querySelector(".sidenav")

sidenav.append(criaSacola());



for(let i = 0; i < sacolaFilmes.length; i++) {
    criaItemNaSacola(sacolaFilmes[i])
}

const validaFormulario = () => {
  const inputs = document.querySelectorAll("form input")
  let formularioValido = true;

  inputs.forEach(input => {
    if(input.value === '') {
      console.log('entrou aqui')
      formularioValido = false;
    }
  })
  return formularioValido;

}
/*Pegando dos forms*/
const botao = document.querySelector("#confirma-dados")

botao.addEventListener('click', () => {
  console.log(validaFormulario())
  if(sacolaFilmes.length === 0) {
    window.location.href = "http://127.0.0.1:5500/index.html"

  } else if (validaFormulario()) {
    alert('Compra realizada')
    window.location.href = "http://127.0.0.1:5500/sucesso.html"
  } else {
    alert('Preencha todos os campos!!')
  }

})

/*Como travar os inputs? */
// const testaInputs = () => {
//   if

//   if(sacolaFilmes.length === 0) {
//     document.querySelector("#confirma-dados").disabled = false;
//     

// } else {
//     if(flagInputs === inputs.length) {
//         document.querySelector("#confirma-dados").disabled = false;
//         document.querySelector("#confirma-dados").onclick = () => location.href = "http://127.0.0.1:5500/sucesso.html"
//         console.log('Sucesso!')
//     }

// }

// }







