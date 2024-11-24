let stockActions = []; // Lista para armazenar as ações

const btnAddAction = document.querySelector('.btn__add--action'); // Botão de adicionar
const btnSubmit = document.querySelector('.btn__submit'); // Botão de enviar

// Função para adicionar uma ação à lista
btnAddAction.addEventListener('click', () => {
    // Obter os dados do formulário
    const code = document.querySelector('.input__code').value; // Código do ativo
    const quantity = document.querySelector('.input__quantity').value; // Quantidade
    const value = document.querySelector('.input__average--price').value; // Preço médio

    // Validar os campos
    if (!code || !quantity || !value) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Criar o objeto da ação
    const stock = {
        code: code,
        quantity: parseInt(quantity),
        value: parseFloat(value),
    };

    // Adicionar a ação à lista
    stockActions.push(stock);

    // Criar um novo campo para exibir a ação
    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action-item', 'flex', 'justify-between', 'items-center', 'space-x-4', 'mt-4', 'p-4', 'border', 'border-gray-300', 'rounded-lg');

    // Criar os elementos do campo
    const actionContent = document.createElement('div');
    actionContent.classList.add('flex', 'space-x-4');

    const codeElement = document.createElement('span');
    codeElement.textContent = `Código: ${stock.code}`;

    const quantityElement = document.createElement('span');
    quantityElement.textContent = `Quantidade: ${stock.quantity}`;

    const valueElement = document.createElement('span');
    valueElement.textContent = `Preço Médio: R$ ${stock.value.toFixed(2)}`;

    actionContent.appendChild(codeElement);
    actionContent.appendChild(quantityElement);
    actionContent.appendChild(valueElement);

    // Criar o botão de remover
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.classList.add('text-red-500', 'hover:text-red-700', 'transition', 'duration-200', 'px-4', 'py-2', 'bg-transparent', 'border', 'border-red-500', 'rounded-lg');

    // Função para remover a ação
    removeBtn.addEventListener('click', () => {
        // Remover o item da lista de ações
        const index = stockActions.indexOf(stock);
        if (index > -1) {
            stockActions.splice(index, 1);
        }

        // Remover o item do DOM
        actionContainer.remove();
    });

    // Adicionar os elementos ao container
    actionContainer.appendChild(actionContent);
    actionContainer.appendChild(removeBtn);

    // Adicionar o novo item ao formulário
    const formContainer = document.querySelector('.form-container');
    formContainer.appendChild(actionContainer);

    // Limpar os campos de entrada
    document.querySelector('.input__code').value = '';
    document.querySelector('.input__quantity').value = '';
    document.querySelector('.input__average--price').value = '';
});

// Enviar as ações ao backend
btnSubmit.addEventListener('click', async () => {
    if (stockActions.length === 0) {
        alert("Adicione pelo menos uma ação antes de enviar.");
        return;
    }

    const payload = {
        stocks: stockActions, // Enviar todas as ações da lista
    };

    try {
        const response = await fetch('http://stock-route-brianzav-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/v1/stock', {
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
        const h2 = document.querySelector('.txt');
        h2.textContent = `Success: ${JSON.stringify(data)}`;
        console.log(data);
    } catch (error) {
        console.error(error);
        const h2 = document.querySelector('.txt');
        h2.textContent = `Error: ${error.message}`;
    }
});