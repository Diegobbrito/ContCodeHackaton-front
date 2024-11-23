const resultCode = document.querySelector('.summary__code');

const mock = fetch('data.json');
mock.then(response => {
  if (!response.ok) {
    throw new Error(`Erro ao carregar JSON: ${response.statusText}`);
  }
  return response.json();
}).then(data => resultCode.innerHTML = data.stocks[1].code);
