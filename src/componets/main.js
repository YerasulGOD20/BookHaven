import React, { useState } from "react";
import {Button} from 'antd'
import bg from '../image/bg.jpg'
import '../style/main.css'
import '../style/common.css'
import { Link } from "react-router-dom";




function Main(){

    

    const onMouseEnter = (e) => {
        e.target.style.backgroundColor = '#FFEBA3'
    } 

    const onMouseLeave = (e) => {
        e.target.style.backgroundColor = 'white'
    }

    return (
        <>
            <main 
                style={{backgroundImage: `url(${bg})`, height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                
            }}
            >
                <div className = "container">
                    <div className = "content">
                        <h2 className="title">Best New Reads Every Month</h2>
                        <p className='content_info'>We deliver 5 books every 
                            month based on your personal preferences.
                        </p>
                        <Link to="/OurBookshop">
                        <Button type='primary' style={{width: '142px', height: '47px',
                             backgroundColor: 'white', color: 'black', fontSize: '15px', fontWeight: '500',
                            marginTop: '30px',

                            }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        >Learn More
                        </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Main;