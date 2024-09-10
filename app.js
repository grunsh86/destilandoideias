function pesquisar() {
  // Mensagem no console para indicar que a função foi chamada (útil para depuração).
   console.log("Clicou");
  // Seleciona o elemento HTML com o ID 'resultados-pesquisa' (onde os resultados serão exibidos).
   let section = document.getElementById('resultados-pesquisa');
  // Inicializa uma string vazia para armazenar os resultados da pesquisa.
   let resultados = "";
   let titulo = "";
   let descricao = "";
   let tags = "";
   let campoPesquisa = document.getElementById('campo-pesquisa').value;
   console.log(campoPesquisa);
   if (campoPesquisa == "") {
    section.innerHTML = "<p>Nada foi encontrado!</p>";  
    return
   }
   campoPesquisa = campoPesquisa.toLowerCase();

  // Itera sobre cada elemento (dado) do array 'pedagogias'.
   for (let dado of pedagogias) { 
    titulo = dado.titulo.toLowerCase();
    descricao = dado.descricao.toLowerCase();
    tags = dado.tags.toLowerCase();
    // Adiciona uma nova div com os dados do elemento atual à string 'resultados'.
    // Cria um título h2 com o valor da propriedade 'titulo' do objeto 'dado'.
    // Cria um parágrafo com a descrição do objeto 'dado'.
    // Cria um link para mais informações, abrindo em uma nova aba.
      if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
        resultados += ` 
          <div class="item-resultado"> 
          <h2>${dado.titulo}</h2> 
          <p class="descricao-meta">${dado.descricao}</p> 
          <a href=${dado.link} target="blank">Mais informações.</a> 
          </div>
        `;

      }
      if (!resultados){
        resultados = "<p>Nada foi encontrado!Você não buscou um ramo válido da Pedagogia</p>"; 
      }
  // Substitui o conteúdo HTML do elemento 'section' pela string 'resultados' (renderizando os resultados na página).
   section.innerHTML = resultados; 
 
 };


}
