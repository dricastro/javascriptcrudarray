
let sites = [
    {"id":1,"nome":"dricastro","endereco":"www.github.com/dricastro"},
    {"id":2,"nome":"dricastro","endereco":"https://github.com/dricastro"}
];

let editandoId = null;
const form = document.getElementById('site-form');
const nomeInput = document.getElementById('nome');
const enderecoInput = document.getElementById('endereco');
const siteIdInput = document.getElementById('site-id');
const submitBtn = document.getElementById('submit-btn');
const cancelarBtn = document.getElementById('cancelar-btn');
const formTitle = document.getElementById('form-title');
const tabelaBody = document.getElementById('sites-body');

form.addEventListener('submit', function (e){
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const endereco = enderecoInput.value.trim();

    if (editandoId !== null){
        //editando um registro
        const index = site.findIndex(site => siteId == editandoId);
        if (index !== -1) {
            sites [index] = {id:editandoId, nome,endereco}
        }
        sairDoModoEdicao
    }else {
        // cadastrando um novo registro
        const novoId = sites.length > 0? Math.max(...sites.map(site => site.id))+1 : 1;
    sites.push({id:novoId, nome, endereco});
    }

    renderizarTabela();
    limparFormulario();
});

function sairDoModoEdicao(){
    editandoId = null;
    limparFormulario();
    formTitle.textContent = 'Adicionar Novo Site';
    submitBtn.textContent = 'Salvar';
    cancelarBtn.style.display = 'none';
}

function limparFormulario(){
    form.reset();
    siteIdInput.value = '';
}

function renderizarTabela(){
    tabelaBody.innerHTML = "";
    
    sites.forEach(site => {
        //linha
        const tr = document.createElement('tr');
        //coluna
        const tdNome = document.createElement('td');
        tdNome.textContent = site.nome;
        //coluna
        const tdEndereco = document.createElement('td');
        //link
        const link = document.createElement('a');
        link.href = site.endereco.startsWith('http')? site.endereco: `http://${site.endereco}`;
        link.textContent = site.endereco;
        link.target = '_blank';
        tdEndereco.appendChild(link);
        //coluna
        const tdAcoes = document.createElement('td');
        tdAcoes.className = 'acoes';

        //botão editar
        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'editar';
        editarBtn.addEventListener('click', () => editarSite(site.id));


        //botão excluir
        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'excluir';
        excluirBtn.className="cancelar";
        excluirBtn.addEventListener('click', () => excluirSite(site.id));

        //adicionar os botões excluir
        tdAcoes.appendChild(editarBtn);
        tdAcoes.appendChild(excluirBtn);

        //montar a linha
        tr.appendChild(tdNome);
        tr.appendChild(tdEndereco);
        tr.appendChild(tdAcoes);
        //colocar a linha dentro do corpo da tabela
        tabelaBody.appendChild(tr);
    });
}

function excluirSite(id){
    if(confirm('Tem certeza? Certeza mesmo!!!!')){
        sites = sites.filter(site => site.id != id) ;
        renderizarTabela();
        //voltar aqui...
    }
}
cancelarBtn.addEventListener('click', sairDoModoEdicao);
renderizarTabela();

function editarSite (id){
    const site = sites.find(site => site.id === id);
    if(site)
    {
        editandoId = id;
        nomeInput.value = site.nome;
        enderecoInput.value = site.endereco;
        siteIdInput.value = id;
        formTitle.textContent = 'Editar Site';
        submitBtn.textContent = 'Atualizar';
        cancelarBtn.display = 'inline-block';
        nomeInput.focus ();    
    }
}
