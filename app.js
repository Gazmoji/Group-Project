const body = document.getElementById("body");
const card = document.getElementById("card");
const cardBody = document.getElementById("cardBody");
const cardtitle = document.getElementById("card-title");
const ul = document.getElementById("ul");
const additional = document.getElementById("additional");
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
      console.log(heroList);
    });
}
