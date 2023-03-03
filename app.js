const body = document.getElementById("body");
const card = document.getElementById("card");
const cardBody = document.getElementById("cardBody");
const cardtitle = document.getElementById("card-title");
const ul = document.getElementById("ul");
const additional = document.getElementById("additional");

function display() {
  fetch("https://overfast-api.tekrop.fr/heroes")
    .then((response) => response.json())
    .then((information) => {
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
display();

function additionalInfo(heroName) {
  fetch(`https://overfast-api.tekrop.fr/heroes/${heroName.toLowerCase()}`, {
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