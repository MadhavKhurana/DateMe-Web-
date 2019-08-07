import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Match extends React.Component {
    render() {
        const settings = {
            className: "slider variable-width",
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true
        };

        return (
            <div>
                <div
                    className="w3-content w3-margin-top"
                    style={{ maxWidth: "1400px" }}
                >
                    <div className="w3-row-padding row">
                        <div className="col-md-3" />
                        <div className="w3 col-md-6">
                            <h3 align="center">Find A Mate</h3> <br />
                            <div className="w3-white w3-text-grey w3-card-4">
                                <div className="w3-display-container">
                                    <div
                                        id="demo"
                                        className="carousel slide"
                                        data-ride="carousel"
                                    >
                                        <ul className="carousel-indicators">
                                            <li
                                                data-target="#demo"
                                                data-slide-to="0"
                                                className="active"
                                            />
                                            <li
                                                data-target="#demo"
                                                data-slide-to="1"
                                            />
                                            <li
                                                data-target="#demo"
                                                data-slide-to="2"
                                            />
                                            <li
                                                data-target="#demo"
                                                data-slide-to="3"
                                            />
                                            <li
                                                data-target="#demo"
                                                data-slide-to="4"
                                            />
                                            <li
                                                data-target="#demo"
                                                data-slide-to="5"
                                            />
                                        </ul>

                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img
                                                    src="4by3.png"
                                                    alt="Avatar"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    src="pic2.jpg"
                                                    alt="Avatar"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    src="pic3.jpg"
                                                    alt="Avatar"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    src="pic4.jpg"
                                                    alt="Avatar"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    src="pic5.jpg"
                                                    alt="Avatar"
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img
                                                    src="pic6.jpg"
                                                    alt="Avatar"
                                                />
                                            </div>
                                        </div>

                                        <a
                                            className="carousel-control-prev"
                                            href="#demo"
                                            data-slide="prev"
                                        >
                                            <span className="carousel-control-prev-icon" />
                                        </a>
                                        <a
                                            className="carousel-control-next"
                                            href="#demo"
                                            data-slide="next"
                                        >
                                            <span className="carousel-control-next-icon" />
                                        </a>
                                    </div>
                                    <div align="center">
                                        <br />
                                        <div />
                                        <h2>Madhav Khurana, 19</h2>
                                    </div>
                                </div>
                                <div className="w3-container">
                                    <div align="center" className="row">
                                        <div className="col-md-3" />
                                        <Slider
                                            className="slider "
                                            {...settings}
                                        >
                                            <div style={{ width: 100 }}>
                                                <button className="btn btn-success">
                                                    <i className="fas fa-times-circle fa-3x " />
                                                </button>
                                            </div>

                                            <div style={{ width: 100 }}>
                                                <button className="btn btn-primary">
                                                    <i className="fas fa-star fa-3x" />
                                                </button>
                                            </div>

                                            <div style={{ width: 100 }}>
                                                <button className="btn btn-danger">
                                                    <i className="fab fa-3x fa-gratipay" />
                                                </button>
                                            </div>
                                        </Slider>
                                    </div>
                                    <p>
                                        <br />I like to talk about things you
                                        are not supposed to do in a polite
                                        company.
                                        <br />
                                        <br />
                                        Wanderlust and Optimist.
                                        <br />
                                        PHILOSOPHICAL EXTROVERT
                                        <br />
                                        <br /> And also FOOD == LOVE.
                                    </p>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Match;
