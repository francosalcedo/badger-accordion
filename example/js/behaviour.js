'use strict';

// Importing accordion
import BadgerAccordion from 'dist/badger-accordion';

// Creating a new instance of the accordion usign DOM node
// ================================
const accordionDomNode = document.querySelector('.js-badger-accordion');

const accordion = new BadgerAccordion(accordionDomNode);

/* eslint-disable no-console */
console.log(accordion.getState([0]));
// accordion.open(0); // Opens the first accordion panel

// Seletcing element to mess with
const testEl = document.querySelector('.js-test-init-method');

// Adding some height to it and a background
testEl.style.height = '100vh';
testEl.style.background = 'red';

// You can either reinitalise or just recalcuate the height
// which I'd recommend for your use case.

setTimeout(function () {
	// accordion.init();
	accordion._setPanelHeight();

	console.log("timeout");
}, 3000);


// Creating a new instance of the accordion usign DOM node
// ================================
// const accordions = document.querySelectorAll('.js-badger-accordion');

// Array.from(accordions).forEach((accordion) => {
//     const ba = new BadgerAccordion(accordion);
//
//     /* eslint-disable no-console */
//     console.log(ba.getState([0]));
// });





// Creating a new instance of the accordion usign CSS selector
// ================================
// const accordionCssSelector = new BadgerAccordion('.js-badger-accordion');

// API Examples
/* eslint-disable no-console */
// console.log(accordionCssSelector.getState([0]));
// accordionCssSelector.open( 0 );
