import React, {  useEffect, useState } from "react";

//import images
import imgSoon from "../../assets/images/pages/img-soon.png";
import FooterBlock from "../../Layout/FooterBlock";
import { CardBody, Col, Row } from "react-bootstrap";

const ComingSoon = () => {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        const countDownDate = new Date(d).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(daysRemaining);
            setHours(hoursRemaining);
            setMinutes(minutesRemaining);
            setSeconds(secondsRemaining);

            if (distance < 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <React.Fragment>
            <div className="auth-main v1">
                <div className="auth-wrapper">
                    <div className="auth-form">
                        <div className="container">
                            <CardBody className="soon-card">
                                <Row className="justify-content-center align-items-center">
                                    <Col lg={6} className="text-center">
                                        <img className="img-fluid" src={imgSoon} alt="img" />
                                    </Col>
                                    <Col lg={6} xl={4}>
                                        <div className="text-center">
                                            <h1 className="mt-2">Coming soon</h1>
                                            <p className="mt-2 mb-4 text-muted f-20">Something new is on it&apos;s way</p>
                                        </div>
                                        <Row className="g-3 timer-block mt-4 justify-content-center" id="timer-block">
                                            <div className="col-auto">
                                                <span className="avtar card avtar-xl">{days}</span>
                                            </div>
                                            <div className="col-auto">
                                                <span className="avtar card avtar-xl">{hours}</span>
                                            </div>
                                            <div className="col-auto">
                                                <span className="avtar card avtar-xl">{minutes}</span>
                                            </div>
                                            <div className="col-auto">
                                                <span className="avtar card avtar-xl">{seconds}</span>
                                            </div>
                                        </Row>
                                        <Row className="g-3 d-flex align-items-center mt-4">
                                            <Col>
                                                <input type="email" className="form-control" placeholder="Email Address" />
                                            </Col>
                                            <div className="col-auto">
                                                <div className="d-grid">
                                                    <button className="btn btn-primary d-flex align-items-center"><i className="ti ti-bell-ringing me-2"></i>Notify Me</button>
                                                </div>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </div>
                    </div>

                    {/* FooterBlock */}
                    <FooterBlock />


                </div>
            </div>
        </React.Fragment>
    )
}



export default ComingSoon;