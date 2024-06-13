import React from "react";
import CommonButton from "./CommonButton";

const CommonPoints = () => {
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-12 mb-lg-0 mb-4 d-flex">
          <div className="custom_cards d-flex flex-column">
            <h2 className="text-center fs_md">Lorem, ipsum.</h2>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              harum ipsam deleniti atque aliquid placeat modi praesentium
              perspiciatis obcaecati! Placeat.
            </p>
            <div className="d-flex justify-content-center mt-auto"><CommonButton className={"mx-auto"} linkButton={"Read More"}/></div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-12 mb-lg-0 mb-4 d-flex">
          <div className="custom_cards d-flex flex-column">
            <h2 className="text-center fs_md">Lorem, ipsum.</h2>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              neque tempore dignissimos deserunt dolorem autem numquam iure eos,
              quas facere eveniet, voluptatem dolor ratione reiciendis cumque
              quae sapiente, quia voluptatibus tenetur soluta quisquam ex. Iusto
              placeat ipsum numquam rem ullam!
            </p>
            <div className="d-flex justify-content-center mt-auto"><CommonButton className={"mx-auto"} linkButton={"Read More"}/></div>
          </div>
        </div>
        <div className="col-lg-4 justify-content-center col-12 d-flex">
          <div className="custom_cards d-flex flex-column">
            <h2 className="text-center fs_md">Lorem, ipsum.</h2>
            <p className="text-center">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
              tempore quia ad voluptatum odit! Aut dolorum itaque magni in saepe
              ipsum labore officiis magnam quisquam veniam alias sunt at nemo
              commodi non assumenda, ratione deleniti. Delectus obcaecati nihil
              consectetur, animi nam dignissimos voluptatibus! Sunt, obcaecati
              iusto accusantium nesciunt at quisquam!
            </p>
            <div className="d-flex justify-content-center mt-auto"><CommonButton className={"mx-auto"} linkButton={"Read More"}/></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPoints;
