import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Coins from "./components/Coins"
import CoinDetails from './components/CoinDetails';
import Exchanges from "./components/Exchanges"
import Home from "./components/Home"
import Footer from './components/Footer';
function App() {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/coins' element={<Coins/>}></Route>
          <Route path='/coin/:id' element={<CoinDetails/>}></Route>
          <Route path='/exchanges' element={<Exchanges/>}></Route>
        </Routes>

        <Footer></Footer>
      </Router>
  );
}

export default App;
