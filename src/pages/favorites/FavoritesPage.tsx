import Card from "../../components/cards/Card"
import { HeaderApp } from "../../components/HeaderApp"

export const FavoritesPage = () => {
  return ( 
      <>
        <HeaderApp />
        <div className="list">
          {
            // data.pokemon.map(({ name, id, pokemonsprites}: any) => (
            //   <Card 
            //     key={id} 
            //     number={id} 
            //     name={name} 
            //     imageUrl={pokemonsprites[0].sprites.front_default} />
            // ))
          }
        </div>
      </>
    )
}
