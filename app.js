const body = document.getElementById("body");
const body2 = document.getElementById("body2");
const card = document.getElementById("card");
const cardBody = document.getElementById("cardBody");
const cardtitle = document.getElementById("card-title");
const ul = document.getElementById("ul");
const additional = document.getElementById("additional");
const additional2 = document.getElementById("additional2");
const abilityList = document.getElementById("abilityList");

function display() {
  fetch("https://overfast-api.tekrop.fr/heroes")
    .then((response) => response.json())
    .then((information) => {
      // information.map((hero_key) => additionalInfo(hero_key))

      const heroList = information.map(function (stuff) {
        return `
      <a onclick='additionalInfo("${stuff.key}")'>
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
        champList += `<a onclick='additionalLeagueInfo("${champData[champ].name}")'>
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
      let leagueList = "";
      for (let champ in champData) {
        leagueList += `<li>
      <div>
      <h2>Champion: ${champData[champ].name}</h2>
      </div>
      <p id='blurb'>About: ${champData[champ].blurb}</p>
      <img src="http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${champData[champ].image.full}" id='port'>
      <p id='origin'>Lore: ${champData[champ].lore}</p>
      </li>`;
      }
      additional2.innerHTML = leagueList;
    });
}
