/**
 * Created by ramoncuni on 21/10/15.
 */

var ample;
var alt;
var unitats;
var total;


window.onload = function () {
  document.getElementById('calcula').onclick = calcula;
}

function calcula() {
  unitats = parseInt(document.getElementById('quantitat').value);
  ample = toMultiploDe6(parseInt(document.getElementById('ample').value));
  alt = toMultiploDe6(parseInt(document.getElementById('alt').value));
  console.log(ample);
  console.log(alt);
  var preu = montaPreu();
  if (parseFloat(ample * alt / 10000) > 0.5) {
    console.log((ample * alt) / 10000);
    var resultat = parseFloat((ample * alt * preu) / 10000);
  } else {
    console.log(preu);
    console.log(preu / 2);
    var resultat = parseFloat(preu / 2);
  }
  total = resultat * unitats;
  var div = document.getElementById('resultat');
  div.innerHTML += '<p>Mides de càlcul: ' + ample + ' x ' + alt + '</p>';
  div.innerHTML += '<p>' + resultat + '€/ud.</p>';
}

function toMultiploDe6(num) {
  if (num % 6 === 0) {
    return parseFloat(num);
  } else {
    while (num % 6 !== 0) {
      num++;
      //console.log(num);
    }
  }
  return parseFloat(num);
}

function montaPreu() {
  var preu = 13;
  var div = document.getElementById('cambase').value;
  if (div !== "") {
    if (div === 'cb464') {
      return 13;
    } else if (div === 'cb484') {
      return 13.3;
    } else if (div === 'cb4104') {
      return 13.6;
    } else if (div === 'cb4124') {
      return 13.9;
    } else if (div === 'cb4154') {
      return 14.5;
    } else if (div === 'cb4184') {
      return 14.8;
    } else if (div === 'cb4204') {
      return 16;
    } else if (div === 'cb4244') {
      return 16.5;
    }
  } else {
    //cercar es preu de substitució des vidre exterior
    var vidreexterior = document.getElementById('exterior').value;
    //cercar es preu de substitució de sa camara

    //cercam es preu de substitució des vidre interior
  }
  //aqui hauría de fer que comprovas si no han triat cap preu al formulari
}