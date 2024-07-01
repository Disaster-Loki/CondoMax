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

    // Função para mostrar conteúdo da seção selecionada
    function showContent(contentId) {
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
            showContent(contentToShow);

            sidebarItems.forEach(item => {
                item.classList.remove('selected');
            });

            this.classList.add('selected');
        });
    });

    // Exibe modal ao clicar em "Adicionar Condomínio"
    addCondominioBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Fecha modal ao clicar no botão fechar
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fecha modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Adiciona ou edita condomínio ao submeter o formulário
    formCondominio.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(formCondominio);
        const condominioData = {
            nome: formData.get('nome'),
            endereco: formData.get('endereco'),
            gerente_responsavel: formData.get('gerente_responsavel')
        };

        fetch('http://localhost/CondoMax/condominio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(condominioData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Condomínio adicionado com sucesso!');
            modal.style.display = 'none';
            location.reload(); // Recarrega a página após adicionar
        })
        .catch(error => console.error('Erro ao adicionar condomínio:', error));
    });

    // Carrega os condomínios ao carregar a página
    fetch('http://localhost/CondoMax/condominio')
    .then(response => response.json())
    .then(data => {
        data.forEach(condominio => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${condominio.id}</td>
                <td>${condominio.nome}</td>
                <td>${condominio.endereco}</td>
                <td>${condominio.gerente_responsavel}</td>
                <td>
                    <button onclick="editCondominio(${condominio.id})">Editar</button>
                    <button onclick="deleteCondominio(${condominio.id})">Excluir</button>
                </td>
            `;
            listaCondominios.appendChild(tr);
        });
    })
    .catch(error => console.error('Erro ao carregar condomínios:', error));
});

// Função para editar condomínio
function editCondominio(condominioId) {
    fetch(`http://localhost/CondoMax/condominio/${condominioId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('nome').value = data.nome;
        document.getElementById('endereco').value = data.endereco;
        document.getElementById('gerente_responsavel').value = data.gerente_responsavel;
        document.getElementById('submitCondominio').textContent = 'Salvar Alterações';
        document.getElementById('formCondominio').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(formCondominio);
            const condominioData = {
                nome: formData.get('nome'),
                endereco: formData.get('endereco'),
                gerente_responsavel: formData.get('gerente_responsavel')
            };

            fetch(`http://localhost/CondoMax/condominio/${condominioId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(condominioData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Condomínio atualizado com sucesso!');
                modal.style.display = 'none';
                location.reload(); // Recarrega a página após atualizar
            })
            .catch(error => console.error('Erro ao atualizar condomínio:', error));
        });
        modal.style.display = 'block';
    })
    .catch(error => console.error('Erro ao obter dados do condomínio para edição:', error));
}

// Função para excluir condomínio
function deleteCondominio(condominioId) {
    if (confirm('Tem certeza que deseja excluir este condomínio?')) {
        fetch(`http://localhost/CondoMax/condominio/${condominioId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Condomínio excluído com sucesso!');
            location.reload(); // Recarrega a página após excluir
        })
        .catch(error => console.error('Erro ao excluir condomínio:', error));
    }
}
