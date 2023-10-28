import React, {useState} from 'react';
import pensionLogo from '../assets/pension_logo.png'
import '../styles/header.css'

function Header(props) {
    //home is always the default nav
    const [currentNav, updateNav] = useState('home')
    const handleNav = ()=>{
        // console.log(handlenav)
    }
    return (
        <header>
           <div>
           <div>
                <img src={pensionLogo} alt='Pension Remittance Logo' />
            </div>

            <nav>
                <ul>
                    <li>
                        <a href='#' onClick={(e)=> {
                            e.preventDefault()
                            updateNav('about')
                            handleNav()
                        }}>
                            About
                        </a>
                    </li>

                    <li>
                        <a href='#' onClick={(e)=> {
                            e.preventDefault()
                            updateNav('services')
                            handleNav()
                        }}>
                            Services
                        </a>
                    </li>

                    <li>
                        <a href='#' onClick={(e)=> {
                            e.preventDefault()
                            updateNav('developers')
                            handleNav()
                        }}>
                            Developers
                        </a>
                    </li>
                </ul>
            </nav>

            <div>
                <button className='outline-blue'>Login</button>
                <button className='blue-btn'>Sign up</button>
            </div>
           </div>
        </header>
    );
}

export default Header;