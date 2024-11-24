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

                    <strong>CNPJ:</strong>
                    <span id="company-document-${stock.code}">${stock.companyDocument}</span>
                    <i onclick="copyText('company-document-${stock.code}')" class="fas fa-copy text-blue-500 cursor-pointer hover:text-blue-700 ml-2"></i>
                </div>
                <div class="text-gray-700">
                    <strong>Descrição:</strong>
                    <span id="company-description-${stock.code}">${stock.description}</span>
                    <i onclick="copyText('company-description-${stock.code}')" class="fas fa-copy text-blue-500 cursor-pointer hover:text-blue-700 ml-2"></i>
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

// Função para copiar o texto
function copyText(elementId) {
    var textElement = document.getElementById(elementId);
    var range = document.createRange();
    range.selectNode(textElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges(); // Clear the selection
    alert('Texto copiado para a área de transferência!');
}
