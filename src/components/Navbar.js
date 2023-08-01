import './Navbar.css';
import React from 'react'

const Navbar = props => {
  const regBtnClickHandler=(e)=>{
    props.onChange();
  }
  return (
    <div className="nav-bar">
        <h2>Registration App</h2>
        <button onClick={regBtnClickHandler} className='reg-btn'>Register Now</button>
    </div>
  )
}

export default Navbar

