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
                    <strong class="cnpj">CNPJ:</strong> ${stock.companyDocument}
                    <button class="btn__copy copy__cnpj" data-text="${stock.companyDocument}">
                        <img src="/imgs/copy.png" class="icone__copy" alt="icone copiar para área de transferência">
                    </button>
                </div>
                <div class="text-gray-700">
                    <strong>Descrição:</strong> ${stock.description}
                    <button class="btn__copy copy__description" data-text="${stock.description}">
                        <img src="/imgs/copy.png" class="icone__copy icone__copy--description" alt="icone copiar para área de transferência">
                    </button>
                </div>
            `;
            actionsList.appendChild(actionItem);
        });

        // Adicionar evento de clique para copiar texto
        actionsList.addEventListener('click', (event) => {
            const button = event.target.closest('.btn__copy');
            if (button) {
                const textToCopy = button.getAttribute('data-text');
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        alert('Texto copiado para a área de transferência!');
                    }).catch(err => {
                        console.error('Erro ao copiar texto: ', err);
                    });
                }
            }
        });

        // Garantir que a mensagem de "nenhuma ação" não seja exibida
        noActionsMessage.classList.add('hidden');
    } else {
        // Se não houver ações, exibir a mensagem
        noActionsMessage.classList.remove('hidden');
    }
});
