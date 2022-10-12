const input = document.getElementById("inp");
const repositorySelection = document.querySelector(".search-ul");
const arrLiSearch = document.getElementsByClassName("result");
const favorites = document.querySelector(".favorites");

let receivedArr = [];

input.addEventListener("keyup", (el) => {
  valueInput(el);
});

repositorySelection.addEventListener("click", (e) => {
  let num = e.target.id;
  addFavoritesCard(num);
  const theEl = document.getElementById(num);
  theEl.classList.add("display-none");
});

favorites.addEventListener("click", (e) => {
  let num = e.target.id;
  if (num) {
    let a = document.getElementById(`favorite-card-${num}`);
    favorites.removeChild(a);
  }
});

function valueInput(el) {
  let str = el.target.value;
  if (str) {
    apiReguest(str);
  } else {
    for (let i of arrLiSearch) {
      i.classList.add("display-none");
    }
  }
}

function delaiInputText(fn) {
  let set;
  return function () {
    const func = () => fn.apply(this, arguments);
    clearTimeout(set);
    set = setTimeout(func, 500);
  };
}

valueInput = delaiInputText(valueInput);

async function apiReguest(str) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${str}`
  );

  const parse = await response.json();
  const arr = parse.items.slice(0, 5);
  searchResultOutput(arr);
}

function searchResultOutput(arr) {
  let acc = 0;
  for (let i of arrLiSearch) {
    i.textContent = arr[acc].name;
    receivedArr[acc] = arr[acc];
    i.classList.remove("display-none");
    acc++;
  }
}

let accCard = 5;

function addFavoritesCard(n) {
  const card = document.createElement("div");
  card.classList.add("favorite-card");
  card.setAttribute("id", `favorite-card-${accCard}`);
  const ul = document.createElement("ul");
  ul.classList.add("favorites-ul");
  const liName = document.createElement("li");
  liName.classList.add("favorite-li");
  liName.textContent = `Name: ${receivedArr[n].name}`;
  const liOwner = document.createElement("li");
  liOwner.classList.add("favorite-li");
  liOwner.textContent = `Owner: ${receivedArr[n].owner.login}`;
  const liStars = document.createElement("li");
  liStars.classList.add("favorite-li");
  liStars.textContent = `Stars: ${receivedArr[n].stargazers_count}`;
  const closCard = document.createElement("button");
  closCard.classList.add("favorit-close");
  closCard.setAttribute("id", `${accCard}`);
  card.appendChild(ul);
  card.appendChild(closCard);
  ul.appendChild(liName);
  ul.appendChild(liOwner);
  ul.appendChild(liStars);
  favorites.appendChild(card);
  accCard++;
}
