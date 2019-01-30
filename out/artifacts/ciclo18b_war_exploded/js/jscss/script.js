/* -------------
        NODOS
----------------
*/

var body = document.getElementById('body');
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var p3 = document.getElementById('p3');
var p4 = document.getElementById('p4');
var p5 = document.getElementById('p5');
var p6 = document.getElementById('p6');
var p7 = document.getElementById('p7');
var p8 = document.getElementById('p8');
var p9 = document.getElementById('p9');
var p10 = document.getElementById('p10');

/* ----------------
        FUNCIONES
-------------------
*/

function generarNumero(max, min) {
  return parseInt((Math.random() * (max - min + 1) + min));
}

function generarColor(opacidad) {
  /* Valores maximos y minimos de Red, Green y Blue al generar el numero */
  var MAXR = 25;
  var MAXG = 200;
  var MAXB = 170;

  var MINR = 20;
  var MING = 150;
  var MINB = 120;

  return 'rgba(' + generarNumero(MAXR, MINR) + ', ' + generarNumero(MAXG, MING) + ', '
  + generarNumero(MAXB, MINB) + ', ' + opacidad + ')';
}

function establecerColor(input, opacidad) {
  input.style.background = generarColor(opacidad);
}

/* ---------------------------
        EVENTOS A LA ESCUCHA
------------------------------
*/

body.addEventListener('mouseover',
  function () {
    window.setTimeout(establecerColor(body, .2), 1000);
  }, false);

window.addEventListener('load',
  function () {
    establecerColor(body, .2);
    establecerColor(p1, 1);
    establecerColor(p2, 1);
    establecerColor(p3, 1);
    establecerColor(p4, 1);
    establecerColor(p5, 1);
    establecerColor(p6, 1);
    establecerColor(p7, 1);
    establecerColor(p8, 1);
    establecerColor(p9, 1);
    establecerColor(p10, 1);
  }, false);

p1.addEventListener('mouseover',
  function () {
    establecerColor(p1, 1);
  }, false);

p2.addEventListener('mouseover',
  function () {
    establecerColor(p2, 1);
  }, false);

p3.addEventListener('mouseover',
  function () {
    establecerColor(p3, 1);
  }, false);

p4.addEventListener('mouseover',
  function () {
    establecerColor(p4, 1);
  }, false);

p5.addEventListener('mouseover',
  function () {
    establecerColor(p5, 1);
  }, false);

p6.addEventListener('mouseover',
  function () {
    establecerColor(p6, 1);
  }, false);

p7.addEventListener('mouseover',
  function () {
    establecerColor(p7, 1);
  }, false);

p8.addEventListener('mouseover',
  function () {
    establecerColor(p8, 1);
  }, false);

p9.addEventListener('mouseover',
  function () {
    establecerColor(p9, 1);
  }, false);

p10.addEventListener('mouseover',
  function () {
    establecerColor(p10, 1);
  }, false);
