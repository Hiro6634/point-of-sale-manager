import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandle = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

    return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/stock'>
                        STOCK
                    </Link> 
                    <Link className='nav-link' to='/products'>
                        PRODUCTOS
                    </Link> 
                    <Link className='nav-link' to='/users'>
                        USUARIOS
                    </Link> 
                    <Link className='nav-link' to='/help'>
                        HELP
                    </Link> 
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutHandle}>
                                SIGN OUT
                            </span>
                        ):(
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link> 
                        )
                    }
                </div>
            </div>
            <Outlet/>
        </Fragment>
    );
}
  
  
export default Navigation;