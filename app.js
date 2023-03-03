const body = document.getElementById("body");
const card = document.getElementById("card");
const cardBody = document.getElementById("cardBody");
const cardtitle = document.getElementById("card-title");
const ul = document.getElementById("ul");
const additional = document.getElementById("additional");

function display () {
fetch("https://overfast-api.tekrop.fr/heroes")
  .then((response) => response.json())
  .then((information) => {
    // information.map((hero_key) => additionalInfo(hero_key))
    
    const heroList = information.map(function (stuff) {
      return `
      <a onclick='additionalInfo("${stuff.name}")'>
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
display ()
function additionalInfo(heroName) {
  // let heroName = "${stuff.name}"
  fetch(`https://overfast-api.tekrop.fr/heroes/${heroName}`, {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((information) => {
      const heroInfo = information.map(function (info) {
        return `<li>
        <b>Name: ${info.name}</b>
        <p>About: ${info.description}</p>
        <img src=${info.portrait}>
        <h2>Role: ${info.role}</h2>
        <p>Location: ${info.location}</p>
        <p>Abilities: ${info.abilities}</p>
        <p>Origin Story: ${info.story}</p>
</li>`;
      });
      additional.innerHTML += heroInfo;
    });
}

function test () {
  console.log(`stuff.hero.key`)
}