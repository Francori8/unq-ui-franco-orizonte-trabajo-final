
import './App.css'
import { GameContextProvider } from './context/GameContext'

import { GameContainer } from './app/GameContainer'

function App() {
 

  return (
    <>
      <GameContextProvider>
        <GameContainer />
      </GameContextProvider>
    </>
  )
}

export default App
