// Lista para armazenar as ações
let stockActions = [];

// Selecionar o botão de adicionar ação
const btnAddAction = document.querySelector('.btn__add--action');
const btnSubmit = document.querySelector('.btn__submit');

// Função para adicionar uma ação à lista
btnAddAction.addEventListener('click', () => {
  // Obter os dados do formulário
  const code = document.querySelector('.input__code').value; // Código do ativo
  const quantity = document.querySelector('.input__quantity').value; // Quantidade
  const value = document.querySelector('.input__average--price').value; // Valor

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

  // Limpar os campos de entrada
  document.querySelector('.input__code').value = '';
  document.querySelector('.input__quantity').value = '';
  document.querySelector('.input__average--price').value = '';

  // Mostrar as ações na interface (opcional, para debug)
  console.log(stockActions);
});

// Enviar todas as ações ao backend
btnSubmit.addEventListener('click', async () => {
  // Verificar se existem ações na lista
  if (stockActions.length === 0) {
    alert("Adicione pelo menos uma ação antes de enviar.");
    return;
  }

  // Construir o payload para o backend
  const payload = {
    stocks: stockActions, // Enviar todas as ações da lista
  };

  try {
    // Enviar a requisição para o backend
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

    // Receber a resposta do backend
    const data = await response.json();

    // Mostrar a resposta no frontend
    const h2 = document.querySelector('.txt');
    h2.textContent = `Success: ${JSON.stringify(data)}`;
    console.log(data);
  } catch (error) {
    console.error(error);
    const h2 = document.querySelector('.txt');
    h2.textContent = `Error: ${error.message}`;
  }
});
