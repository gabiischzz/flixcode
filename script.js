let cardContainer = document.querySelector(".card-container");
let dados = [];

async function iniciarBusca() {
    const termoBusca = document.querySelector('input[type="text"]').value.toLowerCase();

    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

async function mostrarTodosOsCards() {
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }
    renderizarCards(dados);
}

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <img src="${dado.imagem}" alt="Logo da linguagem ${dado.nome}" class="card-image">
            <div class="card-content">
                <h2>${dado.nome}</h2>
                <p>${dado.data_criacao}</p>
                <p>${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            </div>
        `;
        cardContainer.appendChild(article);
    }
}