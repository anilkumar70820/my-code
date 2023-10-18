import React from 'react'

const Progreesbar = () => {
     window.onscroll = function () {
       myFunction();
     };
     function myFunction() {
       let winScroll =
         document.body.scrollTop || document.documentElement.scrollTop;
       let height =
         document.documentElement.scrollHeight -
         document.documentElement.clientHeight;
       let scrolled = (winScroll / height) * 100;
       document.getElementById("scrollPage").style.width = scrolled + "%";
     }

  return (
    <>
      <section>
        <div className="header">
          <div className="windowscroll">
            <div className="windowscrollcolor" id="scrollPage"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Progreesbar