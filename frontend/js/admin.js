document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentSections = document.querySelectorAll('.content-section');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const contentToShow = item.getAttribute('data-content');
            contentSections.forEach(section => {
                section.classList.add('hidden');
                if (section.id === contentToShow) {
                    section.classList.remove('hidden');
                }
            });
            sidebarItems.forEach(sidebarItem => {
                sidebarItem.classList.remove('selected');
            });
            item.classList.add('selected');
        });
    });

    // Carregar dados quando a página é carregada
    carregarDados();

    // Eventos para adicionar e editar condomínios
    const modal = document.getElementById('modalCondominio');
    const addCondominioBtn = document.getElementById('addCondominioBtn');
    const formCondominio = document.getElementById('formCondominio');
    const closeBtn = document.getElementsByClassName('close')[0];

    addCondominioBtn.onclick = function() {
        document.getElementById('modalTitle').textContent = 'Adicionar Condomínio';
        formCondominio.reset();
        modal.style.display = 'block';
    };

    // Fechar modal ao clicar no botão de fechar
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Fechar modal ao clicar fora do modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Função para carregar dados de condomínios
    function carregarDados() {
        fetch('http://localhost/CondoMax/condominio')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })
        .then(data => {
            const listaCondominios = document.getElementById('listaCondominios');
            listaCondominios.innerHTML = '';
            data.forEach(condominio => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${condominio.id}</td>
                    <td>${condominio.nome}</td>
                    <td>${condominio.endereco}</td>
                    <td>${condominio.gerente_responsavel}</td>
                    <td>
                        <button class="edit-btn" data-id="${condominio.id}">Editar</button>
                        <button class="delete-btn" data-id="${condominio.id}">Excluir</button>
                    </td>
                `;
                listaCondominios.appendChild(tr);
            });

            // Adicionar eventos de clique para editar e excluir
            listaCondominios.addEventListener('click', event => {
                const target = event.target;
                if (target.classList.contains('edit-btn')) {
                    const condominioId = target.getAttribute('data-id');
                    fetch(`http://localhost/CondoMax/condominio/${condominioId}`)
                    .then(response => response.json())
                    .then(condominio => {
                        document.getElementById('condominioId').value = condominio.id;
                        document.getElementById('nome').value = condominio.nome;
                        document.getElementById('endereco').value = condominio.endereco;
                        document.getElementById('gerente_responsavel').value = condominio.gerente_responsavel;
                        document.getElementById('modalTitle').textContent = 'Editar Condomínio';
                        modal.style.display = 'block';
                    })
                    .catch(error => console.error('Error:', error));
                } else if (target.classList.contains('delete-btn')) {
                    const confirmar = confirm('Tem certeza que deseja excluir este condomínio?');
                    if (confirmar) {
                        const condominioId = target.getAttribute('data-id');
                        fetch(`http://localhost/CondoMax/condominio/${condominioId}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (response.ok) {
                                target.closest('tr').remove();
                            } else {
                                throw new Error('Erro ao excluir o condomínio');
                            }
                        })
                        .catch(error => console.error('Error:', error));
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Submeter o formulário de adição ou edição de condomínio
    formCondominio.onsubmit = function(event) {
        event.preventDefault();
        const condominioId = document.getElementById('condominioId').value;
        const method = condominioId ? 'PUT' : 'POST';
        const url = condominioId ? `http://localhost/CondoMax/condominio/${condominioId}` : 'http://localhost/CondoMax/condominio';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: document.getElementById('nome').value,
                endereco: document.getElementById('endereco').value,
                gerente_responsavel: document.getElementById('gerente_responsavel').value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar o condomínio');
            }
            return response.json();
        })
        .then(data => {
            modal.style.display = 'none';
            carregarDados();
        })
        .catch(error => console.error('Error:', error));
    };

    // Atualizar estilos da sidebar
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(sidebarItem => {
                sidebarItem.classList.remove('selected');
            });
            item.classList.add('selected');
        });
    });
});
