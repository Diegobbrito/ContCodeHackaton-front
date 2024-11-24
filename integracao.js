const btnSubmit = document.querySelector('.btn__submit');

// Enviar as ações ao backend
btnSubmit.addEventListener('click', async () => {
    if (stockActions.length === 0) {
        alert("Adicione pelo menos uma ação antes de enviar.");
        return;
    }

    const payload = {
        stocks: stockActions, // Enviar todas as ações da lista
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        console.log(apiUrl)
        const response = await fetch(`${apiUrl}/api/v1/stock`, {
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

        // Salvar a resposta da API no localStorage para ser acessada na página result.html
        localStorage.setItem('apiResponse', JSON.stringify(data));

        // Redirecionar para a página result.html
        window.location.href = 'result.html'; // Redireciona para a página de resultados

    } catch (error) {
        console.error(error);
        const h2 = document.querySelector('.txt');
        h2.textContent = `Error: ${error.message}`;
    }
});
