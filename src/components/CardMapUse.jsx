import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CardMaping } from "./CardMaping";
import { Link } from "react-router-dom";
import CommonButton from "./common/CommonButton";

const CardMapUse = () => {
  return (
    <section className="py-5">
      <Container className="pb-lg-5 mb-lg-4 pt-lg-4">
        <Link to="/homepage">
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
        <h2
          className="text-center mb-4 pb-1 ff_open_sans fw-normal text_252B42 fs_2xlg mt-lg-5"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          Как “Invest Coin” работает?{" "}
        </h2>
        <p
          className="text-center ff_open_sans fw-normal text_222B32 fs_md mb-5 pb-5"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
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
        <Row>
          {CardMaping.map((data) => {
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
    </section>
  );
};

export default CardMapUse;
