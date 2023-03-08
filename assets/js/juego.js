'use strict';

/**
 * 2C = Dos de Corazones
 * 2D = Dos de Diamantes
 * 2T = Dos de Treboles
 * 2P = Des de Picas
 * A = 11 o 1
 * J, K, Q = 10
 * Jugada Perfecta = A + J,K,Q
 */

// '2' + 5 = '25'
// '2' * 1 = 2 + 5 = 7

let barajas = [];
const tipos = ['C', 'D', 'T', 'P'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputador = 0;

// Referencia al HTMl
const botonJuegoNuevo = document.querySelector('#btnNuevoJuego');
const botonPedirCarta = document.querySelector('#btnPedirCarta');
const botonDetener = document.querySelector('#btnDetener');

const puntosHtml = document.querySelectorAll('small');
const cartaJugador = document.querySelector('#carta-jugador');
const cartaComputador = document.querySelector('#carta-computador');

const crearBarajas = () => {
  for (let i = 2; i <= 10; i++ ) {
    for (const tipo of tipos) {
      barajas.push(i + tipo); // [2C, 2D, 2T, 2P, ... ]
    }
  }

  for (const especial of especiales) {
    for (const tipo of tipos) {
      barajas.push(especial + tipo);
    }
  }

  barajas = _.shuffle(barajas);
  console.log(barajas);
}


const pedirCarta = () => {
  if(barajas.length == 0) {
    throw 'No hay cartas en la baraja';
  }

  let baraja = barajas.pop();

  return baraja;
}

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  if(isNaN(valor)) return (valor === 'A') ? 11 : 10;

  return valor * 1;
}

const crearCarta = (carta) => {
  const imagenCarta = document.createElement('img');
  imagenCarta.classList.add('carta');
  imagenCarta.src = `assets/cartas/${carta}.png`;
  return imagenCarta;
};

const turnoComputador = () => {
  do {
  const carta = pedirCarta();

  puntosComputador += valorCarta(carta);
  puntosHtml[1].innerText = puntosComputador;

  cartaComputador.append(crearCarta(carta));

  if(puntosJugador > 21) break;
  } while( (puntosComputador < puntosJugador) && (puntosJugador <= 21) );

  setTimeout(() => {
    if(puntosJugador == puntosComputador){
      alert('Nadie gana, tablas!!');
    } else if(puntosHtml > 21){
      alert('Computador gana');
    } else if(puntosComputador > 21){
      alert('Jugador gana!!');
    }
  }, 300);
};

/** Eventos de botonera **/
botonJuegoNuevo.addEventListener('click', () => {
  barajas = [];

  botonPedirCarta.disabled = false;
  botonDetener.disabled = false;

  puntosHtml[0].innerText = 0;
  puntosHtml[1].innerText = 0;

  puntosJugador = 0;
  puntosComputador = 0;

  cartaComputador.innerText = '';
  cartaJugador.innerText = '';

  crearBarajas();
});

botonPedirCarta.addEventListener('click', () => {
  const carta = pedirCarta();

  puntosJugador += valorCarta(carta);
  puntosHtml[0].innerText = puntosJugador;

  cartaJugador.append(crearCarta(carta));
  
  if(puntosJugador > 21){
    console.warn('Lo siento, perdiste!!')
  } else if (puntosJugador == 21){
    console.log('21 genial.')
  }
  // console.log({carta});
  // console.log({ 'valor': valorCarta(carta) });
  console.log(barajas);
});

botonDetener.addEventListener('click', () => {
  turnoComputador();
  botonPedirCarta.disabled = true;
  botonDetener.disabled = true;
});