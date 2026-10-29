const searchForm = document.getElementById("form-pesquisa");
const searchInput = document.getElementById("campo-pesquisa");
const resultsSection = document.getElementById("resultados-pesquisa");
const resultsCount = document.getElementById("contagem-resultados");

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function criarResultado(dado, indice) {
  const article = document.createElement("article");
  article.className = "item-resultado";

  const index = document.createElement("span");
  index.className = "card-index";
  index.textContent = String(indice + 1).padStart(2, "0");

  const title = document.createElement("h3");
  title.textContent = dado.titulo;

  const description = document.createElement("p");
  description.className = "descricao-meta";
  description.textContent = dado.descricao;

  const link = document.createElement("a");
  link.href = dado.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append("Explorar referência ", document.createTextNode("↗"));
  link.setAttribute("aria-label", `Explorar referência: ${dado.titulo} (abre em nova aba)`);

  article.append(index, title, description, link);
  return article;
}

function mostrarEstadoVazio(termo) {
  const emptyState = document.createElement("div");
  emptyState.className = "empty-state";

  const title = document.createElement("h3");
  title.textContent = termo ? "Ainda não encontramos esse tema." : "Nenhuma ideia disponível.";

  const message = document.createElement("p");
  message.textContent = termo
    ? "Tente outra palavra ou busque por um conceito mais amplo."
    : "Volte em breve para descobrir novos conteúdos.";

  emptyState.append(title, message);
  resultsSection.replaceChildren(emptyState);
}

function pesquisar(termo = "") {
  const consulta = normalizar(termo.trim());
  const encontrados = pedagogias.filter((dado) => {
    const conteudo = normalizar(`${dado.titulo} ${dado.descricao} ${dado.tags}`);
    return !consulta || consulta.split(/\s+/).every((palavra) => conteudo.includes(palavra));
  });

  resultsSection.replaceChildren();

  if (encontrados.length === 0) {
    mostrarEstadoVazio(termo.trim());
  } else {
    encontrados.forEach((dado, indice) => {
      resultsSection.append(criarResultado(dado, indice));
    });
  }

  resultsCount.textContent = `${encontrados.length} ${encontrados.length === 1 ? "ideia encontrada" : "ideias encontradas"}`;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  pesquisar(searchInput.value);
});

pesquisar();
