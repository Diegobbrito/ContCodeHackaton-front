document.addEventListener('DOMContentLoaded', () => {
    // Variável para armazenar as ações
    let stockActions = [];

    // Selecionando os botões e a área de lista de ações
    const btnAddAction = document.querySelector('.btn__add--action');
    const btnSubmit = document.querySelector('.btn__submit');
    const actionsList = document.querySelector('#actions-list'); // Área onde as ações serão exibidas

    // Função para adicionar um novo item de ação
    if (btnAddAction) {
        btnAddAction.addEventListener("click", () => {
            // Obter valores dos campos de entrada
            const codeInput = document.querySelector('.input__code');
            const valueInput = document.querySelector('.input__value'); // Alterado para 'value'
            const quantityInput = document.querySelector('.input__quantity');

            // Validar se os campos estão preenchidos
            if (!codeInput.value || !valueInput.value || !quantityInput.value) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // Criar um objeto de ação com os dados fornecidos
            const action = {
                code: codeInput.value.toUpperCase(),
                value: parseFloat(valueInput.value), // Alterado para 'value'
                quantity: parseInt(quantityInput.value),
            };

            // Adicionar a ação ao array stockActions
            stockActions.push(action);

            // Criar um elemento para exibir a ação na lista
            const actionItem = document.createElement('div');
            actionItem.classList.add('action-item', 'flex', 'items-center', 'justify-between', 'border', 'border-gray-300', 'rounded-lg', 'p-4', 'mb-4');
            actionItem.innerHTML = `
                <div>
                    <strong>Ativo:</strong> ${action.code} <br>
                    <strong>Valor:</strong> R$ ${action.value.toFixed(2)} <br> <!-- Alterado de 'Preço Médio' para 'Valor' -->
                    <strong>Quantidade:</strong> ${action.quantity}
                </div>
                <button type="button" class="btn-remove-action text-red-500 hover:text-red-700">Remover</button>
            `;

            // Adicionar o item à lista de ações
            actionsList.appendChild(actionItem);

            // Limpar os campos de entrada
            codeInput.value = '';
            valueInput.value = ''; // Limpar o campo de 'Valor'
            quantityInput.value = '';

            // Adicionar funcionalidade para remover a ação
            const removeButton = actionItem.querySelector('.btn-remove-action');
            removeButton.addEventListener('click', () => {
                actionsList.removeChild(actionItem); // Remover o item da lista
                stockActions = stockActions.filter(item => item.code !== action.code); // Remover a ação do array stockActions
            });
        });
    }

    // Função para enviar as ações
    if (btnSubmit) {
        btnSubmit.addEventListener('click', async () => {
            if (stockActions.length === 0) {
                alert("Adicione pelo menos uma ação antes de enviar.");
                return;
            }

            const payload = {
                stocks: stockActions, // Enviar todas as ações da lista
            };

            try {
                const response = await fetch('https://stock-route-brianzav-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/v1/stock', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar os dados.');
                }

                const data = await response.json();

                localStorage.setItem('apiResponse', JSON.stringify(data));

                window.open('result.html', '_blank')

            } catch (error) {
                console.error(error);
                const h2 = document.querySelector('.txt');
                if (h2) {
                    h2.textContent = `Error: ${error.message}`;
                }
            }
        });
    }
});
