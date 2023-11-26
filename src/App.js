import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthComponent } from './autenticacion/AuthComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthComponent />
      </BrowserRouter>      
    </div>
  );
}

export default App;
