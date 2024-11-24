const btnSubmit = document.querySelector(".btn__submit");
const btnAdd = document.querySelector('.btn__add--action');

// Armazenar as ações
let stockActions = [];

// Função para adicionar um novo campo de entrada para ações
btnAdd.addEventListener("click", () => {
    const mainFields = document.querySelector(".main__fields");
    const newMainFields = mainFields.cloneNode(true);  // Clonando o elemento de campos

    // Adicionar novos campos ao DOM
    const main = document.querySelector(".main");
    main.appendChild(newMainFields);
});

// Função para capturar os dados e enviar ao backend
btnSubmit.addEventListener("click", async () => {
    // Obter todos os campos de código, quantidade e preço
    const allInputCode = document.querySelectorAll(".input__code");
    const allInputPrice = document.querySelectorAll(".input__average--price");
    const allInputQtd = document.querySelectorAll(".input__quantity");

    // Verificar se todos os campos estão preenchidos
    if (allInputCode.length === 0 || allInputPrice.length === 0 || allInputQtd.length === 0) {
        alert("Por favor, adicione pelo menos uma ação e preencha todos os campos.");
        return;
    }

    // Criar o payload com os dados
    const stocks = Array.from(allInputCode).map((inputCode, index) => {
        const code = inputCode.value;
        const quantity = allInputQtd[index].value;
        const price = allInputPrice[index].value;

        return {
            code: code,
            quantity: parseInt(quantity),
            value: parseFloat(price),
        };
    });

    // Verificar se a lista de ações não está vazia
    if (stocks.length === 0) {
        alert("Nenhuma ação foi adicionada.");
        return;
    }

    // Criar o objeto de payload
    const payload = {
        stocks: stocks,
    };

    // Enviar a requisição POST
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
