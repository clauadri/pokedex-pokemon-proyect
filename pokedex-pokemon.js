// declaracion de variables

const divGlobal$$ = document.createElement("div");
const divLogo$$ = document.createElement("div");
const divForm$$ = document.querySelector(".container-form");
const divButton$$ = document.querySelector('.container-button');
const input$$ = document.querySelector("#text-search");
const imgLogo$$ = document.createElement("img");
const divPokemon$$ = document.createElement("div");
const typesEventAdded = {};

//crear clases

divGlobal$$.classList.add("background-img");
divLogo$$.classList.add("logo");
imgLogo$$.classList.add("img-logo");
imgLogo$$.src ="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png";
divLogo$$.appendChild(imgLogo$$);
divPokemon$$.classList.add("container-pokemon");

//apppendChilds

divGlobal$$.appendChild(divLogo$$);
divGlobal$$.appendChild(divForm$$);
divGlobal$$.appendChild(divButton$$);
divGlobal$$.appendChild(divPokemon$$);
document.body.appendChild(divGlobal$$);

const newArrayPokemon = [];

const bringPokemons = () =>
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151") // el return es para retornar data results por lo tanto retorno el fetch estoy guardando enla variable la peticion
    .then((response) => response.json())
    .then((data) => data.results); // la fun.flecha retorna por defecto

const bringOneByOne = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => data);

// le paso los parametros a la funcion para llamarla en el if
const filterBtnType = (src, btnType, typeImg, p$$) =>{
    const imgType$$ = document.createElement("img");
    imgType$$.classList.add("img-type");
    imgType$$.src = src;
    p$$.appendChild(imgType$$);
    const button$$ = document.querySelector(btnType);
    
    // añado este condicional porque cuando daba click en el boton para flitrar por tipos me hacia el evento para todos( si le daba grass me ejecutaba el evento del poison tambien y se me colgaba el server)
    if (!typesEventAdded[typeImg]) {// cuando hace la primera iteracion añade grass y pasa a ser true
      button$$.addEventListener('click', () => {// cuando doy click me busca grass
        input$$.value = typeImg;
        search(typeImg);
      });
    }
    typesEventAdded[typeImg] = true;// afrimo que el valor a adquirido el valor true para que no se vuelva a repetir
}
const renderOneByOne = (pokemon) => {
    divPokemon$$.innerHTML = '';// borro el contenido de los que no coinciden

    pokemon.forEach(eachPokemon => {// array=pokemon each=cada uno
    // for each no retorna nada para cada pokemon crea todo lo de abajo.
    const divFlipOut$$ = document.createElement('div');
    const divFlipIn$$ = document.createElement('div');
    const divCard$$ = document.createElement("div");
    const divCardBack$$ = document.createElement('div');
    const divP$$ = document.createElement("div");
    
    divFlipOut$$.classList.add('flip-card');
    divFlipIn$$.classList.add('flip-card-inner');
    divCardBack$$.classList.add('flip-card-back');
    divP$$.classList.add("paraf");
    divCard$$.classList.add("card");
    divCard$$.classList.add("filtrar");
    divCard$$.classList.add("type");
    divCard$$.classList.add('flip-card-front');

    const h3$$ = document.createElement("h3");
    const img$$ = document.createElement("img");
    const p2$$ = document.createElement("p");
    const p3$$ = document.createElement("p");
    const h5$$ = document.createElement('h5');
    const divBack$$ = document.createElement('div');
    const h4Back$$ = document.createElement('h4');
    const divTypes$$ = document.createElement("div");
    
    p3$$.classList.add('id-class');
    p3$$.textContent = ('#' + eachPokemon.id);
    h3$$.textContent = eachPokemon.name;
    img$$.src = eachPokemon.sprites.front_default;
    h5$$.textContent = 'Abilities';
    h4Back$$.textContent = 'STATS';
    h4Back$$.classList.add('id-class');
    divTypes$$.classList.add("img-types");
    
    divCard$$.appendChild(p3$$);
    divCard$$.appendChild(h3$$);
    divCard$$.appendChild(img$$);
    divCard$$.appendChild(h5$$);
    divP$$.appendChild(p2$$);
    divFlipIn$$.appendChild(divCard$$);
    divFlipIn$$.appendChild(divCardBack$$);
    divFlipOut$$.appendChild(divFlipIn$$);
    divPokemon$$.appendChild(divFlipOut$$);
    divBack$$.appendChild(h4Back$$);

    for (const stats of eachPokemon.stats) {
        const pBack$$ = document.createElement('p')
        pBack$$.textContent = stats.stat.name + ' : ' + stats.base_stat;
        pBack$$.classList.add('p-cards-back')
        divBack$$.appendChild(pBack$$);
        divCardBack$$.appendChild(divBack$$);
    }

    for (const ability of eachPokemon.abilities) {
      const p1$$ = document.createElement("p");
      p1$$.classList.add('p-abilities');
      p1$$.textContent = ability.ability.name;
      divP$$.appendChild(p1$$);
      divCard$$.appendChild(divP$$);
    }

    for (const type of eachPokemon.types) {
      const p$$ = document.createElement("p");
      p$$.textContent = '';
      divTypes$$.appendChild(p$$);
      divP$$.appendChild(divTypes$$);
      const typeImg = type.type.name;
      if (typeImg === "grass") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/240px-Pok%C3%A9mon_Grass_Type_Icon.svg.png", ".btn-grass", typeImg, p$$);
      } else if (typeImg === "poison") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/240px-Pok%C3%A9mon_Poison_Type_Icon.svg.png", ".btn-poison", typeImg, p$$);
      } else if (typeImg === "fire") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/240px-Pok%C3%A9mon_Fire_Type_Icon.svg.png", ".btn-fire", typeImg, p$$);
      } else if (typeImg === "flying") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/240px-Pok%C3%A9mon_Flying_Type_Icon.svg.png", ".btn-flying", typeImg, p$$)
      } else if (typeImg === "water") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/240px-Pok%C3%A9mon_Water_Type_Icon.svg.png", ".btn-water", typeImg, p$$)
      } else if (typeImg === "bug") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/240px-Pok%C3%A9mon_Bug_Type_Icon.svg.png", ".btn-bug", typeImg, p$$)
      } else if (typeImg === "normal") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/240px-Pok%C3%A9mon_Normal_Type_Icon.svg.png", ".btn-normal", typeImg, p$$)
      } else if (typeImg === "electric") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/240px-Pok%C3%A9mon_Electric_Type_Icon.svg.png", ".btn-electric", typeImg, p$$)
      } else if (typeImg === "ground") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/240px-Pok%C3%A9mon_Ground_Type_Icon.svg.png", ".btn-ground", typeImg, p$$)
      } else if (typeImg === "fairy") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/240px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png", ".btn-fairy", typeImg, p$$)
      } else if (typeImg === "fighting") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/240px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png", ".btn-fighting", typeImg, p$$)
      } else if (typeImg === "psychic") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/240px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png", ".btn-psychic", typeImg, p$$)
      } else if (typeImg === "rock") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/240px-Pok%C3%A9mon_Rock_Type_Icon.svg.png", ".btn-rock", typeImg, p$$)
      } else if (typeImg === "steel") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/240px-Pok%C3%A9mon_Steel_Type_Icon.svg.png", ".btn-steel", typeImg, p$$)
      } else if (typeImg === "ice") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/240px-Pok%C3%A9mon_Ice_Type_Icon.svg.png", ".btn-ice", typeImg, p$$)
      } else if (typeImg === "ghost") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/240px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png", ".btn-ghost", typeImg, p$$)
      } else if (typeImg === "dragon") {
        filterBtnType("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/240px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png", ".btn-dragon", typeImg, p$$)
      }
    }
  });
}

const search = (value) => {// esta funcion tiene que filtrar por nombre id o lo que sea y darme el resultado

    // const value = e.target.value;// lo meto en una variable para saber que hago con ese elemento
    // tiene que buscar en los div y darme el unico que encuentre y los demas que los borre
    const filteredPokemon = newArrayPokemon.filter(pokemon => {
        const filteredPokemonByName = pokemon.name.includes(value);// si el pokemon name incluye el valor que escribimos
        const filteredPokemonById = pokemon.id == (value);// si coincide con el numero de id
        const filteredPokemonByType = pokemon.types.filter(type => type.type.name.includes(value)).length;
        return filteredPokemonByName || filteredPokemonById || filteredPokemonByType; // devuelveme o una o otra
    });
       // con la funcion parseInt lo pasamos a numero ya que el evento devuelve un string
    //recibimo un pokemon y que me devuelva los pokemon name incluya el value que le damos
    // console.log(filteredPokemon);
    renderOneByOne(filteredPokemon);// le damos el array de los pokemon filtrados(pero esto concatena los pokemons que buscamos)
    // tenemos que mandar que renderice lo que filtra
}

const filter = () => {
    // const input$$ = document.querySelector("#text-search");// lo guardo en la variables para saber que le estoy haciendo a ese elemento
    input$$.addEventListener('input', (e) => search(e.target.value));// hemos refactorizado y sacamos la funcion search
}

async function start() {
  // hacemos una funcion asincrona para y decirle a la funcion que queramos que espere a que la funcion termine antes de seguir con el codigo
  filter();// arranco la funcion
  const allPokemon = await bringPokemons(); // si miramos por consola dara undefined porque el console lo imprime antes
  // cuando igualamos a una variable la ejecucion de una funcion hay que poner el return
  // console.log(allPokemon)
  for (const pokemon of allPokemon) {
    // iteramos sobre los 151 pokemon que hemos traido en la funcion bring pokemon
    //le metemos un await para que se espere a que llegue el primero y que vaya de uno en uno
    const onePokemon = await bringOneByOne(pokemon.url); // defino una variable con el valor de cada pokemon
    newArrayPokemon.push(onePokemon); //hay que guardar la informacion del bucle lo meto en el nuevo array que he creado
  }

  renderOneByOne(newArrayPokemon);
}

window.onload = start(); // se dispara el evento alfinal del proceso
// de carga cuando todos los objetos del dom estan cargado