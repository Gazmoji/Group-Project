const body = document.getElementById("body");
const body2 = document.getElementById("body2");
const selected = document.getElementById("selected");
const clear = document.getElementById("clear");
const card = document.getElementById("card");
const cardBody = document.getElementById("cardBody");
const cardtitle = document.getElementById("card-title");
const ul = document.getElementById("ul");
const additional = document.getElementById("additional");
const additional2 = document.getElementById("additional2");
const additional3 = document.getElementById("additional3");
const abilityList = document.getElementById("abilityList");
let characters = [];

function display() {
  fetch("https://overfast-api.tekrop.fr/heroes")
    .then((response) => response.json())
    .then((information) => {
      characters = information;
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
  counterColors(heroName);
  displayCurrent(heroName);
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

function displayCurrent(heroName) {
  fetch(`https://overfast-api.tekrop.fr/heroes/${heroName}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((information) => {
      const current = `
      <div id="currentSelected">${information.name} counters</div>
      <button id="clear">Clear</button>`;
      selected.innerHTML = current;
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
  const listOfAllCharactersHeroCanBeat = characterComparisons[heroName];

  fetch("https://overfast-api.tekrop.fr/heroes")
    .then((response) => response.json())
    .then((information) => {
      characters = information;
      const heroList = information.map(function (stuff) {
        return `
      <a id="cardButton" onclick='additionalInfo("${stuff.key}")'>
      <div class = ${
        listOfAllCharactersHeroCanBeat.includes(stuff.key)
          ? "red-border"
          : "default-background"
      }>
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
  ana: ["dva", "winston", "genji", "sombra", "brigitte", "lucio"],
  ashe: [
    "dva",
    "ramattra",
    "winston",
    "wrecking-ball",
    "genji",
    "tracer",
    "moira",
  ],
  baptiste: [
    "dva",
    "doomfist",
    "ramattra",
    "roadhog",
    "echo",
    "genji",
    "reaper",
    "tracer",
    "lucio",
  ],
  bastion: [
    "orisa",
    "roadhog",
    "zarya",
    "hanzo",
    "junkrat",
    "sombra",
    "ana",
    "zenyatta",
  ],
  brigitte: [
    "doomfist",
    "reinhardt",
    "wrecking-ball",
    "cassidy",
    "junkrat",
    "pharah",
    "reaper",
    "soldier-76",
    "symmetra",
    "torbjorn",
    "ana",
    "kiriko",
    "mercy",
    "moira",
  ],
  cassidy: [
    "dva",
    "ramattra",
    "winston",
    "wrecking-ball",
    "genji",
    "sombra",
    "tracer",
    "widowmaker",
    "ana",
    "moira",
  ],
  dva: [
    "zarya",
    "echo",
    "genji",
    "mei",
    "reaper",
    "sombra",
    "symmetra",
    "tracer",
    "ana",
    "baptiste",
    "kiriko",
    "moira",
    "zenyatta",
  ],
  doomfist: [
    "dva",
    "orisa",
    "roadhog",
    "ashe",
    "cassidy",
    "hanzo",
    "mei",
    "pharah",
    "sojourn",
    "soldier-76",
    "sombra",
    "symmetra",
    "torbjorn",
    "widowmaker",
    "ana",
    "kiriko",
    "moira",
  ],
  echo: [
    "dva",
    "ramattra",
    "roadhog",
    "winston",
    "ashe",
    "cassidy",
    "sojourn",
    "soldier-76",
    "sombra",
    "torbjorn",
    "widowmaker",
    "ana",
    "baptiste",
    "moira",
    "zenyatta",
  ],
  genji: [
    "doomfist",
    "winston",
    "zarya",
    "echo",
    "mei",
    "pharah",
    "sojourn",
    "sombra",
    "symmetra",
    "torbjorn",
    "brigitte",
    "moira",
  ],
  hanzo: [
    "dva",
    "doomfist",
    "ramattra",
    "wrecking-ball",
    "echo",
    "genji",
    "sombra",
    "tracer",
    "ana",
    "baptiste",
    "lucio",
  ],
  "junker-queen": [
    "dva",
    "reinhardt",
    "roadhog",
    "zarya",
    "ashe",
    "cassidy",
    "hanzo",
    "pharah",
    "soldier-76",
    "sombra",
    "symmetra",
    "widowmaker",
    "ana",
    "brigitte",
  ],
  junkrat: [
    "roadhog",
    "sigma",
    "zarya",
    "ashe",
    "cassidy",
    "echo",
    "pharah",
    "sojourn",
    "sombra",
    "torbjorn",
    "ana",
    "baptiste",
    "kiriko",
  ],
  kiriko: [
    "dva",
    "orisa",
    "reinhardt",
    "winston",
    "wrecking-ball",
    "echo",
    "genji",
    "pharah",
    "sombra",
    "symmetra",
    "tracer",
    "brigitte",
    "lucio",
  ],
  lucio: [
    "dva",
    "doomfist",
    "ramattra",
    "roadhog",
    "winston",
    "echo",
    "genji",
    "junkrat",
    "mei",
    "pharah",
    "reaper",
    "sombra",
    "symmetra",
    "torbjorn",
    "ana",
    "brigitte",
    "mercy",
    "zenyatta",
  ],
  mei: [
    "junker-queen",
    "orisa",
    "ashe",
    "cassidy",
    "echo",
    "junkrat",
    "pharah",
    "reaper",
    "sojourn",
    "soldier-76",
    "symmetra",
    "tracer",
    "widowmaker",
    "ana",
    "kiriko",
    "zenyatta",
  ],
  mercy: [
    "dva",
    "doomfist",
    "ramattra",
    "roadhog",
    "winston",
    "wrecking-ball",
    "ashe",
    "cassidy",
    "echo",
    "genji",
    "pharah",
    "sojourn",
    "soldier-76",
    "sombra",
    "symmetra",
    "torbjorn",
    "tracer",
    "widowmaker",
    "ana",
    "baptiste",
    "moira",
    "zenyatta",
  ],
  moira: [
    "doomfist",
    "junker-queen",
    "orisa",
    "reinhardt",
    "roadhog",
    "winston",
    "wrecking-ball",
    "ashe",
    "cassidy",
    "echo",
    "junkrat",
    "mei",
    "reaper",
    "soldier-76",
    "sombra",
    "symmetra",
    "torbjorn",
    "tracer",
    "brigitte",
  ],
  orisa: [
    "dva",
    "junker-queen",
    "roadhog",
    "zarya",
    "echo",
    "genji",
    "hanzo",
    "junkrat",
    "pharah",
    "reaper",
    "sombra",
    "tracer",
    "ana",
    "baptiste",
    "kiriko",
    "lucio",
    "zenyatta",
  ],
  pharah: [
    "dva",
    "ramattra",
    "roadhog",
    "ashe",
    "cassidy",
    "echo",
    "sojourn",
    "soldier-76",
    "sombra",
    "torbjorn",
    "widowmaker",
    "ana",
    "baptiste",
    "moira",
  ],
  ramattra: [
    "dva",
    "roadhog",
    "wrecking-ball",
    "bastion",
    "genji",
    "junkrat",
    "mei",
    "pharah",
    "reaper",
    "sombra",
    "tracer",
    "ana",
    "zenyatta",
  ],
  reinhardt: [
    "doomfist",
    "junker-queen",
    "orisa",
    "ramattra",
    "roadhog",
    "wrecking-ball",
    "bastion",
    "echo",
    "genji",
    "hanzo",
    "junkrat",
    "mei",
    "pharah",
    "reaper",
    "sombra",
    "symmetra",
    "tracer",
    "ana",
    "kiriko",
    "lucio",
    "mercy",
    "zenyatta",
  ],
  reaper: [
    "dva",
    "junker-queen",
    "orisa",
    "zarya",
    "cassidy",
    "echo",
    "genji",
    "hanzo",
    "junkrat",
    "pharah",
    "sojourn",
    "sombra",
    "torbjorn",
    "ana",
    "kiriko",
    "zenyatta",
  ],
  roadhog: [
    "dva",
    "junker-queen",
    "sigma",
    "zarya",
    "echo",
    "mei",
    "pharah",
    "sombra",
    "ana",
    "kiriko",
    "zenyatta",
  ],
  sigma: [
    "dva",
    "doomfist",
    "reinhardt",
    "roadhog",
    "winston",
    "wrecking-ball",
    "zarya",
    "hanzo",
    "junkrat",
    "pharah",
    "reaper",
    "sojourn",
    "soldier-76",
    "sombra",
    "symmetra",
    "tracer",
    "baptiste",
    "brigitte",
    "lucio",
  ],
  sojourn: [
    "dva",
    "doomfist",
    "orisa",
    "zarya",
    "genji",
    "sombra",
    "tracer",
    "kiriko",
    "moira",
  ],
  "soldier-76": [
    "dva",
    "doomfist",
    "ramattra",
    "roadhog",
    "zarya",
    "genji",
    "sombra",
    "tracer",
    "ana",
    "baptiste",
    "kiriko",
    "moira",
  ],
  sombra: [
    "zarya",
    "cassidy",
    "junkrat",
    "mei",
    "symmetra",
    "torbjorn",
    "widowmaker",
    "baptiste",
    "brigitte",
  ],
  symmetra: [
    "dva",
    "winston",
    "ashe",
    "cassidy",
    "echo",
    "mei",
    "pharah",
    "reaper",
    "widowmaker",
    "ana",
    "baptiste",
    "kiriko",
    "moira",
    "zenyatta",
  ],
  torbjorn: [
    "dva",
    "junker-queen",
    "orisa",
    "ramattra",
    "roadhog",
    "sigma",
    "zarya",
    "ashe",
    "cassidy",
    "hanzo",
    "junkrat",
    "mei",
    "sojourn",
    "soldier-76",
    "widowmaker",
    "ana",
    "baptiste",
    "kiriko",
    "zenyatta",
  ],
  widowmaker: [
    "dva",
    "winston",
    "wrecking-ball",
    "ashe",
    "genji",
    "sombra",
    "tracer",
    "widowmaker",
    "ana",
    "baptiste",
    "kiriko",
    "zenyatta",
  ],
  winston: [
    "dva",
    "junker-queen",
    "orisa",
    "roadhog",
    "cassidy",
    "hanzo",
    "junkrat",
    "mei",
    "pharah",
    "reaper",
    "sojourn",
    "sombra",
    "zenyatta",
  ],
  "wrecking-ball": [
    "doomfist",
    "orisa",
    "ramattra",
    "roadhog",
    "junkrat",
    "mei",
    "pharah",
    "reaper",
    "sombra",
    "symmetra",
    "tracer",
    "ana",
    "zenyatta",
  ],
  zarya: [
    "doomfist",
    "sigma",
    "ramattra",
    "winston",
    "wrecking-ball",
    "ashe",
    "cassidy",
    "hanzo",
    "mei",
    "pharah",
    "sojourn",
    "soldier-76",
    "symmetra",
    "tracer",
    "brigitte",
    "lucio",
    "moira",
  ],
  zenyatta: [
    "dva",
    "doomfist",
    "junker-queen",
    "orisa",
    "ramattra",
    "reinhardt",
    "roadhog",
    "winston",
    "wrecking-ball",
    "zarya",
    "echo",
    "genji",
    "pharah",
    "sombra",
    "tracer",
    "widowmaker",
    "brigitte",
    "kiriko",
    "lucio",
    "moira",
  ],
};

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

const leagueCharacterComparisons = {
  Aatrox: ["Poppy", "Pyke", "Kindred", "Zoe", "TwistedFate", "Jax"],
  Ahri: ["Swain", "Kassadin", "Illaoi", "Malzahar", "Talon", "Veigar"],
  Akali: ["Garen", "Malzahar", "Renekton", "LeeSin", "Darius", "Mordekaiser"],
  Akshan: ["Zed", "Fizz", "Syndra", "Pantheon", "Cassiopeia", "Yasuo"],
  Alistar: ["Morgana", "Janna", "Soraka", "Braum", "Thresh", "Zyra"],
  Amumu: ["Olaf", "Udyr", "Elise", "Lee Sin", "Shaco", "Graves"],
  Anivia: ["Fizz", "LeBlanc", "Diana", "Kassadin", "Zed", "Veigar"],
  Annie: ["Zed", "LeBlanc", "Katarina", "Diana", "Fizz", "Ahri"],
  Aphelios: ["Caitlyn", "Draven", "Senna", "Jhin", "Ashe", "Lucian"],
  Ashe: ["Draven", "Caitlyn", "Samira", "Tristana", "Lucian", "Xayah"],
  AurelionSol: ["Fizz", "Zed", "LeBlanc", "Yasuo", "Ekko", "Katarina"],
  Azir: ["Kassadin", "LeBlanc", "Fizz", "Diana", "Zed", "Ekko"],
  Bard: ["Zyra", "Leona", "Blitzcrank", "Morgana", "Nautilus", "Thresh"],
  Belveth: ["Sejuani", "Volibear", "Amumu", "Wukong", "Rammus", "Trundle"],
  Blitzcrank: ["Morgana", "Leona", "Thresh", "Alistar", "Janna", "Braum"],
  Brand: ["Zyra", "Leona", "Morgana", "Sivir", "Nautilus", "Braum"],
  Braum: ["Morgana", "Janna", "Soraka", "Alistar", "Thresh", "Zyra"],
  Caitlyn: ["Sivir", "Yasuo", "Braum", "Leona", "Kayn", "Varus"],
  Camille: ["Jax", "Renekton", "Riven", "Garen", "Gangplank", "Fiora"],
  Cassiopeia: ["LeBlanc", "Diana", "Fizz", "Zed", "Talon", "Katarina"],
  Chogath: ["Garen", "Olaf", "Renekton", "Darius", "Fiora", "Kled"],
  Corki: ["Zed", "LeBlanc", "Yasuo", "Fizz", "Diana", "Ekko"],
  Darius: ["Renekton", "Vayne", "Ashe", "Sejuani", "Elise", "Zilean"],
  Diana: ["Fiora", "Jax", "Chogath", "Karma", "Irelia", "Riven"],
  DrMundo: ["Vayne", "Kogmaw", "Trundle", "Fiora", "Illaoi", "Olaf"],
  Draven: ["Thresh", "Blitzcrank", "Varus", "Nami", "Vi", "Darius"],
  Ekko: ["Fiora", "LeBlanc", "Malzahar", "Vladimir", "Kassadin", "Yorick"],
  Elise: ["Udyr", "Maokai", "Hecarim", "Zed", "Khazix", "Amumu"],
  Evelynn: ["Karthus", "Maokai", "Warwick", "Lillia", "Gragas", "MasterYi"],
  Ezreal: ["Draven", "Yasuo", "Graves", "Braum", "Twitch", "Sivir"],
  Fiddlesticks: ["Evelynn", "Sejuani", "Zed", "Khazix", "Nocturne", "Karthus"],
  Fiora: [
    "Pantheon",
    "Evelynn",
    "Tryndamere",
    "Rammus",
    "Fiddlesticks",
    "Shen",
  ],
  Fizz: ["Lissandra", "Galio", "Diana", "Garen", "Ryze", "Karma"],
  Galio: ["Varus", "Vex", "Kassadin", "Pantheon", "Taliyah", "Syndra"],
  Gangplank: ["Lucian", "Poppy", "Irelia", "Kled", "Yorick", "Urgot"],
  Garen: ["Irelia", "Fizz", "Akali", "Ekko", "Vladimir", "Nidalee"],
  Gnar: ["Irelia", "Fizz", "Akali", "Ekko", "Vladimir", "Nidalee"],
  Gragas: ["Rammus", "Warwick", "Nunu", "Fiddlesticks", "Maokai", "Kayn"],
  Graves: ["Lillia", "Zed", "Karthus", "Kayn", "Nidalee", "Belveth"],
  Gwen: ["Irelia", "Tryndamere", "Olaf", "Kled", "Sett", "Renekton"],
  Hecarim: ["Reksai", "Skarner", "XinZhao", "Nidalee", "Maokai", "Zac"],
  Heimerdinger: ["Twitch", "Shaco", "Annie", "Yuumi", "Pyke", "Lulu"],
  Illaoi: ["Akshan", "Kled", "Tryndamere", "Quinn", "Chogath"],
  Irelia: ["Olaf", "Udyr", "Singed", "Darius", "Garen", "Chogath"],
  Ivern: ["Talon", "Rammus", "Graves", "Nunu", "Maokai", "Karthus"],
  Janna: ["Sona", "Velkoz", "Amumu", "Lux", "Zac", "Braum"],
  JarvanIV: ["Sylas", "Udyr", "Vi", "Reksai", "Hecarim", "Kindred"],
  Jax: ["DrMundo", "Singed", "Ryze", "Heimerdinger", "Zac", "Malphite"],
  Jayce: ["Yorick", "JarvanIV", "Wukong", "Ekko", "XinZhao", "Shaco"],
  Jhin: ["Varus", "Braum", "Kayn", "Shaco", "LeBlanc", "Wukong"],
  Jinx: ["Kaisa", "MasterYi", "Katarina", "Shaco", "Thresh", "Teemo"],
  Ksante: ["Udyr", "Akali", "Tryndamere", "Wukong", "Yasuo", "Irelia"],
  Kaisa: ["Lucian", "Caitlyn", "Teemo", "Vayne", "Ahri", "Anivia"],
  Kalista: ["Lucian", "Veigar", "MissFortune", "Tristana", "Sivir", "Twitch"],
  Karma: ["Maokai", "Braum", "Soraka", "Zilean", "Seraphine", "Bard"],
  Karthus: ["Trundle", "Lillia", "Belveth", "Shyvana", "Nunu", "Nidalee"],
  Kassadin: ["JarvanIV", "Anivia", "Malzahar", "Gragas", "Annie", "XinZhao"],
  Katarina: ["Nautilus", "Darius", "Chogath", "Zac", "Fiora", "Lulu"],
  Kayle: ["JarvanIV", "Anivia", "Malzahar", "Gragas", "Annie", "XinZhao"],
  Kayn: ["Poppy", "Garen", "Vladimir", "MasterYi", "Kindred", "Vi"],
  Kennen: ["Singed", "Shen", "Kled", "Kayle", "Quinn", "Yone"],
  Khazix: ["Maokai", "Belveth", "Nunu", "Karthus", "Rengar", "Diana"],
  Kindred: ["Viego", "Kayn", "Zed", "Karthus", "Evelynn", "Elise"],
  Kled: ["Shen", "Pantheon", "Poppy", "TahmKench", "Singed", "Jax"],
  Kogmaw: ["Sivir", "Ashe", "Kaisa", "Varus", "MissFortune", "Twitch"],
  LeBlanc: [
    "Galio",
    "Lissandra",
    "Cassiopeia",
    "Katarina",
    "TwistedFate",
    "Diana",
  ],
  LeeSin: ["Udyr", "Trundle", "Garen", "Heimerdinger", "Vladimir", "Riven"],
  Leona: ["Zilean", "Rell", "Zyra", "Seraphine", "Morgana", "Pyke"],
  Lillia: ["XinZhao", "Talon", "JarvanIV", "Warwick", "Zac", "Diana"],
  Lissandra: ["Maokai", "Kled", "Kennen", "Singed", "Sylas", "Ornn"],
  Lucian: ["Braum", "Draven", "Fiora", "Rengar", "Quinn", "Taliyah"],
  Lulu: ["Rumble", "Ryze", "Malzahar", "Tristana", "Talon", "Qiyana"],
  Lux: ["XinZhao", "Pyke", "Gragas", "MasterYi", "Fiora"],
  Malphite: ["Maokai", "Kled", "Kennen", "Singed", "Sylas", "Orn"],
  Malzahar: ["Ziggs", "Lux", "Swain", "Cassiopeia", "Gangplank", "Viktor"],
  Maokai: ["Taric", "Brand", "Swain", "Janna", "Soraka", "Veigar"],
  MasterYi: ["Jax", "Udyr", "Tryndamere", "Singed", "Khazix", "Rammus"],
  MissFortune: ["Karthus", "Zeri", "Veigar", "Ashe", "Varus", "Kaisa"],
  Mordekaiser: ["Cassiopeia", "Orianna", "Lux", "Yorick", "Xerath", "Illaoi"],
  Morgana: ["Twitch", "Sona", "Bard", "Pyke", "Heimerdinger", "Lux"],
  Nami: ["Leona", "Ashe", "bard", "Amumu", "Sona", "Heimerdinger"],
  Nasus: ["Rumble", "Ryze", "Urgot", "Lucian", "Nami", "Gangplank"],
  Nautilus: ["braun", "Rell", "Swain", "Heimerdinger", "Leona", "Zilean"],
  Neeko: ["Anivia", "Ekko", "Tryndamere", "Katarina", "Fizz", "Jayce"],
  Nidalee: ["Taliyah", "Poppy", "Rengar", "Reksai", "Sylas", "Evelynn"],
  Nilah: ["Draven", "Jhin", "MissFortune", "Wukong", "Sivir", "Vayne"],
  Nocturne: ["Talon", "Rammus", "Viego", "MasterYi", "Wukong", "Belveth"],
  Nunu: ["Trundle", "Kindred", "Sejuani", "Pantheon", "Evelynn", "Reksai"],
  Olaf: ["Yasuo", "Cassiopeia", "Camille", "Akali", "Vladimir", "Singed"],
  Orianna: ["Xerath", "Syndra", "Velkoz", "Qiyana", "Akshan", "Jayce"],
  Ornn: ["Urgot", "Nasus", "Rengar", "Kled", "TahmKench", "Vayne"],
  Pantheon: ["Chogath", "Lux", "Malphite", "Swain", "Cassiopeia", "Jayce"],
  Poppy: ["Fiddlesticks", "Evelynn", "Rammus", "JarvanIV", "Karthus", "Wukong"],
  Pyke: ["Taric", "Sona", "Zac", "Senna", "Twitch", "Lux"],
  Qiyana: ["Swain", "Ryze", "Malphite", "Katarina", "Anivia", "Veigar"],
  Quinn: ["KSante", "Shen", "Olaf", "Malphite", "Poppy", "Akali"],
  Rakan: ["Morgana", "Braum", "Rell", "Lulu", "Leona", "Thresh"],
  Rammus: ["Morgana", "Lilia", "Zac", "Shyvana", "Maokai", "Ekko"],
  Reksai: ["Volibear", "Karthus", "Nocturne", "Warwick", "Rammus", "Ekko"],
  Rell: ["RentaGlasc", "Janna", "Morgana", "Swain", "VelKoz", "Maokai"],
  RenataGlasc: ["Soraka", "Amumu", "Blitzcrank", "Xerath", "Zilean", "Sona"],
  Renekton: ["Alistar", "Trundle", "Quinn", "Elise", "Ryze", "Kennen"],
  Rengar: ["Poppy", "RekSai", "Zac", "Sejuani", "Viego", "Fiddlesticks"],
  Riven: ["Renekton", "Akshan", "Pantheon", "Kled", "ChoGath", "Sett"],
  Rumble: ["Kled", "Ryze", "Shen", "Cassiopeia", "Urgot", "Camille"],
  Ryze: ["Ziggs", "Anivia", "Swain", "Zoe", "Kassadin", "Talon"],
  Samira: ["Xayah", "Veigar", "Nilah", "Kalista", "Varus", "Lucian"],
  Sejuani: ["XinZhao", "Trundle", "Lilia", "Evelynn", "Kayn", "Poppy"],
  Senna: ["Lux", "Zyra", "Nautilus", "RenataGlasc", "Blitzcrank", "Brand"],
  Seraphine: [
    "Blitzcrank",
    "RenataGlasc",
    "Alistar",
    "Soraka",
    "Leona",
    "Janna",
  ],
  Sett: ["Ornn", "Volibear", "Wukong", "Yorick", "Garen", "Jax"],
  Shaco: ["Rammus", "Belveth", "Nocturne", "Diana", "Sejuani", "Amumu"],
  Shen: ["Swain", "Kayle", "Warwick", "Jayce", "Trundle", "Yorick"],
  Shyvana: ["Warwick", "Kindred", "Lilia", "Khazix", "Rengar", "Jax"],
  Singed: ["Kled", "Teemo", "Urgot", "Darius", "Garen", "Riven"],
  Sion: ["Kennen", "Kayle", "Vayne", "Illaoi", "Yorick", "Kled", "Singed"],
  Sivir: ["Zeri", "Jinx", "Caitlyn", "Samira", "Ezreal", "Veigar"],
  Skarner: ["Elise", "Trundle", "Kayn", "Viego", "Evelynn", "Vi"],
  Sona: ["Leona", "Nautilus", "Blitzcrank", "Thresh", "Alistar", "Rakan"],
  Soraka: ["Zyra", "Blitzcrank", "Nautilus", "Senna", "Velkoz", "Amumu"],
  Swain: ["Akshan", "Kassadin", "Yone", "Xerath", "Brand", "Heimerdinger"],
  Sylas: ["Sett", "Karthus", "LeeSin", "Pantheon", "Katarina", "Cassiopeia"],
  Syndra: ["Talon", "Aatrox", "JarvanIV", "Zilean", "Camille", "Kayle"],
  TahmKench: ["Vayne", "Shen", "Kled", "Gwen", "Illaoi", "Ornn"],
  Taliyah: ["Cassiopeia", "Kassadin", "Zoe", "Anivia", "Ahri", "Pantheon"],
  Talon: ["Karma", "Bardo", "Lulu", "Sivir", "Nami", "Morgana"],
  Taric: ["Zyra", "Bard", "Heimerdinger", "Brand", "Braum", "Shaco"],
  Teemo: ["Brand", "Swain", "Velkoz", "Galio", "Chogath", "Karthus"],
  Thresh: ["Morgana", "Heimerdinger", "Braum", "Leona", "Taric", "Swain"],
  Tristana: ["Diana", "Morgana", "Ahri", "Corki", "Talon", "Lux"],
  Trundle: ["Volibear", "Hecarim", "JarvanIV", "Mordekaiser", "Diana", "Lilia"],
  Tryndamere: ["Rammus", "Teemo", "Malphite", "Poppy", "Pantheon", "Garen"],
  TwistedFate: ["Jayce", "Swain", "Anivia", "Sylas", "Pantheon", "AurelionSol"],
  Twitch: ["Vayne", "Lucian", "Samira", "MissFortune", "Xayah", "Tristana"],
  Udyr: ["Trundle", "Jax", "Nocturne", "Hecarim", "Sejuani", "Warwick"],
  Urgot: ["Jax", "Sivir", "Twitch", "Bardo", "Nami", "Shen"],
  Varus: ["Kalista", "Draven", "Nilah", "Jinx", "Sivir", "MissFortune"],
  Vayne: ["Fiora", "LeBlanc", "Malzahar", "Vladimir", "Kassadin", "Yorick"],
  Veigar: ["Kassadin", "Zoe", "Fizz", "Morgana", "Anivia", "Zed"],
  Velkoz: ["Kassadin", "Gragas", "Swain", "Annie", "Syndra", "Azir"],
  Vex: ["Zed", "Akshan", "Cassiopeia", "Anivia", "Irelia", "Viktor"],
  Vi: ["Poppy", "Nocturne", "Zac", "Xin Zhao", "Trundle", "Karthus"],
  Viego: ["Lucian", "Nocturne", "Zed", "Rengar", "Shaco", "Udyr"],
  Viktor: ["Akshan", "Anivia", "Velkoz", "Diana", "Aurelion Sol", "Zoe"],
  Vladimir: [
    "Cassiopeia",
    "Irelia",
    "XinZhao",
    "Fiddlesticks",
    "Swain",
    "Galio",
  ],
  Volibear: ["Jayce", "Singed", "Elise", "Kennen", "Kayle", "Vayne"],
  Warwick: ["Olaf", "Sejuani", "Yorick", "Kayle", "Skarner", "Akali"],
  Wukong: ["Jax", "Volibear", "Shyvana", "Elise", "Dr. Mundo", "Singed"],
  Xayah: ["Veigar", "Miss Fortune", "Jinx", "Jhin", "Sivir", "Lucian"],
  Xerath: ["Irelia", "Fizz", "Ziggs", "Talon", "Vladimir", "Tristana"],
  XinZhao: ["Evelynn", "Elise", "Wukong", "Graves", "Rammus", "Viego"],
  Yasuo: ["Renekton", "Vayne", "Ashe", "Sejuani", "Elise", "Zilean"],
  Yone: ["Annie", "Irelia", "Zed", "Viego", "Fizz", "Lucian"],
  Yorick: ["Aatrox", "XinZhao", "Chogath", "Nunu", "Trundle", "Nidalee"],
  Yuumi: ["Blitzcrank", "Nautilus", "Bard", "Sona", "Senna", "Amumu"],
  Zac: ["Ivern", "Reksai", "Shyvana", "Talon", "Nunu & Wilump", "Graves"],
  Zed: ["Tryndamere", "Vladimir", "Kayle", "Lissandra", "Fiora", "Urgot"],
  Zeri: ["Draven", "Kalista", "Tristana", "Caitlyn", "Lucian", "Yasuo"],
  Ziggs: ["Jayce", "Qiyana", "Ekko", "Fizz", "Vex", "Lux"],
  Zilean: ["Amumu", "Rakan", "Taric", "Vel'koz", "Annie", "Veigar"],
  Zoe: ["Galio", "Twisted Fate", "Yasuo", "Lissandra", "Annie", "Jayce"],
  Zyra: ["Sona", "Janna", "Zilean", "Amumu", "Seraphine", "Alistar"],
};
