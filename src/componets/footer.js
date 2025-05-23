import React from "react";
import '../style/footer.css'

function Footer() {
    return(
        <>
            <footer>
                <div className="footer_container">
                    <div className="sub_content">
                        <span className="main">500</span>
                        <span className="info">Customers in 2024</span>
                    </div>
                    <div className="sub_content">
                        <span className="main">27,000</span>
                        <span className="info">Books delivered</span>
                    </div>
                    <div className="sub_content">
                        <span className="main">100+</span>
                        <span className="info">Bestsellers</span>
                    </div>
                    <div className="sub_content">
                        <span className="main">20</span>
                        <span className="info">Events held</span>
                    </div> 
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', color: '#888' }}>
    © 2025 BookHaven. All rights reserved. | support@bookhaven.com
</div>

            </footer>
        </>
    )
}

export default Footer;