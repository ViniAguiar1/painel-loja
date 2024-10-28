import React, { useState } from "react";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { contactSearchData } from "../../Common/jsonData";
import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";


interface ContactItem {
    color: any;
    img: any;
    name: string;
}

const ContactSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredResults, setFilteredResults] = useState<ContactItem[]>(contactSearchData);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterResults(query);
    };

    const filterResults = (query: string) => {
        const filtered = contactSearchData.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredResults(filtered);
    };

    return (
        <>
            <BreadcrumbItem mainTitle="Ui kit" subTitle="Contact Search" />
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardHeader>
                            <Row className="align-items-center">
                                <Col>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="ti ti-search"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search a Keyword"
                                            onChange={handleSearchInputChange}
                                            value={searchQuery}
                                        />
                                    </div>
                                </Col>
                                <div className="col-auto">
                                    <button className="btn btn-primary" type="button">Search</button>
                                </div>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row className="align-items-center justify-content-between gy-2">
                                <div className="col-sm-auto">
                                    <h5 className="mb-0">Recently Searched Contact</h5>
                                </div>
                                <div className="col-sm-auto">
                                    <select className="form-select">
                                        <option>Filter </option>
                                        <option>Hits: High To Low</option>
                                        <option>Hits: Low To High</option>
                                        <option>Popularity</option>
                                        <option>Fresh Arrivals</option>
                                    </select>
                                </div>
                            </Row>
                            <hr className="my-4" />
                            <Row>
                                {(filteredResults || []).map((item: ContactItem, key: number) => (
                                    <Col md={6} xxl={4} key={key}>
                                        <Card className="border shadow-none">
                                            <CardBody>
                                                <div className="text-center">
                                                    <div className="chat-avtar d-inline-flex">
                                                        <img
                                                            className="rounded-circle img-thumbnail img-fluid wid-80"
                                                            src={item.img} alt="User image" />
                                                        <i className={`chat-badge bg-${item.color} mb-2 me-2`}></i>
                                                    </div>
                                                    <div className="my-3">
                                                        <h5 className="mb-0">{item.name}</h5>
                                                        <p className="mb-0">DM on <a href="#" className="link-primary">@williambond</a>😍</p>
                                                    </div>
                                                </div>
                                                <Row className="g-2">
                                                    <div className="col-6"><div className="d-grid"><button className="btn btn-primary">Accept</button></div></div>
                                                    <div className="col-6"><div className="d-grid"><button className="btn btn-outline-secondary">Decline</button></div></div>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}



export default ContactSearch;