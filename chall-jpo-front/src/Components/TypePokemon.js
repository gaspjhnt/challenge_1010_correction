import "../style/TypePoke.css"

function TypePokemon(props) {
  let types = props.types
  return (
    <div className="type-poke">
      {types.map((type, index) => (
        <div key={index} className="type-poke">
          <p className={type.type.name}>{type.type.name}</p>
      </div>
      ))}
    </div>
  );
}
  export default TypePokemon;