import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Products from './routes/products/products.component';

const Stock = () => (
  <div>
    <h1>Stock Page</h1>
  </div>
);

const UserMgm = () => (
  <div>
    <h1>User Management Page</h1>
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
      <Route path='/' element={<Navigation/>}>
        <Route index  element={<Home/>}/>
        <Route path='stock' element={<Stock/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='users' element={<UserMgm/>}/>
        <Route path='help' element={<Help/>}/>
        <Route path='auth' element={<Authentication/>}/>
      </Route>
    </Routes>
  );
}

export default App;
