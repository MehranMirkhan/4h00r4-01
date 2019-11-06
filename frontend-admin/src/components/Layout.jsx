import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react';

import { logout } from 'src/modules/auth/auth.reducer';


const Navbar = connect(null, dispatch => ({
  logout: () => dispatch(logout()),
}))(withRouter(({ location, logout }) => {
  const route = location.pathname.split('/')[1];
  return (
    <Menu attached inverted>
      <Menu.Item
        name='گزارش'
        active={route === 'report'}
        color="teal"
        link
        as={Link}
        to="/report"
      />
      <Dropdown item text='جداول'>
        <Dropdown.Menu>
          <Dropdown.Item text='کاربران' />
          <Dropdown.Item text='سؤالات' />
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        name='تنظیمات'
        active={route === 'setting'}
        color="teal"
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='خروج'
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  );
}));

function Layout({ children }) {
  return <div>
    <Navbar />
    {children}
  </div>;
}

export default Layout;
