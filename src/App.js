import './App.css';
import CardsLogic from './components/CardsLogic';

function App() {
  return (
    <div className="App">
      <h1><span className="uno-word">UNO</span> <span className="memory-word">Memory</span> <span className="game-word">Game!</span></h1>
      <CardsLogic/>
    </div>
  );
}

export default App;
