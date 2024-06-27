import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectExpanded } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.reducer";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const expanded = useSelector(selectExpanded)
  const dispatch = useDispatch()

  const signOutHandler = () => dispatch(signOutStart())

  return  (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          { currentUser
            ? <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
            : <NavLink to='/auth'>SIGN IN</NavLink>
          }
          <CartIcon />
        </NavLinks>
        {expanded && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation;
