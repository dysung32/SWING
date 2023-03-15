import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function NavLayout() {
  return (
    <>
      <NavBar />
      <div className='nav-layout-padding-top'>
        <Outlet />
      </div>
    </>
  );
}

export default NavLayout;
