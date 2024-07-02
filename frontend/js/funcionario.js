document.addEventListener('DOMContentLoaded', function() {
    const listaFuncionarios = document.getElementById('listaFuncionarios');

    // Função para carregar funcionários
    function carregarFuncionarios() {
        fetch('http://localhost/CondoMax/funcionario')
            .then(response => response.json())
            .then(data => {
                listaFuncionarios.innerHTML = '';
                data.forEach(funcionario => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${funcionario.nome}</td>
                        <td>${funcionario.cargo}</td>
                        <td>${funcionario.email}</td>
                        <td>${funcionario.salario}</td>
                        <td>
                            <button class="edit-btn" data-id="${funcionario.id}">Editar</button>
                            <button class="delete-btn" data-id="${funcionario.id}">Excluir</button>
                        </td>
                    `;
                    listaFuncionarios.appendChild(tr);
                });
            })
            .catch(error => console.error('Erro ao carregar funcionários:', error));
    }

    // Carregar dados quando a página é carregada
    carregarFuncionarios();

    // Eventos para adicionar e editar funcionários
    const modalFuncionario = document.getElementById('modalFuncionario');
    const addFuncionarioBtn = document.getElementById('addFuncionarioBtn');
    const formFuncionario = document.getElementById('formFuncionario');
    const closeBtnFuncionario = document.getElementsByClassName('close')[1];

    addFuncionarioBtn.onclick = function() {
        document.getElementById('modalTitle').textContent = 'Adicionar Funcionário';
        formFuncionario.reset();
        modalFuncionario.style.display = 'block';
    };

    // Fechar modal ao clicar no botão de fechar
    closeBtnFuncionario.onclick = function() {
        modalFuncionario.style.display = 'none';
    };

    // Submeter o formulário de adição ou edição de funcionário
    formFuncionario.onsubmit = function(event) {
        event.preventDefault();
        const funcionarioId = document.getElementById('funcionarioId').value;
        const method = funcionarioId ? 'PUT' : 'POST';
        const url = funcionarioId ? `http://localhost/CondoMax/funcionario/${funcionarioId}` : 'http://localhost/CondoMax/funcionario';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: document.getElementById('nome').value,
                cargo: document.getElementById('cargo').value,
                email: document.getElementById('email').value,
                salario: document.getElementById('salario').value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar o funcionário');
            }
            //return response.json();
        })
        .then(data => {
            modalFuncionario.style.display = 'none';
            carregarFuncionarios(); // Atualiza a lista de funcionários após a operação
        })
        .catch(error => console.error('Erro ao salvar o funcionário:', error));
    };

    // Eventos de clique para editar e excluir funcionários
    listaFuncionarios.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const funcionarioId = target.getAttribute('data-id');
            fetch(`http://localhost/CondoMax/funcionario/${funcionarioId}`)
                .then(response => response.json())
                .then(funcionario => {
                    document.getElementById('funcionarioId').value = funcionario.id;
                    document.getElementById('nome').value = funcionario.nome;
                    document.getElementById('cargo').value = funcionario.cargo;
                    document.getElementById('email').value = funcionario.email;
                    document.getElementById('salario').value = funcionario.salario;
                    document.getElementById('modalTitle').textContent = 'Editar Funcionário';
                    modalFuncionario.style.display = 'block';
                })
                .catch(error => console.error('Erro ao obter o funcionário:', error));
        } else if (target.classList.contains('delete-btn')) {
            const confirmar = confirm('Tem certeza que deseja excluir este funcionário?');
            if (confirmar) {
                const funcionarioId = target.getAttribute('data-id');
                fetch(`http://localhost/CondoMax/funcionario/${funcionarioId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        target.closest('tr').remove();
                    } else {
                        throw new Error('Erro ao excluir o funcionário');
                    }
                })
                .catch(error => console.error('Erro ao excluir o funcionário:', error));
            }
        }
    });
});
