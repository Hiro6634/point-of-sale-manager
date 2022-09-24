import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component'

const Stock = () => (
  <div>
    <h1>Stock Page</h1>
  </div>
);

const Products = () => (
  <div>
    <h1>Products Page</h1>
  </div>
);

const Help = () => (
  <div>
    <h1>Help Page</h1>
  </div>
);

const  App = () => {
  return(
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/stock' element={<Stock/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/help' element={<Help/>}/>
    </Routes>
  );
}

export default App;
