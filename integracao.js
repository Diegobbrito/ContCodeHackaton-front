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

        // Exibir a resposta na nova aba
        openResponsePage(data);
    } catch (error) {
        console.error(error);
        const h2 = document.querySelector('.txt');
        h2.textContent = `Error: ${error.message}`;
    }
});

// Função para abrir a nova aba e mostrar a resposta da API
function openResponsePage(data) {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="/css/style.css">
            <title>Detalhes das Ações</title>
            <style>
                body {
                    font-family: 'Jost', sans-serif;
                    padding: 20px;
                    background-color: #f9fafb;
                }
                h2 {
                    color: #4A90E2;
                }
                .stock-item {
                    background: #fff;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 16px 0;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                }
                .stock-item p {
                    margin: 8px 0;
                    font-size: 16px;
                    color: #333;
                }
                .copy-button {
                    margin-top: 12px;
                    padding: 8px 16px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .copy-button:hover {
                    background-color: #45a049;
                }
                .stock-header {
                    font-size: 18px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <h2>Ações enviadas para o imposto de renda:</h2>
            <div id="stocks-list">
    `);

    // Loop para exibir cada ação
    data.stocks.forEach(stock => {
        newWindow.document.write(`
            <div class="stock-item">
                <div class="stock-header">Código: ${stock.code}</div>
                <p><strong>CNPJ:</strong> ${stock.companyDocument}</p>
                <p><strong>Descrição:</strong> ${stock.description}</p>
                <button class="copy-button" onclick="copyToClipboard('${stock.description}')">Copiar Descrição</button>
            </div>
        `);
    });

    newWindow.document.write(`
        </div>
        <script>
            function copyToClipboard(text) {
                navigator.clipboard.writeText(text)
                    .then(() => {
                        alert('Texto copiado para área de transferência!');
                    })
                    .catch(err => {
                        console.error('Erro ao copiar: ', err);
                    });
            }
        </script>
        </body>
        </html>
    `);
}
