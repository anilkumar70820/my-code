import React from "react";
import { Accordion } from "react-bootstrap";

const Faq = () => {
  return (
    <section className="bg-black faq_bg py-5 position-relative">
      <div className="my_container mb-lg-5 pb-lg-5 z-1 position-relative">
        <h2
          className="headings text-center mb-5 pb-2"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          FAQs
        </h2>
        <div className="d-flex justify-content-center mb-5 pb-5">
          <Accordion
            defaultActiveKey="0"
            className="width-896 mb-5 pb-5"
            data-aos="zoom-in"
            data-aos-duration="2000"
          >
            <Accordion.Item eventKey="1" className="w-100 bg-transparent">
              <Accordion.Header className="text-white">
                Arcu faucibus diam feugiat magna etiam.
              </Accordion.Header>
              <Accordion.Body className="text_ffffff fs_sm fw-normal ff_montserrat">
                Arcu faucibus diam feugiat magna etiam. Leo ridiculus mauris,
                risus vitae luctus volutpat turpis. Nisl, consequat tellus
                laoreet viverra diam nulla. Etiam vitae, proin Leo at nibh nibh.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="w-100 bg-transparent">
              <Accordion.Header>Fermentum tortor aenean.</Accordion.Header>
              <Accordion.Body className="text_ffffff fs_sm fw-normal ff_montserrat">
                Arcu faucibus diam feugiat magna etiam. Leo ridiculus mauris,
                risus vitae luctus volutpat turpis. Nisl, consequat tellus
                laoreet viverra diam nulla. Etiam vitae, proin Leo at nibh nibh.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className="w-100 bg-transparent">
              <Accordion.Header>Dictum est amet sollicitudin.</Accordion.Header>
              <Accordion.Body className="text_ffffff fs_sm fw-normal ff_montserrat">
                Arcu faucibus diam feugiat magna etiam. Leo ridiculus mauris,
                risus vitae luctus volutpat turpis. Nisl, consequat tellus
                laoreet viverra diam nulla. Etiam vitae, proin Leo at nibh nibh.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" className="w-100 bg-transparent">
              <Accordion.Header>Sed vulputate mi faucibus.</Accordion.Header>
              <Accordion.Body className="text_ffffff fs_sm fw-normal ff_montserrat">
                Arcu faucibus diam feugiat magna etiam. Leo ridiculus mauris,
                risus vitae luctus volutpat turpis. Nisl, consequat tellus
                laoreet viverra diam nulla. Etiam vitae, proin Leo at nibh nibh.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5" className="w-100 bg-transparent">
              <Accordion.Header>Commodo placerat ultricies.</Accordion.Header>
              <Accordion.Body className="text_ffffff fs_sm fw-normal ff_montserrat">
                Arcu faucibus diam feugiat magna etiam. Leo ridiculus mauris,
                risus vitae luctus volutpat turpis. Nisl, consequat tellus
                laoreet viverra diam nulla. Etiam vitae, proin Leo at nibh nibh.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6" className="w-100 bg-transparent">
              <Accordion.Header>Nunc amet cursus morbi donec.</Accordion.Header>
              <Accordion.Body className="text_ffffff fs_sm fw-normal ff_montserrat">
                Arcu faucibus diam feugiat magna etiam. Leo ridiculus mauris,
                risus vitae luctus volutpat turpis. Nisl, consequat tellus
                laoreet viverra diam nulla. Etiam vitae, proin Leo at nibh nibh.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
