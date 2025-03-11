import React from "react";
import './section3.css'
import Card from "../componets/card";



function Section3() {
    return <>
            
        <div className="main-style">
            <h1>Pricing</h1>
            <p className="main-title">
                Choose the convenient option and plunge into the fantastic world of the best books!
            </p>
            <div className="card-content">
                <div className="card-style">
                    <Card title="Monthly" price = "$50" info1 = "per month" info2 = "pay for each month separately" info3 = "5 books per month" info4 = "unsubscribe any time"/>
                </div>
                <div className="card-style">
                    <Card title ="Annual" price="$500" info1 ="per year" info2="pay for 1 year at once and save" info3="5 books per month" info4="Free book club membership"/>
                </div>
            </div>
        </div>
        </>
}

export default Section3;