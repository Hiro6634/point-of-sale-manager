import { Outlet } from 'react-router-dom';



const Home = () => {
  return(
    <div>
      <h1>Total de Ventas</h1>
      <Outlet/>
    </div>
  )

};

export default Home;