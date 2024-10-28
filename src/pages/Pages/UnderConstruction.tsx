import React from "react";
import { Card } from "react-bootstrap";

//import images
import underMaintenance from "../../assets/images/pages/img-under-maintenance.png";
import {Link} from "react-router-dom";
import FooterBlock from "../../Layout/FooterBlock";

const UnderConstruction = () => {
    return (
        <React.Fragment>
            <div className="auth-main v1">
                <div className="auth-wrapper">
                <div className="auth-form">
                    <div className="error-card">
                    <Card.Body>
                        <div className="error-image-block">
                        <img className="img-fluid" src={underMaintenance} alt="img" />
                        </div>
                        <div className="text-center">
                        <h1 className="mt-2">Under construction</h1>
                        <p className="mt-2 mb-4 text-muted f-20">We couldn’t find the page you were looking for. Why not try back to the Homepage.</p>
                        <Link className="btn btn-primary d-inline-flex align-items-center mb-3" to="/dashboard"><i className="ph-duotone ph-house me-2"></i> Back to Home</Link>              
                        </div>
                    </Card.Body>
                    </div>
                </div>
               
                    {/* FooterBlock */}
                    <FooterBlock />

                </div>
            </div>
        </React.Fragment>
    )
}


export default UnderConstruction;