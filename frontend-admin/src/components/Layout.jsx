import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Dropdown, Container } from 'semantic-ui-react';

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
        color="blue"
        icon="dashboard"
        link
        as={Link}
        to="/report"
      />
      <Menu.Item as={Dropdown} item text='جداول'
        active={['users', 'questions'].indexOf(route) >= 0} color="blue">
        <Dropdown.Menu>
          <Dropdown.Item text='کاربران' icon="users" as={Link} to='/users' />
          <Dropdown.Item text='سؤالات' icon="question" as={Link} to='/questions' />
          <Dropdown.Item text='تلاش‌ها' icon="file" as={Link} to='/answers' />
          <Dropdown.Item text='راهنمایی‌ها' icon="gift" as={Link} to='/hints' />
          <Dropdown.Item text='مدال‌ها' icon="trophy" as={Link} to='/achievements' />
        </Dropdown.Menu>
      </Menu.Item>
      <Menu.Item
        name='تنظیمات'
        active={route === 'setting'}
        color="blue"
        icon="setting"
      />

      <Menu.Menu position='right'>
        <Menu.Item
          active={true}
          color="red"
          name='خروج'
          icon='sign-out'
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  );
}));

function Layout({ children }) {
  return <>
    <Navbar />
    <Container style={{ margin: '16px 0' }}>
      {children}
    </Container>
  </>;
}

export default Layout;
