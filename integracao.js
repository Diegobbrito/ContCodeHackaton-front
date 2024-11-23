// Selecionar o formulário
// const stockForm = document.getElementById('stockForm');
const btnSubmit = document.querySelector('.btn__submit');
// Ouvir o evento de envio do formulário
btnSubmit.addEventListener('click', async (event) => {
//   event.preventDefault(); // Impedir o comportamento padrão do formulário (reload da página)

  // Obter os dados do formulário
  const code = document.querySelector('.input__code').value;
  const quantity = document.querySelector('.input__quantity').value;

  // Construir o payload para o backend
  const payload = {
    productName: code,
    quantity: parseInt(quantity),
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
  } catch (error) {
    console.error(error);
    const h2 = document.querySelector('.txt');
    h2.textContent = `Error: ${error.message}`;
  }
});