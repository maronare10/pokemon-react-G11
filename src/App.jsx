import { useState, useEffect } from 'react'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(1)

  const fetchPokemons = async () => {
    const limit = 8
    const offset = (page - 1) * limit
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    const results = data.results.map(result => {
      // https://pokeapi.co/api/v2/pokemon/1/
      const id = result.url.split('/')[6]
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
      // console.log(id)
      // return result
      console.log(image)
      return {
        name: result.name,
        id,
        image
      }
    })
    console.log(results)
    setPokemons(results)

  }

  const handlePrevtPage = () => {
    setPage(page-1)
  }
  
  const handleNextPage = () => {
    setPage(page+1)
  }


  useEffect(() => {
    fetchPokemons(page)
  }, [page])

  return (
    <div className='pokemonList'>
      <h1 className='title'>Pokemon List</h1>
      <div className='pokemons'>
        {pokemons.map(pokemon => {
          return (
            <div key={pokemon.id} className='pokemon' >
              <img src={pokemon.image} />
              <h3>#{pokemon.id} {pokemon.name}</h3>
            </div>
          )
        })}
      </div>
      <div className='pagination'>
        <button onClick={handlePrevtPage}>Prev</button>
        <span>{page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>

    </div>
  )
}

export default App

