import FavoriteApp from "./FavoriteApp";

export default function LogotypeApp() {
  return (
    <>
      <div className="logotype">
        <div className="logotype__content">
          <img src="/assets/images/pokeball.svg" alt="Pokeball" />
          <h1>Pokédex</h1>
        </div>
        <FavoriteApp />
      </div>
    </>
  )
}
