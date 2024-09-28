import React, { useEffect } from "react";

const CustomService = () => {
  
  return (
    <div className="custom-service-container">
      <div className="custom-service-item">
        <section id="portfolio">
          <div className="project">
            
           
            <p>websites</p>
            <h3 className="grid__title"> front-end</h3>
            <div className="grid__overlay">
              <button className="viewbutton">view more</button>
            </div>
          </div>
          <div className="project">
           
            <p>pure css</p>
            <h3 className="grid__title"> front-end</h3>
            <div className="grid__overlay">
              <button className="viewbutton">view more</button>
            </div>
          </div>
          <div className="project">
           
            <p>web apps</p>
            <h3 className="grid__title"> full-stack</h3>
            <div className="grid__overlay">
              <button className="viewbutton">view more</button>
            </div>
          </div>
          <div className="project">
           
            <p>daily ui</p>
            <h3 className="grid__title"> ui/ux design</h3>
            <div className="grid__overlay">
              <button className="viewbutton">view more</button>
            </div>
          </div>
         
          <div className="overlay">
            <div className="overlay__inner">
              <button className="close">close X</button>
              <img />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomService;
