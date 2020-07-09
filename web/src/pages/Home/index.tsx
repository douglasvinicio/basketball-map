import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';
import { Link } from 'react-router-dom'; 

import './styles.css';

import logo from '../../assets/logo.png'

const Home = () =>  {
    return (
    <div id="page-home">
        <div className="content" >
            <header>
            <img src={logo} alt="Basketball Map"/>
            <Link to="/create-court">
                <span>
                    < GrAddCircle />
                </span><strong> Add a new court</strong></Link>
            </header>
            <main>
            <h1>Search for a court and play some ball!</h1>
            <p>Type your city,select a court and go play some ball!</p>
            <Link to="/create-court">
                <span>
                    < FaSearchLocation />
                </span><strong>Search</strong></Link>
            </main>
            
        </div>
    </div>
 )
}

export default Home;