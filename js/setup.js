'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_2NDNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var nameGen, coatColorGen, eyesColorGen;
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var wizards = [];
var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var generateData = function () {
  nameGen = WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_2NDNAMES[Math.floor(Math.random() * WIZARD_2NDNAMES.length)];
  coatColorGen = COATS[Math.floor(Math.random() * COATS.length)];
  eyesColorGen = EYES[Math.floor(Math.random() * EYES.length)];
  return nameGen, coatColorGen, eyesColorGen;
}

var generateObjects = function () {
  for (var i = 0; i < 4; i++) {
    generateData ();
    var newWizard = {
      name: nameGen,
      coatColor: coatColorGen,
      eyesColor: eyesColorGen
    };
    wizards.push(newWizard);
  }
  return wizards;
}

generateObjects ();

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
  
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');