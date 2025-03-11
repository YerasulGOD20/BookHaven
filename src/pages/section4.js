import React from "react";
import pic1 from '../image/ourstore1.jpg'
import pic2 from '../image/ourstore2.jpg'
import pic3 from '../image/ourstore3.jpg'
import pic4 from '../image/ourstore4.jpg'
import './section4.css'
import Nav from "../menu"
const Images = [
    {
        name: "Book Cover 1",
        src: `${pic1}`,
        
    },
    {
        name: "Book Cover 1",
        src: `${pic2}`,
      
    },
    {
        name: "Book Cover 1",
        src: `${pic3}`,
        
    },
    {
        name: "Book Cover 1",
        src: `${pic4}`,
        
    }
]



function Section4() {
    return <>
            <div className="grid-main">
             <Nav className="NavBar"/>
                <div>
                    <h1 style={{ fontSize: '40px', marginBottom: '10px', color: 'whitesmoke' }}>Our Store</h1>
                     <p style={{ fontSize: '19px', color: '#C0AF84', marginBottom: '30px', width: '748px', lineHeight: '150%' }}>
                        Want to find a crazy corner in a big city? Come to our bookstore in New York and spend time with a book in a light insta-friendly space
                    </p>
                </div>
                <div className="grid-container">
                    {Images.map((e) => {
                        return <img src={e.src}  alt={e.name}></img>
                    })}
                </div>
            </div>


        </>
}



export default Section4;