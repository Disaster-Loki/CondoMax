document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentSections = document.querySelectorAll('.content-section');
    const addFuncionarioBtn = document.getElementById('addFuncionarioBtn');
    const addCondominioBtn = document.getElementById('addCondominioBtn');
    const addEmpresaBtn = document.getElementById('addEmpresaBtn');
    const modal = document.getElementById('modalCondominio');
    const closeBtn = document.querySelector('.close');
    const submitBtn = document.getElementById('submitCondominio');
    const formCondominio = document.getElementById('formCondominio');
    const listaCondominios = document.getElementById('listaCondominios');

    console.log('Document loaded');

    // Função para mostrar conteúdo da seção selecionada
    function showContent(contentId) {
        console.log('Showing content:', contentId);
        contentSections.forEach(section => {
            if (section.id === contentId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    // Troca de seções ao clicar nos itens da barra lateral
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const contentToShow = this.getAttribute('data-content');
            console.log('Sidebar item clicked:', contentToShow);
            showContent(contentToShow);
            sidebarItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Mostrar modal para adicionar condomínio
    addCondominioBtn.addEventListener('click', function() {
        console.log('Add Condomínio button clicked');
        modal.style.display = 'block';
    });

    // Fechar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Submeter formulário de condomínio
    formCondominio.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');
        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const gerente_responsavel = document.getElementById('gerente_responsavel').value;

        // Adicionar novo condomínio à lista
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${nome}</td>
            <td>${endereco}</td>
            <td>${gerente_responsavel}</td>
            <td>
                <button class="editBtn">Editar</button>
                <button class="deleteBtn">Excluir</button>
            </td>
        `;
        listaCondominios.appendChild(newRow);

        // Fechar modal
        modal.style.display = 'none';
    });

    // Exemplo de dados dinâmicos para a tabela de logs
    const logTableBody = document.getElementById('logTableBody');
    const exampleLogs = [
        { date: '2024-07-01 12:00', action: 'Login' },
        { date: '2024-07-01 12:05', action: 'Adicionou funcionário' },
        { date: '2024-07-01 12:10', action: 'Editou condomínio' }
    ];

    exampleLogs.forEach(log => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${log.date}</td>
            <td>${log.action}</td>
        `;
        logTableBody.appendChild(newRow);
    });

    // Inicializa com a seção "Condóminos" visível
    showContent('condominio');
});
