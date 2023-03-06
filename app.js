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
        <b>Name: ${information.name}</b>
        <p>About: ${information.description}</p>
        <img src=${information.portrait}>
        <h2>Role: ${information.role}</h2>
        <p>Location: ${information.location}</p>
        <p>Origin Story: ${information.story.summary}</p>
</li>`;
      let abilities = information.abilities;
      const heroAbilities = abilities.map(function (abil) {
        return `<li>
        <img src=${abil.icon}>
        <h3>Ability Name: ${abil.name}</h3>
        <p>Description: ${abil.description}</p>
        </li>`;
      });
      additional.innerHTML = heroList;
      abilityList.innerHTML = heroAbilities.join("");
      console.log(heroList);
    });
}
