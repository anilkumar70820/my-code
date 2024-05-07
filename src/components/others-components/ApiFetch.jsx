import React, { useEffect, useState } from "react";
import CommonButton from "../common/CommonButton";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const ApiFetch = () => {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/50") // Fetching 10 random images
      .then((response) => response.json())
      .then((data) => setDogImages(data.message))
      .catch((error) => console.error("Error fetching dog images:", error));
  }, []);
  return (
    <div className="py-5">
      <Container>
        <Link to="/homepage">
          <CommonButton linkButton={"Back"} className={"mb-4"} />
        </Link>
        <h1 className="text-center mb-4">== Api Fetch Start Here ==</h1>
        <div className="d-flex justify-content-center flex-wrap">
          {dogImages.map((dog, index) => (
            <img
              key={index}
              width="200px"
              height="200px"
              src={dog}
              alt={`dog-${index}`}
            />
          ))}
        </div>
        <h1 className="text-center my-4">^^ Api Fetch End Here ^^</h1>
      </Container>
    </div>
  );
};

export default ApiFetch;
