const btnSubmit = document.querySelector(".btn__submit");
btnSubmit.addEventListener("click", ()=> {
    console.log('deu bom')
    window.open("result.html", "_blank");

    addClass();
    // addInAObject();
    // submitData();
    generateJSON();
})

const btnAdd = document.querySelector('.btn__add--action');

btnAdd.addEventListener("click", () => {
    const mainFields = document.querySelector(".main__fields");
    const main = document.querySelector(".main");
    const fieldsLi = document.querySelectorAll(".fields__li");
    
    // if(inputCode.value && inputPriceAverage.value && inputQtd != null){
        
    // }
    const newMainFields = mainFields.cloneNode(true);  // Clonando o elemento
    main.appendChild(newMainFields);  // Adicionando o novo elemento à página
});


// //icone copy

// // const iconeCopy = document.querySelector(".icone__copy");
// // iconeCopy.addEventListener('click', copy);

// // async function copy() {
// //     alert('Clique detectado!');

// //     // Obtendo o texto do elemento com a classe .txt
// //     let textForCopy = document.querySelector('.txt').textContent; // Para <p> ou <div>, use textContent

// //     try {
// //         // Tentando copiar o texto para a área de transferência
// //         await navigator.clipboard.writeText(textForCopy);
// //         alert('Texto copiado!');
// //     } catch (error) {
// //         console.error('Erro ao copiar:', error);
// //         alert('Falha ao copiar o texto!');
// //     }
// // }


// // const iconeCopy = document.querySelector(".icone__copy");
// // iconeCopy.addEventListener('click', copy);

// // async function copy() {
// //     alert('click');
// //     let textForCopy = document.querySelector('.txt').innerText;
// //     await navigator.clipboard.writeText(textForCopy);
// // }

// const inputCode = document.querySelector('.input__code');
// const inputPriceAverage= document.querySelector('.input__average--price');
// const inputQtd = document.querySelector('.input__quantity');

const addClass = () => {
    //tudo nodelist
    const allInputCode = document.querySelectorAll(".input__code");
    const allInputPrice = document.querySelectorAll(".input__average--price");
    const allInputQtd = document.querySelectorAll(".input__quantity");

    // const oneStock = {
    //     `ativo`
    // }

    //agora array
    const stocksCode = Array.from(allInputCode).map((elemento, i) => {
        elemento.classList.add(`ativo${i+1}`)
        return elemento
    }
); 
        

    const stocksPrice = Array.from(allInputPrice).map((elemento, i) => {
        elemento.classList.add(`ativo${i+1}`)
    }
); 

    const stocksQtd = Array.from(allInputQtd).map((elemento, i) => {
        elemento.classList.add(`ativo${i+1}`)}); 
        return stocksQtd;

}

//     const addInAObject = ()=>{
//         // console.log(stocksCode,stocksPrice,stocksQtd);

//     }

// const submitData = () => {
//     console.log(inputCode.value,inputPriceAverage.value,inputQtd.value);
//     const data = {
//         "stocks":[]
//     }
//     data += {
//         "stocks":
//         [
//            {
//             "code":inputCode.value,
//             "quantity":inputQtd.value,
//             "averagePrice":inputPriceAverage.value
//            },
//            {
//             "code":inputCode.value,
//             "quantity":inputQtd.value,
//             "averagePrice":inputPriceAverage.value
//            },
//            {
//             "code":inputCode.value,
//             "quantity":inputQtd.value,
//             "averagePrice":inputPriceAverage.value
//            }
//         ]
//     }
// }

const generateJSON = () => {
    // Selecionar os inputs das listas
    const allInputCode = document.querySelectorAll(".input__code");
    const allInputPrice = document.querySelectorAll(".input__average--price");
    const allInputQtd = document.querySelectorAll(".input__quantity");

    // Inicializar o array para armazenar os objetos "stocks"
    const stocks = [];

    // Iterar sobre os elementos das listas usando o índice
    allInputCode.forEach((inputCode, index) => {
        const inputQtd = allInputQtd[index];  // Correspondente na lista de quantidades
        const inputPriceAverage = allInputPrice[index];  // Correspondente na lista de preços

        // Adicionar o objeto ao array de "stocks"
        stocks.push({
            [`code${index + 1}`]: inputCode.value,
            [`quantity${index + 1}`]: inputQtd.value,
            [`averagePrice${index + 1}`]: inputPriceAverage.value,
        });
    });

    // Criar o JSON final
    const resultJSON = {
        stocks: stocks,
    };

    // Retornar ou exibir o JSON
    console.log(resultJSON);
    return resultJSON;
};

// Chamar a função




