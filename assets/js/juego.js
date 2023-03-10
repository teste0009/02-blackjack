const miModulo = (() => {

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
  
  let barajas = [],
      puntosJugadores = [];
  
  const tipos = ['C', 'D', 'T', 'P'],
        especiales = ['A', 'J', 'Q', 'K'];
  
  // Referencia al HTMl
  const botonJuegoNuevo = document.querySelector('#btnNuevoJuego'),
        botonPedirCarta = document.querySelector('#btnPedirCarta'),
        botonDetener = document.querySelector('#btnDetener'),
        puntosHtml = document.querySelectorAll('small');
  
  const cartasJugadores = document.querySelectorAll('.divCarta');
  
  const inicializarJuego = (numeroJugadores = 2) => {
    console.clear();
  
    botonPedirCarta.disabled = false;
    botonDetener.disabled = false;
  
    puntosJugadores = [];
    for (let i = 0; i < numeroJugadores; i++) {
      puntosJugadores.push(0);
    }
    puntosHtml.forEach(elem => elem.innerText = 0);
    cartasJugadores.forEach(elemento => elemento.innerText = '');
  
    crearBaraja();
  };
  
  const crearBaraja = () => {
    barajas = [];
  
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
    if(barajas.length == 0) 
      throw 'No hay cartas en la baraja';
  
    return barajas.pop();
  }
  
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
  
    if(isNaN(valor)) return (valor === 'A') ? 11 : 10;
  
    return valor * 1;
  }
  
  const crearCarta = (carta, turno) => {
    const imagenCarta = document.createElement('img');
    imagenCarta.classList.add('carta');
    imagenCarta.src = `assets/cartas/${carta}.png`;
    cartasJugadores[turno].append(imagenCarta);
  };
  
  const determinarGanador = () => {
    const [puntosJugador, puntosComputador] = puntosJugadores;
    setTimeout(() => {
      if(puntosJugador == puntosComputador){
        alert('Nadie gana, tablas!!');
      } else if(puntosJugador > 21 || (puntosComputador > puntosJugador) && (puntosComputador <= 21)){
        alert('Computador gana');
      } else if(puntosComputador > 21){
        alert('Jugador gana!!');
      }
    }, 300);
  };
  
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };
  
  const turnoComputador = (puntosJugador) => {
    let puntosComputador = 0;
  
    do {
      const carta = pedirCarta();
  
      puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, cartasJugadores.length - 1);
  
      // if(puntosJugador > 21) break;
    } while( (puntosComputador < puntosJugador) && (puntosJugador <= 21) );
  
    determinarGanador();
  };
  
  /** Eventos de botonera **/
  botonJuegoNuevo.addEventListener('click', () => {
    inicializarJuego();
  });
  
  botonPedirCarta.addEventListener('click', () => {
    const carta = pedirCarta();
  
    const puntosJugador = acumularPuntos(carta, 0);
  
    crearCarta(carta, 0);
    
    if(puntosJugador > 21){
      setTimeout(() => {
        turnoComputador(puntosJugador);
        botonPedirCarta.disabled = true;
        botonDetener.disabled = true;
      }, 300);
      console.warn('Lo siento, perdiste!!')
    } else if (puntosJugador == 21){
      console.log('21 genial.')
    }
    // console.log({carta});
    // console.log({ 'valor': valorCarta(carta) });
    console.log(barajas);
  });
  
  botonDetener.addEventListener('click', () => {
    turnoComputador( puntosJugadores[0] );
    botonPedirCarta.disabled = true;
    botonDetener.disabled = true;
  });

  return {
    juegoNuevo: inicializarJuego,
    valorCarta: valorCarta,
  };

})();
