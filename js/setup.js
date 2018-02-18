'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_2NDNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];

var userDialog = document.querySelector('.setup');

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


// События

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupClose.addEventListener('click', function() {
  closePopup();
});

// ВСЯ НЕПОНЯТНАЯ ХЕРЬ ТУТ
//***НАЧАЛО***

if (setup.classList.contains('hidden')) {
  setupOpen.addEventListener('focus', function(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openPopup();
      }
  });
}

// ***КОНЕЦ НЕПОНЯТНОЙ ХРЕНИ***

var setupWizard = document.querySelector('.setup-wizard');
var setupCoat = document.querySelector('.wizard-coat');

var switchColor = function() {
  
};

var changeCoatColor = function(currentColor) {
  currentColor = COATS.indexOf(setupCoat.style.fill);
  if (currentColor < (COATS.length - 1)) {
    currentColor = currentColor + 1;
  } else {
    currentColor = 0;
  }
  setupCoat.style.fill = COATS[currentColor];
};

setupCoat.addEventListener('click', changeCoatColor);

var setupEyes = document.querySelector('.wizard-eyes');
var changeEyesColor = function(currentColor) {
  currentColor = EYES.indexOf(setupEyes.style.fill);
  if (currentColor < (EYES.length - 1)) {
    currentColor = currentColor + 1;
  } else {
    currentColor = 0;
  }
  setupEyes.style.fill = EYES[currentColor];
};

setupEyes.addEventListener('click', changeEyesColor);


var setupFireball = document.querySelector('.setup-fireball-wrap');
var changeFBColor = function(currentColor) {

  currentColor = FIREBALLS.indexOf(setupFireball.style.backgroundColor);

  if (FIREBALLS.indexOf(currentColor) < 0 || currentColor == null) {
    FIREBALLS.push(currentColor);
  } else {
    if (currentColor < (FIREBALLS.length - 1)) {
      currentColor = currentColor + 1;
    } else {
      currentColor = 0;
    }
  }
  
  setupFireball.style.backgroundColor = FIREBALLS[currentColor];
  console.log(setupFireball.style.backgroundColor);
};

setupFireball.addEventListener('click', changeFBColor);
