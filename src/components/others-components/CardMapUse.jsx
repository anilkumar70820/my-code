import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CardMaping } from "../common/CardMaping";
import { Link } from "react-router-dom";
import CommonButton from "../common/CommonButton";
import Filter from "./Filter";

const CardMapUse = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredCards =
    selectedCategory === "All"
      ? CardMaping
      : CardMaping.filter((card) => card.type === selectedCategory);

  return (
    <section className="py-5">
      <Container className="pb-lg-5 mb-lg-4 pt-lg-4">
        <Link to="/homepage">
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
        <h2 className="text-center mb-4 pb-1 ff_open_sans fw-normal text_252B42 fs_2xlg mt-lg-5">
          Как “Invest Coin” работает?{" "}
        </h2>
        <p className="text-center ff_open_sans fw-normal text_222B32 fs_md mb-5 pb-5">
          Invest Coin - это команда оптыных инвесторов, аналитиков и
          программистов.{" "}
          <span className="d-lg-block">
            Мы работаем на площадках криптовалют (и не только) уже более 4 года
            и
          </span>{" "}
          имеем конкурентоспособное портфолио. Все встречи, общения и{" "}
          <span className="d-lg-block">
            договоренности с нашими партнерами (клиентами) проходят в прозрачной
          </span>{" "}
          форме.
        </p>

        <div className="d-flex align-items-center justify-content-between py-4 mb-5 border px-4 border-black">
          <button
            className={`common_btns ${
              selectedCategory === "All" ? "active_btns" : ""
            }`}
            onClick={() => handleCategoryChange("All")}
          >
            All
          </button>
          <button
            className={`common_btns ${
              selectedCategory === "calender" ? "active_btns" : ""
            }`}
            onClick={() => handleCategoryChange("calender")}
          >
            Calendar
          </button>
          <button
            className={`common_btns ${
              selectedCategory === "experience" ? "active_btns" : ""
            }`}
            onClick={() => handleCategoryChange("experience")}
          >
            Experience
          </button>
          <button
            className={`common_btns ${
              selectedCategory === "transprecy" ? "active_btns" : ""
            }`}
            onClick={() => handleCategoryChange("transprecy")}
          >
            Transparency
          </button>
        </div>
        <Row>
          {filteredCards.map((data) => {
            return (
              <Col
                key={data.id}
                lg={4}
                sm={6}
                xs={12}
                className="d-flex flex-column justify-content-center mb-5"
                data-aos="fade-right"
                data-aos-duration="1000"
                data-aos-delay="300"
              >
                <div className="invest_cards">
                  <div className="d-flex justify-content-center mb-3">
                    <img src={data.img} alt="coin" />
                  </div>
                  <h2 className="ff_open_sans fs_3xmd fw-bold text_252B42 text-center mb-4">
                    {data.heading}
                  </h2>
                  <p className="ff_open_sans fs_sm fw-normal text_222B32 text-center">
                    {data.paragraph}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Filter />
    </section>
  );
};

export default CardMapUse;
