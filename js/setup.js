'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_2NDNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var genData = function (name, eye, coat, names, coats, eyes) {
  names = [];
  coats = [];
  eyes = [];

  while (names.length < 4) {
    name = WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_2NDNAMES[Math.floor(Math.random() * WIZARD_2NDNAMES.length)];
    coat = COATS[Math.floor(Math.random() * COATS.length)];
    eye = EYES[Math.floor(Math.random() * EYES.length)];
    if (names.indexOf(name) < 0) {
      names.push(name);
      coats.push(coat);
      eyes.push(eye);
    } 
  }
  return {names: names, eyes: eyes, coats: coats};
};

var genObjects = function (i, data, newBie) {
  data = genData();
  for (i = 0; i < 4; i++) {
    newBie = {
      name: data.names[i],
      coat: data.coats[i],
      eyes: data.eyes[i]
    };
    wizards.push(newBie);
  }
  return wizards;
};

genObjects();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
