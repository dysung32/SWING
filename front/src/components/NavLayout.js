import { Outlet } from 'react-router-dom';

function NavLayout() {
  return (
    <div className='nav-layout-padding-top'>
      {/* 여기에 nav 컴포넌트 넣어주세요! */}
      <Outlet />
    </div>
  );
}

export default NavLayout;
