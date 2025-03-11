import React from "react";
import '../pages/section3.css'

function Card(props) {
    return (
        <>
                <div className="description">
                    <p className="desc-title">{props.title}</p>
                    <p className="desc-price">{props.price}</p>
                    <p className="desc-info1">{props.info1}</p>
                    <p className="desc-info2">{props.info2}</p>
                    <p className="desc-info3">{props.info3}</p>
                    <p className="desc-info4">{props.info4}</p>
                    <button className="desc-btn"><span style={{fontSize: '14px', fontWeight: 'bold'}}>Sign Up</span></button>
                </div>
        </>
    )
}

export default Card;