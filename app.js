const body = document.getElementById("body");
const card = document.getElementById("card");
const cardBody = document.getElementById("cardBody");
const cardtitle = document.getElementById("card-title");
const ul = document.getElementById("ul");
const additional = document.getElementById("additional");
let characters = []

function display() {
  fetch("https://overfast-api.tekrop.fr/heroes")
    .then((response) => response.json())
    .then((information) => {
      characters = information
     const heroList = information.map(function (stuff) {
        return `
      <a id="cardButton" onclick='additionalInfo("${stuff.key}")'>
      <div id="card">
      <img src="${stuff.portrait}" class = "card" id="card-img-top" alt="...">
      <div id="card-body">
        <h5 id="card-title">${stuff.name}</h5>
        <p id="card-text">${stuff.role}</p>
        </a>
      </div>
    </div>`;
      });
      body.innerHTML = heroList.join("");
    });
}
display();

function additionalInfo(heroName) {
  counterColors(heroName)
  fetch(`https://overfast-api.tekrop.fr/heroes/${heroName}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((information) => {
      const heroList = `<li>
        <b>Name: ${information.name}</b>
        <p>About: ${information.description}</p>
        <img src=${information.portrait}>
        <h2>Role: ${information.role}</h2>
        <p>Location: ${information.location}</p>
        <p>Origin Story: ${information.story.summary}</p>
</li>`;

      additional.innerHTML = heroList;
      console.log(heroList);
    });
}

function counterColors(heroName) {
  const listOfAllCharactersAnaCanBeat = characterComparisons["ana"]

  const counterList = characters.map(function (character) {
    return `
  <a id="cardButton" onclick='additionalInfo("${character.key}")'>
  <div id="card" class= 'card green' >
  <img src="${character.portrait}" class = "card" id="card-img-top" alt="...">
  <div id="card-body">
    <h5 id="card-title">${character.name}</h5>
    <p id="card-text">${character.role}</p>
    </a>
  </div>
</div>`;
  });
  console.log(counterList)
  body.innerHtml = counterList.join('')

  const listOfAllCharactersDvaCanBeat = characterComparisons["dva"]
  const listOfAllCharactersDoomfistCanBeat = characterComparisons["doomfist"]
  const listOfAllCharactersjunkerQueenCanBeat = characterComparisons["junker-queen"]
  const listOfAllCharactersOrisaCanBeat = characterComparisons["orisa"]
  const listOfAllCharactersReinhardtCanBeat = characterComparisons["reinhardt"]
  const listOfAllCharactersRoadhogCanBeat = characterComparisons["roadhog"]
  const listOfAllCharactersSigmaCanBeat = characterComparisons["sigma"]
  const listOfAllCharactersWinstonCanBeat = characterComparisons["winston"]
  const listOfAllCharactersWreckingBallCanBeat = characterComparisons["wrecking-ball"]
  const listOfAllCharactersZaryaCanBeat = characterComparisons["zarya"]
  const listOfAllCharactersAsheCanBeat = characterComparisons["ashe"]
  const listOfAllCharactersBastionCanBeat = characterComparisons["bastion"]
  const listOfAllCharactersCassidyCanBeat = characterComparisons["cassidy"]
  const listOfAllCharactersEchoCanBeat = characterComparisons["echo"]
  const listOfAllCharactersGenjiCanBeat = characterComparisons["genji"]
  const listOfAllCharactersHanzoCanBeat = characterComparisons["hanzo"]
  const listOfAllCharactersJunkratCanBeat = characterComparisons["junkrat"]
  const listOfAllCharactersMeiCanBeat = characterComparisons["mei"]
  const listOfAllCharactersPharahCanBeat = characterComparisons["pharah"]
  const listOfAllCharactersReaperCanBeat = characterComparisons["reaper"]
  const listOfAllCharactersSoujurnCanBeat = characterComparisons["soujurn"]
  const listOfAllCharactersSoldier76CanBeat = characterComparisons["soldier-76"]
  const listOfAllCharactersSombraCanBeat = characterComparisons["sombra"]
  const listOfAllCharactersSymmetraCanBeat = characterComparisons["symmetra"]
  const listOfAllCharactersTorbjornCanBeat = characterComparisons["torbjorn"]
  const listOfAllCharactersTracerCanBeat = characterComparisons["tracer"]
  const listOfAllCharactersWidowmakerCanBeat = characterComparisons["widowmaker"]
  const listOfAllCharactersBaptisteCanBeat = characterComparisons["baptiste"]
  const listOfAllCharactersBridgetteCanBeat = characterComparisons["bridgette"]
  const listOfAllCharactersKirikoCanBeat = characterComparisons["kiriko"]
  const listOfAllCharactersLucioCanBeat = characterComparisons["lucio"]
  const listOfAllCharactersMercyCanBeat = characterComparisons["mercy"]
  const listOfAllCharactersMoiraCanBeat = characterComparisons["moira"]
  const listOfAllCharactersZenyattaCanBeat = characterComparisons["zenyatta"]
  const listOfAllCharactersRamattraCanBeat = characterComparisons["ramattra"]
}


const characterComparisons = {
  'ana':['dva', 'winston', 'genji', 'sombra', 'brigitte', 'lucio'],
  'ashe': ['dva', 'ramattra', 'winston', 'wrecking-ball', 'genji', 'tracer', 'moira'],
  'baptiste': ['dva', 'doomfist', 'ramattra', 'roadhog', 'echo', 'genji', 'reaper', 'tracer',	'lucio'],
  'bastion': ['orisa', 'roadhog', 'zarya', 'hanzo', 'junkrat', 'sombra', 'ana', 'zenyatta'],
  'brigitte': ['doomfist', 'reinhardt', 'wrecking-ball', 'cassidy', 'junkrat', 'pharah', 'reaper', 'soldier-76', 'symmetra', 'torbjorn', 'ana', 'kiriko', 'mercy', 'moira'],
  'cassidy': ['dva', 'ramattra', 'winston', 'wrecking-ball', 'genji', 'sombra', 'tracer', 'widowmaker', 'ana', 'moira'],
  'dva': ['zarya', 'echo', 'genji', 'mei', 'reaper', 'sombra', 'symmetra', 'tracer','ana', 'baptiste', 'kiriko', 'moira', 'zenyatta'],
  'doomfist': ['dva', 'orisa', 'roadhog', 'ashe', 'cassidy', 'hanzo', 'mei', 'pharah', 'sojourn', 'soldier-76', 'sombra', 'symmetra', 'torbjorn', 'widowmaker', 'ana', 'kiriko', 'moira'],
  'echo': ['dva', 'ramattra', 'roadhog', 'winston', 'ashe', 'cassidy', 'sojourn', 'soldier-76', 'sombra', 'torbjorn', 'widowmaker', 'ana', 'baptiste', 'moira', 'zenyatta'],
  'genji': ['doomfist', 'winston', 'zarya',	'echo', 'mei', 'pharah', 'sojourn', 'sombra', 'symmetra', 'torbjorn', 'brigitte', 'moira'],
  'hanzo': ['dva', 'doomfist', 'ramattra', 'wrecking-ball', 'echo', 'genji', 'sombra', 'tracer',	'ana', 'baptiste', 'lucio'],
  'junker-queen': ['dva', 'reinhardt', 'roadhog', 'zarya',	'ashe', 'cassidy', 'hanzo', 'pharah', 'soldier-76', 'sombra', 'symmetra', 'widowmaker',	'ana', 'brigitte'],
  'junkrat': ['roadhog', 'sigma', 'zarya', 'ashe', 'cassidy', 'echo', 'pharah', 'sojourn', 'sombra', 'torbjorn',	'ana', 'baptiste', 'kiriko'],
  'kiriko': ['dva', 'orisa', 'reinhardt', 'winston', 'wrecking-ball', 'echo', 'genji', 'pharah', 'sombra', 'symmetra', 'tracer',	'brigitte', 'lucio'],
  'lucio': ['dva', 'doomfist', 'ramattra', 'roadhog', 'winston',	'echo', 'genji', 'junkrat', 'mei', 'pharah', 'reaper', 'sombra', 'symmetra', 'torbjorn',	'ana', 'brigitte', 'mercy', 'zenyatta'], 
  'mei': ['junker-queen', 'orisa',	'ashe', 'cassidy', 'echo', 'junkrat', 'pharah', 'reaper', 'sojourn', 'soldier-76', 'symmetra', 'tracer', 'widowmaker',	'ana', 'kiriko', 'zenyatta'],
  'mercy': ['dva', 'doomfist', 'ramattra', 'roadhog', 'winston', 'wrecking-ball', 'ashe', 'cassidy', 'echo', 'genji', 'pharah', 'sojourn', 'soldier-76', 'sombra', 'symmetra', 'torbjorn', 'tracer', 'widowmaker', 'ana', 'baptiste', 'moira', 'zenyatta'], 
  'moira': ['doomfist', 'junker-queen', 'orisa', 'reinhardt', 'roadhog', 'winston', 'wrecking-ball', 'ashe', 'cassidy', 'echo', 'junkrat', 'mei', 'reaper', 'soldier-76', 'sombra', 'symmetra', 'torbjorn', 'tracer',	'brigitte'], 
  'orisa': ['dva', 'junker-queen', 'roadhog', 'zarya',	'echo', 'genji', 'hanzo', 'junkrat', 'pharah', 'reaper', 'sombra', 'tracer',	'ana', 'baptiste', 'kiriko', 'lucio', 'zenyatta'],
  'pharah': ['dva', 'ramattra', 'roadhog',	'ashe', 'cassidy', 'echo', 'sojourn', 'soldier-76', 'sombra', 'torbjorn', 'widowmaker',	'ana', 'baptiste', 'moira'],
  'ramattra': ['dva', 'roadhog', 'wrecking-ball', 'bastion', 'genji', 'junkrat', 'mei', 'pharah', 'reaper', 'sombra', 'tracer',	'ana', 'zenyatta'],
  'reinhardt': ['doomfist', 'junker-queen', 'orisa', 'ramattra', 'roadhog', 'wrecking-ball', 'bastion', 'echo', 'genji', 'hanzo', 'junkrat', 'mei', 'pharah', 'reaper', 'sombra', 'symmetra', 'tracer',	'ana', 'kiriko', 'lucio', 'mercy', 'zenyatta'], 
  'reaper': ['dva', 'junker-queen', 'orisa', 'zarya',	'cassidy', 'echo', 'genji', 'hanzo', 'junkrat', 'pharah', 'sojourn', 'sombra', 'torbjorn',	'ana', 'kiriko', 'zenyatta'], 
  'roadhog': ['dva', 'junker-queen', 'sigma', 'zarya',	'echo', 'mei', 'pharah', 'sombra',	'ana', 'kiriko', 'zenyatta'], 
  'sigma': ['dva', 'doomfist', 'reinhardt', 'roadhog', 'winston', 'wrecking-ball', 'zarya',	'hanzo', 'junkrat', 'pharah', 'reaper', 'sojourn', 'soldier-76', 'sombra', 'symmetra', 'tracer',	'baptiste', 'brigitte', 'lucio'], 
  'sojourn': ['dva', 'doomfist', 'orisa', 'zarya',	'genji', 'sombra', 'tracer',	'kiriko', 'moira'], 
  'soldier-76': ['dva', 'doomfist', 'ramattra', 'roadhog', 'zarya',	'genji', 'sombra', 'tracer',	'ana', 'baptiste', 'kiriko', 'moira'], 
  'sombra': ['zarya',	'cassidy', 'junkrat', 'mei', 'symmetra', 'torbjorn', 'widowmaker',	'baptiste', 'brigitte'], 
  'symmetra': ['dva', 'winston',	'ashe', 'cassidy', 'echo', 'mei', 'pharah', 'reaper', 'widowmaker',	'ana', 'baptiste', 'kiriko', 'moira', 'zenyatta'], 
  'torbjorn': ['dva', 'junker-queen', 'orisa', 'ramattra', 'roadhog', 'sigma', 'zarya',	'ashe', 'cassidy', 'hanzo', 'junkrat', 'mei', 'sojourn', 'soldier-76', 'widowmaker',	'ana', 'baptiste', 'kiriko', 'zenyatta'], 
  'widowmaker': ['dva', 'winston', 'wrecking-ball', 'ashe', 'genji', 'sombra', 'tracer', 'widowmaker',	'ana', 'baptiste', 'kiriko', 'zenyatta'], 
  'winston': ['dva', 'junker-queen', 'orisa', 'roadhog',	'cassidy', 'hanzo', 'junkrat', 'mei', 'pharah', 'reaper', 'sojourn', 'sombra', 'zenyatta'], 
  'wrecking-ball': ['doomfist', 'orisa', 'ramattra', 'roadhog',	'junkrat', 'mei', 'pharah', 'reaper', 'sombra', 'symmetra', 'tracer',	'ana', 'zenyatta'],
  'zarya': ['doomfist', 'sigma', 'ramattra', 'winston', 'wrecking-ball', 'ashe', 'cassidy', 'hanzo', 'mei', 'pharah', 'sojourn', 'soldier-76', 'symmetra', 'tracer',	'brigitte', 'lucio', 'moira'],
  'zenyatta': ['dva', 'doomfist', 'junker-queen', 'orisa', 'ramattra', 'reinhardt', 'roadhog', 'winston', 'wrecking-ball', 'zarya',	'echo', 'genji', 'pharah', 'sombra', 'tracer', 'widowmaker',	'brigitte', 'kiriko', 'lucio', 'moira'], 
}