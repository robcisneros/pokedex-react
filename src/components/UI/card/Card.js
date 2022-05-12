import { Fragment, useRef } from "react";
import classes from "./Card.module.css";
import useHttp from "../../hooks/use-http";
import pokeballImg from "../../../assets/img/pokeball.png";
import { pokemonActions } from "../../../store/pokemon-slice";
import Button from "../../Button/Button";

import { useSelector, useDispatch } from "react-redux";

const Card = () => {
  const { sendRequest: getPokemonRequest } = useHttp();

  const pokeNameRedux = useSelector((state) => state.pokemon.name);
  const pokeWeightRedux = useSelector((state) => state.pokemon.weight);
  const pokeHeightRedux = useSelector((state) => state.pokemon.height);
  const pokeTypesRedux = useSelector((state) => state.pokemon.types);
  const pokeStatsRedux = useSelector((state) => state.pokemon.stats);

  const dispatch = useDispatch();

  const pokemonInputref = useRef();

  const onClickSearchHandler = () => {
    let enteredPokemonName = pokemonInputref.current.value;

    const transformData = (dataObj) => {
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

      // console.log(loadedData);
      dispatch(pokemonActions.changePokemon(loadedData));
    };
    if (enteredPokemonName.length <= 0) {
      return;
    } else {
      const url = `https://pokeapi.co/api/v2/pokemon/${enteredPokemonName}`;

      getPokemonRequest({ url }, transformData);
    }
  };

  //   const pokeImage = (image) => {
  //     const pokePhoto = document.getElementById("pokeImg");
  //     pokePhoto.src = image;
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
                    <img src={pokeballImg} alt="Pokemon" id="pokeImg" />
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
                <div className={classes.contentItem} id="pokeName">
                  {" "}
                  {pokeNameRedux && <button> {pokeNameRedux} </button>}{" "}
                </div>
              </div>
            </div>

            <div className={classes.rowData}>
              <div className={classes.titleData}>TYPE:</div>
              <div className={classes.contentData}>
                <div className={classes.contentItem} id="typeContent">
                  {pokeTypesRedux &&
                    pokeTypesRedux.map((item, index) => (
                      <Button lakey={index} contenido={item.toUpperCase()} />
                    ))}
                </div>
              </div>
            </div>

            <div className={classes.rowStats}>
              <div className={classes.titleData}>STATS:</div>
              <div className={classes.contentData}>
                <div className={classes.contentItem} id="statsContent">
                {pokeStatsRedux &&
                    pokeStatsRedux.map((item, index) => (
                      <Button lakey={index} contenido={`${item.nameStat} ${item.value}`} />
                    ))}
                </div>
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
                    <div className={classes.hwItem} id="PokeHeight">
                      {pokeHeightRedux && (
                        <button> {pokeHeightRedux} M </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.sizeWeightRect}>
              <div className={classes.rowWHContainer}>
                <div className={classes.contentWH}>WEIGHT:</div>
                <div className={classes.contentWH}>
                  <div className={classes.unitValueRow}>
                    <div className={classes.hwItem} id="PokeWeight">
                      {pokeWeightRedux && (
                        <button> {pokeWeightRedux} KG</button>
                      )}
                    </div>
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
