/**
 * Created by ramoncuni on 21/10/15.
 */

var amplereal;
var ample;
var altreal;
var alt;
var unitats;
var subtotal;
var resultat = 0;
var bandereta = true;


window.onload = function () {
    document.getElementById('calcula').onclick = calcula;
}

function calcula() {
    //recollim els valors del formulari (quantitat i mides)
    unitats = parseInt(document.getElementById('quantitat').value);
    amplereal = parseInt(document.getElementById('ample').value);
    ample = toMultiploDe6(amplereal);
    altreal = parseInt(document.getElementById('alt').value);
    alt = toMultiploDe6(altreal);
    console.log(unitats);
    console.log(ample);
    console.log(alt);

    var preu = montaPreu();

    //si la superfície del vidre es major de mig m2 calculam el preu
    if (parseFloat(ample * alt / 10000) > 0.5) {
        console.log((ample * alt) / 10000);
        resultat = parseFloat((ample * alt * preu) / 10000);
        //si la superfície del vidre no arriba a mig m2 en cobram mig
    } else {
        console.log(preu);
        console.log(preu / 2);
        resultat = parseFloat(preu / 2);
    }
    subtotal = resultat * unitats;
    montaResultat();
}

function montaResultat() {
    var div = document.getElementById('table');
    if (bandereta == true) {
        div.innerHTML += '<div class="row"><div class="th">Unitats</div><div class="th">Ample</div><div class="th">Alt</div><div class="th">Preu Unitari</div><div class="th">Subtotal</div></div>';
        bandereta = false;
    }
    div.innerHTML += '<div class="row"><div class="td">' + unitats + '</div><div class="td">' + amplereal + '</div><div class="td">' + altreal + '</div><div class="td">' + resultat + '</div><div class="td">' + subtotal + '</div></div>';
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

//montam el preu depenent del vidre triat al formulari
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