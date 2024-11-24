document.addEventListener('DOMContentLoaded', () => {
    const actionsList = document.querySelector('#actions-list');
    const noActionsMessage = document.querySelector('#no-actions-message');

    // Recuperar a resposta da API do localStorage
    const apiResponse = JSON.parse(localStorage.getItem('apiResponse'));

    if (apiResponse && apiResponse.stocks && apiResponse.stocks.length > 0) {
        // Exibir as ações na página
        apiResponse.stocks.forEach(stock => {
            const actionItem = document.createElement('div');
            actionItem.classList.add(
                'action-item',
                'bg-white',
                'border',
                'border-gray-300',
                'rounded-lg',
                'shadow-lg',
                'p-6',
                'flex',
                'flex-col',
                'items-start',
                'space-y-4'
            );
            actionItem.innerHTML = `
                <div class="text-lg font-semibold text-blue-600">${stock.code}</div>
                <div class="text-gray-700">
                    <strong>CNPJ:</strong> ${stock.companyDocument}
                </div>
                <div class="text-gray-700">
                    <strong>Descrição:</strong> ${stock.description}
                </div>
            `;
            actionsList.appendChild(actionItem);
        });

        // Garantir que a mensagem de "nenhuma ação" não seja exibida
        noActionsMessage.classList.add('hidden');
    } else {
        // Se não houver ações, exibir a mensagem
        noActionsMessage.classList.remove('hidden');
    }
});
