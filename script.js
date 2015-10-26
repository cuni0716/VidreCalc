/**
 * Created by ramoncuni on 21/10/15.
 */

//Recarrec energetic (preu per kg.)
var recarrec = 0.328;
//Descompte per a les substitucions
var desconte = 0.35;
//Preu base a la línia 104!

//VARIABLES
var amplereal;
var ample;
var altreal;
var alt;
var unitats;
var subtotal;
var resultat = 0;
var bandereta = true;
var total = new Array();

window.onload = function () {
  console.log('Programa - ok');
  document.getElementById('calcula').onclick = calcula;
  document.getElementById('acaba').onclick = acaba;
  document.getElementById('reset').onclick = reset;
}

function calcula() {
  console.log('Afegeix - ok');
  var error = document.getElementById('error');
  if (document.getElementById('quantitat').value == 0) {
    console.log('quantitat');
    error.innerHTML = '<p>Has de seleccionar una quantitat</p>';
  } else if (document.getElementById('ample').value == 0) {
    error.innerHTML = '<p>Amplari incorrecte</p>';
  } else if (document.getElementById('alt').value == 0) {
    error.innerHTML = '<p>Altura incorrecte</p>';
  } else {
    //recollim els valors del formulari (quantitat i mides)
    unitats = parseInt(document.getElementById('quantitat').value);
    amplereal = parseFloat(document.getElementById('ample').value);
    //passam les mides al próxim multiple de 6
    ample = 1 * toMultiploDe6(amplereal);
    altreal = parseFloat(document.getElementById('alt').value);
    alt = 1 * toMultiploDe6(altreal);

    //anam a cercar el preu
    var preu = montaPreu();
    //si montaPreu te qualque problema tornarà 0, per tant comprovam que no sigui aixi
    if (preu != 0) {
      //si la superfície del vidre es major de mig m2 calculam el preu
      if (parseFloat(ample * alt / 10000) > 0.5) {
        //console.log((ample * alt) / 10000);
        resultat = parseFloat((ample * alt * preu) / 10000);
        //si la superfície del vidre no arriba a mig m2 en cobram mig
      } else {
        //console.log(preu);
        //console.log(preu / 2);
        resultat = parseFloat(preu / 2);
      }
      subtotal = resultat * unitats;
      total.push(subtotal);
      montaResultat(preu);
    }
  }
}

function montaResultat(preu) {
  if (preu !== 0) {
    var div = document.getElementById('table');
    if (bandereta == true) {
      div.innerHTML += '<div class="row"><div class="th">Unitats</div><div class="th">Ample</div><div class="th">Alt</div><div class="th">Preu Unitari</div><div class="th">Subtotal</div></div>';
      bandereta = false;
    }
    div.innerHTML += '<div class="row"><div class="td">' + unitats + '</div><div class="td">' + amplereal + '</div><div class="td">' + altreal + '</div><div class="td">' + resultat.toFixed(2) + '</div><div class="td">' + subtotal.toFixed(2) + '</div></div>';
    document.getElementById('error').innerHTML = '';
  }
}

function toMultiploDe6(num) {
  if (num % 6 === 0) {
    return parseInt(num);
  } else {
    while (num % 6 !== 0) {
      num++;
      //console.log(num);
    }
  }
  return parseInt(num);
}

//montam el preu depenent del vidre triat al formulari
function montaPreu() {
  var div = document.getElementById('cambase').value;
  //si tenim seleccionat un camara base calculam aquest!
  if (div !== "") {
    if (div === 'cb464') {
      return afegirRecarrec(13, 8);
    } else if (div === 'cb484') {
      return afegirRecarrec(13.3, 8);
    } else if (div === 'cb4104') {
      return afegirRecarrec(13.6, 8);
    } else if (div === 'cb4124') {
      return afegirRecarrec(13.9, 8);
    } else if (div === 'cb4154') {
      return afegirRecarrec(14.5, 8);
    } else if (div === 'cb4184') {
      return afegirRecarrec(14.8, 8);
    } else if (div === 'cb4204') {
      return afegirRecarrec(16, 8);
    } else if (div === 'cb4244') {
      return afegirRecarrec(16.5, 8);
    }
  } else {
    //si no hi ha seleccionat cap camara base anam als composts
    //cercam es preu de substitució des vidre exterior
    var vidreexterior = document.getElementById('exterior').value;
    var camara = document.getElementById('camara').value;
    var vidreinterior = document.getElementById('interior').value;
    if (vidreexterior === "" && camara === "" && vidreinterior === "") {
      document.getElementById('error').innerHTML = '<p>Has de triar algun tipus de vidre!</p>';
      return 0;
    }
    if (vidreexterior === "" || camara === "" || vidreinterior === "") {
      if (vidreexterior == "") {
        document.getElementById('error').innerHTML += '<p>Vidre exterior incorrecte</p>';
      }
      if (camara == "") {
        document.getElementById('error').innerHTML += '<p>Camara incorrecta</p>';
      }
      if (vidreinterior == "") {
        document.getElementById('error').innerHTML += '<p>Vidre interior incorrecte</p>';
      }
      return 0;
    } else {
      var preu = 13;
      var milimetros = 0;
      switch (vidreexterior) {
      case 'float5':
        preu += calculaDesconte(6.23);
        milimetros += 5;
        break;
      case 'float6':
        preu += calculaDesconte(8.5);
        milimetros += 6;
        break;
      case 'float8':
        preu += calculaDesconte(22.67);
        milimetros += 8;
        break;
      case 'float10':
        preu += calculaDesconte(39.67);
        milimetros += 10;
        break;
      case 'parsol4':
        preu += calculaDesconte(17.75);
        milimetros += 4;
        break;
      case 'carglas4':
        preu += calculaDesconte(8.32);
        milimetros += 4;
        break;
      case 'carglas6':
        preu += calculaDesconte(11.65);
        milimetros += 6;
        break;
      case '33inc':
        preu += calculaDesconte(25);
        milimetros += 6;
        break;
      case '44inc':
        preu += calculaDesconte(31);
        milimetros += 8;
        break;
      case '55inc':
        preu += calculaDesconte(38);
        milimetros += 10;
        break;
      case '66inc':
        preu += calculaDesconte(44);
        milimetros += 10;
        break;
      case '33mate':
        preu += calculaDesconte(41.15);
        milimetros += 6;
        break;
      case '44mate':
        preu += calculaDesconte(47.15);
        milimetros += 8;
        break;
      case '55mate':
        preu += calculaDesconte(54.15);
        milimetros += 10;
        break;
      case '66mate':
        preu += calculaDesconte(60.15);
        milimetros += 12;
        break;
      case '33sil':
        preu += calculaDesconte(41.3);
        milimetros += 6;
        break;
      case '44sil':
        preu += calculaDesconte(45.9);
        milimetros += 8;
        break;
      case '55sil':
        preu += calculaDesconte(49.74);
        milimetros += 10;
        break;
      case '66sil':
        preu += calculaDesconte(52.7);
        milimetros += 12;
        break;
      case '44stb120':
        preu += calculaDesconte(79.97);
        milimetros += 8;
        break;
      case '66stb120':
        preu += calculaDesconte(102);
        milimetros += 12;
        break;
      case '44st150':
        preu += calculaDesconte(76.16);
        milimetros += 8;
        break;
      case '66st150':
        preu += calculaDesconte(97.14);
        milimetros += 12;
        break;
      case '44st167':
        preu += calculaDesconte(76.16);
        milimetros += 8;
        break;
      case '66st167':
        preu += calculaDesconte(97.14);
        milimetros += 12;
        break;
      case 'ma4':
        preu += calculaDesconte(17);
        milimetros += 4;
        break;
      case 'ma5':
        preu += calculaDesconte(19.59);
        milimetros += 5;
        break;
      case 'novo4':
        preu += calculaDesconte(34.71);
        milimetros += 4;
        break;
      case 'novo5':
        preu += calculaDesconte(42.94);
        milimetros += 5;
        break;
      case 'clxt4':
        preu += calculaDesconte(53.21);
        milimetros += 4;
        break;
      case 'clxt6':
        preu += calculaDesconte(66.4);
        milimetros += 6;
        break;
      case 'clstb6':
        preu += calculaDesconte(61.03);
        milimetros += 6;
        break;
      case 'clst4':
        preu += calculaDesconte(50.9);
        milimetros += 4;
        break;
      case 'clst6':
        preu += calculaDesconte(53.94);
        milimetros += 6;
        break;
      case 'clst1674':
        preu += calculaDesconte(50.9);
        milimetros += 4;
        break;
      case 'cslt1676':
        preu += calculaDesconte(53.94);
        milimetros += 6;
        break;
      case 'sun4':
        preu += calculaDesconte(43.82);
        milimetros += 4;
        break;
      case 'sun6':
        preu += calculaDesconte(56.64);
        milimetros += 6;
        break;
      case 'ref6':
        preu += calculaDesconte(34.16);
        milimetros += 6;
        break;
      case 'clst6150':
        preu += calculaDesconte(73.49);
        milimetros += 6;
        break;
      case 'clst6120':
        preu += calculaDesconte(79.62);
        milimetros += 6;
        break;
      case 'stop5':
        preu += calculaDesconte(35.29);
        milimetros += 5;
        break;
      case 'plan4':
        preu += calculaDesconte(22.36);
        milimetros += 4;
        break;
      case 'plan6':
        preu += calculaDesconte(32.14);
        milimetros += 6;
        break;
      case 'planfn4':
        preu += calculaDesconte(11.9);
        milimetros += 4;
        break;
      case 'planfn6':
        preu += calculaDesconte(18.7);
        milimetros += 6;
        break;
      case 'kglas':
        preu += calculaDesconte(20.6);
        milimetros += 6;
        break;
      }
      //cercam es preu de substitució de sa camara
      switch (camara) {
      case 'cam8':
        preu += calculaDesconte(0.3);
        break;
      case 'cam10':
        preu += calculaDesconte(0.6);
        break;
      case 'cam12':
        preu += calculaDesconte(0.9);
        break;
      case 'cam15':
        preu += calculaDesconte(1.5);
        break;
      case 'cam18':
        preu += calculaDesconte(1.8);
        break;
      case 'cam20':
        preu += calculaDesconte(3);
        break;
      case 'cam24':
        preu += calculaDesconte(3.5);
        break;
      }
      //cercam es preu de substitució des vidre interior
      switch (vidreinterior) {
      case 'float5':
        preu += calculaDesconte(6.23);
        milimetros += 5;
        break;
      case 'float6':
        preu += calculaDesconte(8.5);
        milimetros += 6;
        break;
      case 'float8':
        preu += calculaDesconte(22.67);
        milimetros += 8;
        break;
      case 'float10':
        preu += calculaDesconte(39.67);
        milimetros += 10;
        break;
      case 'parsol4':
        preu += calculaDesconte(17.75);
        milimetros += 4;
        break;
      case 'carglas4':
        preu += calculaDesconte(8.32);
        milimetros += 4;
        break;
      case 'carglas6':
        preu += calculaDesconte(11.65);
        milimetros += 6;
        break;
      case '33inc':
        preu += calculaDesconte(25);
        milimetros += 6;
        break;
      case '44inc':
        preu += calculaDesconte(31);
        milimetros += 8;
        break;
      case '55inc':
        preu += calculaDesconte(38);
        milimetros += 10;
        break;
      case '66inc':
        preu += calculaDesconte(44);
        milimetros += 10;
        break;
      case '33mate':
        preu += calculaDesconte(41.15);
        milimetros += 6;
        break;
      case '44mate':
        preu += calculaDesconte(47.15);
        milimetros += 8;
        break;
      case '55mate':
        preu += calculaDesconte(54.15);
        milimetros += 10;
        break;
      case '66mate':
        preu += calculaDesconte(60.15);
        milimetros += 12;
        break;
      case '33sil':
        preu += calculaDesconte(41.3);
        milimetros += 6;
        break;
      case '44sil':
        preu += calculaDesconte(45.9);
        milimetros += 8;
        break;
      case '55sil':
        preu += calculaDesconte(49.74);
        milimetros += 10;
        break;
      case '66sil':
        preu += calculaDesconte(52.7);
        milimetros += 12;
        break;
      case '44stb120':
        preu += calculaDesconte(79.97);
        milimetros += 8;
        break;
      case '66stb120':
        preu += calculaDesconte(102);
        milimetros += 12;
        break;
      case '44st150':
        preu += calculaDesconte(76.16);
        milimetros += 8;
        break;
      case '66st150':
        preu += calculaDesconte(97.14);
        milimetros += 12;
        break;
      case '44st167':
        preu += calculaDesconte(76.16);
        milimetros += 8;
        break;
      case '66st167':
        preu += calculaDesconte(97.14);
        milimetros += 12;
        break;
      case 'ma4':
        preu += calculaDesconte(17);
        milimetros += 4;
        break;
      case 'ma5':
        preu += calculaDesconte(19.59);
        milimetros += 5;
        break;
      case 'novo4':
        preu += calculaDesconte(34.71);
        milimetros += 4;
        break;
      case 'novo5':
        preu += calculaDesconte(42.94);
        milimetros += 5;
        break;
      case 'clxt4':
        preu += calculaDesconte(53.21);
        milimetros += 4;
        break;
      case 'clxt6':
        preu += calculaDesconte(66.4);
        milimetros += 6;
        break;
      case 'clstb6':
        preu += calculaDesconte(61.03);
        milimetros += 6;
        break;
      case 'clst4':
        preu += calculaDesconte(50.9);
        milimetros += 4;
        break;
      case 'clst6':
        preu += calculaDesconte(53.94);
        milimetros += 6;
        break;
      case 'clst1674':
        preu += calculaDesconte(50.9);
        milimetros += 4;
        break;
      case 'cslt1676':
        preu += calculaDesconte(53.94);
        milimetros += 6;
        break;
      case 'sun4':
        preu += calculaDesconte(43.82);
        milimetros += 4;
        break;
      case 'sun6':
        preu += calculaDesconte(56.64);
        milimetros += 6;
        break;
      case 'ref6':
        preu += calculaDesconte(34.16);
        milimetros += 6;
        break;
      case 'clst6150':
        preu += calculaDesconte(73.49);
        milimetros += 6;
        break;
      case 'clst6120':
        preu += calculaDesconte(79.62);
        milimetros += 6;
        break;
      case 'stop5':
        preu += calculaDesconte(35.29);
        milimetros += 5;
        break;
      case 'plan4':
        preu += calculaDesconte(22.36);
        milimetros += 4;
        break;
      case 'plan6':
        preu += calculaDesconte(32.14);
        milimetros += 6;
        break;
      case 'planfn4':
        preu += calculaDesconte(11.9);
        milimetros += 4;
        break;
      case 'planfn6':
        preu += calculaDesconte(18.7);
        milimetros += 6;
        break;
      case 'kglas':
        preu += calculaDesconte(20.6);
        milimetros += 6;
        break;
      }
      return afegirRecarrec(preu, milimetros);
    }
  }
  document.getElementById('error').innerHTML = '<p>Has de triar algun tipus de vidre!</p>';
  return 0;
}

function reset() {
  document.getElementById('table').innerHTML = '';
  total = new Array();
  bandereta = true;
}

function calculaDesconte(preu) {
  return preu - (preu * desconte);
}

function afegirRecarrec(preuBase, mm) {
  return preuBase + (((ample * alt) / 10000) * mm) * recarrec;
}

function acaba() {
  totalPresu = 0;
  for (var calculTotal in total) {
    console.log(total);
    console.log(calculTotal);
    totalPresu += parseFloat(total);
  }
  document.getElementById('table').innerHTML += '<div class="row"><div class="td"> - </div><div class="td"> - </div><div class="td"> - </div><div class="td"> - </div><div class="td total">' + totalPresu.toFixed(2) + '</div></div>';
  bandereta = false;
}