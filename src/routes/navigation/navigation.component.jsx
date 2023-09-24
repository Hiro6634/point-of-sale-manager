import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

// import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import logo from '../../assets/ajb.png';

import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { 
    LogoContainer,
    LogoImgContainer,
    NavLink,
    NavLinks,
    NavigationContainer 
} from './navigation.styles';
// import './navigation.styles.scss';


const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <LogoImgContainer src={logo} alt='logo'/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/products'>
                        PRODUCTOS
                    </NavLink> 
                    <NavLink to='/sales'>
                        VENTAS
                    </NavLink> 
                    <NavLink to='/users'>
                        USUARIOS
                    </NavLink> 
                    <NavLink to='/help'>
                        HELP
                    </NavLink> 
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>
                                SALIR
                            </NavLink>
                        ):(
                            <NavLink to='/auth'>
                                INGRESAR
                            </NavLink> 
                        )
                    }
                </NavLinks>
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}
  
  
export default Navigation;