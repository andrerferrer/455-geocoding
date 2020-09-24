// importar o plugin
import places from 'places.js';

// criar uma função
const initAutocomplete = () => {
  // encontrar um elemento
  const addressInput = document.getElementById('flat_address');

  // se encontrar esse elemento, rodar o código
  if (addressInput) {
    places({ container: addressInput });
  }
};

// exportar a função
export { initAutocomplete }
