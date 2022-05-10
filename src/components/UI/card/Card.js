import { Fragment, useRef } from "react";
import classes from "./Card.module.css";
import useHttp from "../../hooks/use-http";

import { useSelector } from "react-redux";

const Card = () => {
  const { isLoading, error, sendRequest: getPokemonRequest } = useHttp();

  const reduxName = useSelector((state) => state.pokemon.name);
  const pokemonInputref = useRef();

  const onClickSearchHandler = () => {
    let enteredPokemonName = pokemonInputref.current.value;

    const transformData = (dataObj) => {
      const pokemonInfo = dataObj;
      const loadedData = {
        name: "",
        photo: "",
        height: "",
        weight: "",
        stats: [
          { nameStat: "HP", value: "" },
          { nameStat: "ATK", value: "" },
          { nameStat: "DEF", value: "" },
          { nameStat: "SP.ATK", value: "" },
          { nameStat: "SP.DEF", value: "" },
          { nameStat: "SPEED", value: "" },
        ],
        types: [],
      };

      loadedData.name = dataObj.forms[0].name;
      loadedData.photo = dataObj.sprites.front_default;
      loadedData.weight = dataObj.weight;
      loadedData.height = dataObj.height;

      const pokeTypes = dataObj.types;
      const nTypes = [];
      pokeTypes.map((typeItem) =>
        nTypes.push(typeItem.type.name.toUpperCase())
      );
      loadedData.types = nTypes;

      const pokeStats = dataObj.stats;
      pokeStats.map(
        (statsItem, index) =>
          (loadedData.stats[index].value = statsItem.base_stat)
      );

      console.log(loadedData);
    };
    if (enteredPokemonName.length <= 0) {
      return;
    } else {
      const url = `https://pokeapi.co/api/v2/pokemon/${enteredPokemonName}`;

      getPokemonRequest({ url }, transformData);
    }

    // const pokeNameInput = document.getElementById("pokemonName");
    // let pokeName = pokeNameInput.value.trim();
    // pokeNameInput.value = "";
    // pokeName = pokeName.toLowerCase();

    // if (pokeName.length <= 0) {
    //   return;
    // } else {
    //   const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    //   fetch(url)
    //     .then((res) => {
    //       if (res.status != "200") {
    //         console.log(res);
    //         pokeImage("./images/pokemon-sad.gif");
    //       } else {
    //         const tipoContainer = document.getElementById("typeContent");
    //         tipoContainer.innerHTML = "";
    //         const pokeName = document.getElementById("pokeName");
    //         pokeName.innerHTML = "";
    //         const statsContainer = document.getElementById("statsContent");
    //         statsContainer.innerHTML = "";
    //         const pokeHeightC = document.getElementById("PokeHeight");
    //         pokeHeightC.innerHTML = "";
    //         const pokeWeightC = document.getElementById("PokeWeight");
    //         pokeWeightC.innerHTML = "";

    //         return res.json();
    //       }
    //     })
    //     .then((data) => {
    //       if (data) {
    //         console.log(data);
    //         let dataName = data.name;
    //         let dataImg = data.sprites.front_default;
    //         let dataTypes = data.types;

    //         let dataHeight = data.height;

    //         let dataWeight = data.weight;
    //         let dataStats = data.stats;
    //         pokeObject = {
    //           name: dataName,
    //           image: dataImg,
    //           types: dataTypes,
    //           height: dataHeight,
    //           weight: dataWeight,
    //           stats: dataStats,
    //         };
    //         pokeData(pokeObject);
    //       }
    //     });
    // }
  };

  //   const pokeImage = (image) => {
  //     const pokePhoto = document.getElementById("pokeImg");
  //     pokePhoto.src = image;
  //   };

  //   const pokeData = (pokeObject) => {
  //     const pokePhoto = document.getElementById("pokeImg");
  //     pokePhoto.src = pokeObject.image;

  //     const pokeName = document.getElementById("pokeName");
  //     let newButton = document.createElement("button");
  //     newButton.classList.add("contentItem");
  //     newButton.innerHTML = pokeObject.name.toUpperCase();
  //     pokeName.appendChild(newButton);

  //     const pokeHeight = document.getElementById("PokeHeight");
  //     let heightButton = document.createElement("button");
  //     heightButton.classList.add("hwItem");
  //     heightButton.innerHTML = pokeObject.height + " M";
  //     pokeHeight.appendChild(heightButton);

  //     const pokeWeight = document.getElementById("PokeWeight");
  //     let weightButton = document.createElement("button");
  //     weightButton.classList.add("hwItem");
  //     weightButton.innerHTML = pokeObject.weight + " KG";
  //     pokeWeight.appendChild(weightButton);

  //     addStatsButtons(pokeObject.stats);
  //     addTypeButtons(pokeObject.types);
  //   };

  //   const addTypeButtons = (types) => {
  //     const tipoContainer = document.getElementById("typeContent");
  //     pokeLength = types.length;
  //     types.map((typeItem) => {
  //       let ntype = typeItem.type.name.toUpperCase();
  //       let newButton = document.createElement("button");
  //       newButton.classList.add("contentItem");
  //       newButton.innerHTML = ntype;
  //       tipoContainer.appendChild(newButton);
  //     });
  //   };

  //   const addStatsButtons = (stats) => {
  //     const statsContainer = document.getElementById("statsContent");

  //     let hpStat = "HP:" + stats[0].base_stat;
  //     let newButton0 = document.createElement("button");
  //       newButton0.classList.add("statsItem");
  //       newButton0.innerHTML = hpStat;
  //       statsContainer.appendChild(newButton0);
  //     let attackStat = "ATK:" + stats[1].base_stat;
  //     let newButton1 = document.createElement("button");
  //       newButton1.classList.add("statsItem");
  //       newButton1.innerHTML = attackStat;
  //       statsContainer.appendChild(newButton1);
  //     let defenseStat = "DEF:" + stats[2].base_stat;
  //     let newButton2 = document.createElement("button");
  //       newButton2.classList.add("statsItem");
  //       newButton2.innerHTML = defenseStat;
  //       statsContainer.appendChild(newButton2);
  //     let spAttackStat = "SP.ATK:" + stats[3].base_stat;
  //     let newButton3 = document.createElement("button");
  //       newButton3.classList.add("statsItem");
  //       newButton3.innerHTML = spAttackStat;
  //       statsContainer.appendChild(newButton3);
  //     let spDefenseStat = "SP.DEF:" + stats[4].base_stat;
  //     let newButton4 = document.createElement("button");
  //       newButton4.classList.add("statsItem");
  //       newButton4.innerHTML = spDefenseStat;
  //       statsContainer.appendChild(newButton4);
  //     let speedStat = "SPEED:" + stats[5].base_stat;
  //     let newButton5 = document.createElement("button");
  //       newButton5.classList.add("statsItem");
  //       newButton5.innerHTML = speedStat;
  //       statsContainer.appendChild(newButton5);

  //   };

  return (
    <Fragment>
      <h1>Pokedex</h1>
      <div className={classes.fullPokedex}>
        <div className={`${classes.leftPokedex} ${classes.mainRed}`}>
          <div className={`${classes.contenedorHeader} ${classes.oneRow}`}>
            <div className={classes.wc}>
              <div className={classes.bc}>
                <div className={classes.blc}>
                  <div className={classes.bllc}></div>
                </div>
              </div>
            </div>
            <div className={classes.smallCircle}></div>
            <div className={classes.smallCircle}></div>
            <div className={classes.smallCircle}></div>
          </div>
          <div className={`${classes.notchedCorner} ${classes.oneRow}`}>
            <div className={classes.notchedBox}>
              <div className={classes.oneRow}>
                <div className={classes.oneJustifyItem}>
                  <div className={classes.screenRelleno}></div>
                  <div className={classes.screen}>
                    <img
                      src="../../../assets/img/pokeball.png"
                      alt="Pokemon"
                      id="pokeImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${classes.oneRow} ${classes.leftButtonsContainer}`}>
            <div className={classes.firstColum}>
              <div className={classes.blackc}>
                <div className={classes.blackcc}></div>
              </div>
            </div>
            <div className={classes.secondColum}>
              <div className={classes.secondColumRect}>
                <div className={classes.rectangle1}></div>
                <div className={classes.rectangle2}></div>
              </div>
            </div>
            <div className={classes.thirdColum}>
              <div className={classes.joystickRow}>
                <div></div>
                <div
                  className={`${classes.joystickUnit} ${classes.borderc1}`}
                ></div>
                <div></div>
              </div>
              <div className={classes.joystickRow}>
                <div
                  className={`${classes.joystickUnit} ${classes.borderc2}`}
                ></div>
                <div className={classes.joystickUnit}></div>
                <div
                  className={`${classes.joystickUnit} ${classes.borderc3}`}
                ></div>
              </div>
              <div className={classes.joystickRow}>
                <div></div>
                <div
                  className={`${classes.joystickUnit} ${classes.borderc4}`}
                ></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className={classes.inputSpaceContainer}>
            <div className={classes.inputSpace}>
              <h3>Search for a Pokemon:</h3>
              <textarea
                type="text"
                placeholder="press when finished"
                id="pokemonName"
                name="pokemonName"
                ref={pokemonInputref}
              ></textarea>
              <button className={classes.SHINEB} onClick={onClickSearchHandler}>
                PRESS
              </button>
            </div>
          </div>
        </div>
        <div className={`${classes.rightPokedex} ${classes.mainRed}`}>
          <div className={classes.skillsScreen}>
            <div className={classes.rowName}>
              <div className={classes.titleData}>NAME:</div>
              <div className={classes.contentData}>
                <div className={classes.contentItem} id="pokeName"></div>
              </div>
            </div>

            <div className={classes.rowData}>
              <div className={classes.titleData}>TYPE:</div>
              <div className={classes.contentData}>
                <div className={classes.contentItem} id="typeContent"></div>
              </div>

              {/* <button id="pokeTipo"></button> */}
            </div>

            <div className={classes.rowStats}>
              <div className={classes.titleData}>STATS:</div>
              <div className={classes.contentData}>
                <div className={classes.statsItem} id="statsContent"></div>
              </div>
            </div>
          </div>
          <div className={classes.blueSkills}></div>

          <div className={classes.rightButtonsContainer}>
            <div className={classes.dosBotones}>
              <div className={classes.whiteSquare}></div>
              <div className={classes.whiteSquare}></div>
            </div>

            <div className={classes.circleRayasContainer}>
              <div className={classes.rayas}>
                <div className={classes.raya}></div>
                <div className={classes.raya}></div>
              </div>
              <div
                className={`${classes.smallCircle} ${classes.justrightcir}`}
              ></div>
            </div>
          </div>

          <div className={classes.sizeWeightContainer}>
            <div className={classes.sizeWeightRect}>
              <div className={classes.rowWHContainer}>
                <div className={classes.contentWH}>HEIGHT:</div>
                <div className={classes.contentWH}>
                  <div className={classes.unitValueRow}>
                    <div className={classes.hwItem} id="PokeHeight"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.sizeWeightRect}>
              <div className={classes.rowWHContainer}>
                <div className={classes.contentWH}>WEIGHT:</div>
                <div className={classes.contentWH}>
                  <div className={classes.unitValueRow}>
                    <div className={classes.hwItem} id="PokeWeight"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
