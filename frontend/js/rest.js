document.addEventListener('DOMContentLoaded', function() {
    // Função genérica para carregar dados de um endpoint e preencher uma tabela
    function carregarDados(endpoint, tableId) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById(tableId);
                tableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.descricao}</td>
                        <td>${item.valor}</td>
                        <td>${item.data}</td>
                        <td>
                            <button class="edit-btn" data-id="${item.id}">Editar</button>
                            <button class="delete-btn" data-id="${item.id}">Excluir</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error(`Erro ao carregar dados de ${endpoint}:`, error));
    }

    // Carregar balancetes
    carregarDados('http://localhost/CondoMax/balancete', 'balanceteTableBody');

    // Carregar despesas
    carregarDados('http://localhost/CondoMax/despesa', 'despesaTableBody');

    // Carregar pagamentos
    carregarDados('http://localhost/CondoMax/pagamento', 'pagamentoTableBody');

    // Carregar empresas de serviço
    carregarDados('http://localhost/CondoMax/empresa_servico', 'empresaServicoTableBody');

    // Exemplo de evento de clique para editar/excluir (pode adaptar conforme sua necessidade)
    document.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const itemId = target.getAttribute('data-id');
            // Aqui você pode implementar a lógica para editar
            console.log(`Editar item com ID ${itemId}`);
        } else if (target.classList.contains('delete-btn')) {
            const itemId = target.getAttribute('data-id');
            // Aqui você pode implementar a lógica para excluir
            console.log(`Excluir item com ID ${itemId}`);
        }
    });
});
