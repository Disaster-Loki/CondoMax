// Função para renderizar a tabela de funcionários
function renderFuncionarios() {
    const listaFuncionarios = document.getElementById('listaFuncionarios');
    listaFuncionarios.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Simula dados de exemplo (substitua com seus dados reais)
    const funcionarios = [
        { nome: 'João Silva', cargo: 'Administrador', email: 'joao@email.com', salario: 'R$ 5.000,00', status: 'Ativo' },
        { nome: 'Maria Souza', cargo: 'Zelador', email: 'maria@email.com', salario: 'R$ 3.200,00', status: 'Inativo' }
    ];

    funcionarios.forEach(funcionario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo}</td>
            <td>${funcionario.email}</td>
            <td>${funcionario.salario}</td>
            <td>${funcionario.status}</td>
            <td>
                <button class="editFuncionarioBtn">Editar</button>
                <button class="deleteFuncionarioBtn">Excluir</button>
            </td>
        `;
        listaFuncionarios.appendChild(row);
    });
}

// Função para renderizar a tabela de condomínios
function renderCondominios() {
    const listaCondominios = document.getElementById('listaCondominios');
    listaCondominios.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Simula dados de exemplo (substitua com seus dados reais)
    const condominios = [
        { nome: 'Edifício Primavera', endereco: 'Rua das Flores, 123', cidade: 'São Paulo', estado: 'SP' },
        { nome: 'Condomínio Estrela do Mar', endereco: 'Av. da Praia, 456', cidade: 'Rio de Janeiro', estado: 'RJ' }
    ];

    condominios.forEach(condominio => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${condominio.nome}</td>
            <td>${condominio.endereco}</td>
            <td>${condominio.cidade}</td>
            <td>${condominio.estado}</td>
            <td>
                <button class="editCondominioBtn">Editar</button>
                <button class="deleteCondominioBtn">Excluir</button>
            </td>
        `;
        listaCondominios.appendChild(row);
    });
}

// Evento de clique no botão "Adicionar Funcionário"
const addFuncionarioBtn = document.getElementById('addFuncionarioBtn');
addFuncionarioBtn.addEventListener('click', () => {
    // Lógica para adicionar um novo funcionário (pode ser implementado conforme necessário)
    console.log('Adicionar Funcionário');
});

// Evento de clique no botão "Adicionar Condomínio"
const addCondominioBtn = document.getElementById('addCondominioBtn');
addCondominioBtn.addEventListener('click', () => {
    // Lógica para adicionar um novo condomínio (pode ser implementado conforme necessário)
    console.log('Adicionar Condomínio');
});

// Carrega dados iniciais na página
window.addEventListener('load', () => {
    renderFuncionarios();
    renderCondominios();

    // Oculta todas as seções de conteúdo inicialmente (exceto o dashboard)
    contentSections.forEach(section => {
        if (section.id !== 'dashboard') {
            section.classList.add('hidden');
        }
    });
});

