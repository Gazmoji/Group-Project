const ul = document.getElementById("ul");

fetch("https://overfast-api.tekrop.fr/heroes")
  .then((response) => response.json())
  .then((information) => {
    console.log(information);
    const heroList = information.map(function (stuff) {
      return `<li>
        <div>
        ${stuff.name}</div>
        <div>${stuff.role}</div>
        <img src="${stuff.portrait}"></li>`;
    });
    ul.innerHTML = heroList.join("");
  });
