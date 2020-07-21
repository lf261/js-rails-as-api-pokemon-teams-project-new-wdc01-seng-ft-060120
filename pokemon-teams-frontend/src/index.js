const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName('main')[0];

document.addEventListener("DOMContentLoaded",() =>
{
  fetch(BASE_URL+"/trainers")
  .then(resp => resp.json())
  .then(json => makeCards(json));

  document.addEventListener('click',buttonClicked)
});

const buttonClicked = (event) =>
{
  const target = event.target
  if(target.className === "add")
  {
    const table = target.parentElement.getElementsByTagName('table')[0]
    addPokemon(table);
  }
  else if (target.className === "release")
  {

  }
}

//function addPokemon(parent:HTML Element) : void
const addPokemon = (table) =>
{
  let configObj =
  {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer_id: table.parentElement.dataset.id})
  };configObj.body
  console.log()
  fetch(POKEMONS_URL,configObj)
  .then(resp => resp.json())
  .then(json => appendPoke(json,table));
}

//appendPoke(json:jsonobj):tableElement
const appendPoke = (pokemon,table) =>
{
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td2.className = "r-buttons"

  td1.innerText = `${pokemon.nickname} (${pokemon.species})`;
  const releaseButton = document.createElement('button')
  releaseButton.className = "release";
  releaseButton.innerText = "release";

  td2.append(releaseButton);
  tr.append(td1);
  tr.append(td2);
  table.append(tr);
}

const makeCards = (jsonObj) =>
{
  for (const trainer of jsonObj)
  {
    const div = document.createElement('div')
    div.dataset.id = trainer.id;
    div.className = "card";

    const h1 = document.createElement('h1');
    h1.innerText = trainer.name;

    const addButton = document.createElement('button');
    addButton.className = "add"
    addButton.innerText = 'Add Pokemon';

    const table = document.createElement('table');
    for(const pokemon of trainer.pokemons)
    {
      appendPoke(pokemon,table);
    }
    div.append(h1);
    div.append(addButton);
    div.append(table);
    main.append(div);
  }
}