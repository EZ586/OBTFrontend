import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {

  const navigate = useNavigate();


  return (
    <div>
      <div className='container'>
      <div className='nav'>
          <h1>Opinion Breakdown</h1>
          <Link to="/">Old Mind Map</Link>
          <Link to="/old_mind_map">Old Mind Map</Link>
          <Link to="/mindmap">New Mind Map</Link>
        </div>
      </div> 
    </div>
    
    
  )
}

export default Navbar
