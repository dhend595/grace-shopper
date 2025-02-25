

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import AlbumSearch from './AlbumSearch';


const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Link to="/home">
      <h1>Grace Vinyls</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">Cart(0)</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          {/* //Oauth step 1
            When you sign up to github oauth you get a client and secret id. You need to send the id to github to identify what app is trying to login */}
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.GIT_CLIENT_ID} `}
          >
            <p>GitHub Login</p>
          </a>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart(0)</Link>
        </div>
      )}
      <Link to="/albums/search">Search</Link>
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
