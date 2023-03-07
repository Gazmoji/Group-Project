const body = document.getElementById("body");
const body2 = document.getElementById("body2");
const card = document.getElementById("card");
const cardBody = document.getElementById("cardBody");
const cardtitle = document.getElementById("card-title");
const ul = document.getElementById("ul");
const additional = document.getElementById("additional");
const additional2 = document.getElementById("additional2");
const additional3 = document.getElementById("additional3");
const abilityList = document.getElementById("abilityList");
let characters = []

function display() {
  fetch("https://overfast-api.tekrop.fr/heroes")
    .then((response) => response.json())
    .then((information) => {
      characters = information
      // information.map((hero_key) => additionalInfo(hero_key))

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
      <div>
        <h2>Name: ${information.name}</h2>
        </div>
        <p>About: ${information.description}</p>
        <img src=${information.portrait} id='port'>
        <div>
        <h3 id='role'>Role: ${information.role}</h3>
        </div>
        <p>Location: ${information.location}</p>
        <p id='origin'>Origin Story: ${information.story.summary}</p>
</li>`;
      let abilities = information.abilities;
      const heroAbilities = abilities.map(function (abil) {
        return `<div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div class="card">
            <img src=${abil.icon} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${abil.name}</h5>
              <p class="card-text">${abil.description}</p>
            </div>
          </div>
        </div>`;
      });
      additional.innerHTML = heroList;
      abilityList.innerHTML = heroAbilities.join("");
    });
}

function displayLeague() {
  fetch(
    "http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion.json"
  )
    .then((response) => response.json())
    .then((information) => {
      let champData = information.data;
      let champList = "";
      for (let champ in champData) {
        champList += `<a onclick='additionalLeagueInfo("${champData[champ].id}")'>
        <div id="card">
        <img src="http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${champData[champ].image.full}" class = "card" id="card-img-top" alt="...">
    <div id="card-body">
      <h5 id="card-title">${champData[champ].name}</h5>
      </a>
    </div>
  </div>`;
      }
      body2.innerHTML = champList;
      console.log(champData);
    });
}

function counterColors(heroName) {
  const listOfAllCharactersHeroCanBeat = characterComparisons[heroName]

  fetch("https://overfast-api.tekrop.fr/heroes")
    .then((response) => response.json())
    .then((information) => {
      characters = information
      const heroList = information.map(function (stuff) {
        return `
      <a id="cardButton" onclick='additionalInfo("${stuff.key}")'>
      <div class = ${listOfAllCharactersHeroCanBeat.includes(stuff.key) ? "red-border" : "default-background"}>
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

displayLeague();

function additionalLeagueInfo(champName) {
  fetch(
    `http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion/${champName}.json`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((information) => {
      console.log(information);
      let champData = information.data;
      console.log(champData);
      let leagueList = "";
      console.log(abilityList);

      for (let champ in champData) {
        leagueList += `<li>
      
      <h2>Champion: ${champData[champ].name}</h2>
      
      <p id='blurb'>About: ${champData[champ].blurb}</p>
      <img src="http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${champData[champ].image.full}" id='port'>
      <p id='origin'>Lore: ${champData[champ].lore}</p>
      <p id='origin'>Resource Type: ${champData[champ].partype}</p>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${champData[champ].passive.name}</h5>
              <p class="card-text" id='passiveDesc'>${champData[champ].passive.description}</p>
              </div>
              </div>
              </div>
              </div>
      </li>`;

        let leagueAbilities = champData[champ].spells.map(function (abil) {
          return `<div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
          <div class="card">
            <img src='http://ddragon.leagueoflegends.com/cdn/13.4.1/img/spell/${abil.image.full}' class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${abil.name}</h5>
              <p class="card-text" id='descriptionText'>${abil.description}</p>
            </div>
          </div>
        </div>`;
        });

        additional2.innerHTML = leagueList;
        additional3.innerHTML = leagueAbilities.join("");
      }
    });
}
