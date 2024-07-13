import './App.css';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
