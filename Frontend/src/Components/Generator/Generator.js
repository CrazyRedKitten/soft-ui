import React, { useContext, useState } from "react";
import SoftUIPreview from "./Generator_Components/Layout/SoftUIPreview/SoftUIPreview";
import SoftUIControlDesktop from "./Generator_Components/Layout/SoftUIControl/desktop/SoftUIControlDesktop";
import SoftUIControlMobile from "./Generator_Components/Layout/SoftUIControl/SoftUIControlMobile";
import OptionBar from "./Generator_Components/Layout/SoftUIControl/desktop/OptionBar";
import Generator_mobile from "./Generator_Components/Mobile/Generator_mobile";
import Generator_desktop from "./Generator_Components/Desktop/Generator_desktop";

//rgb 0 9 62 night sky color
// 1 161 255 rgb blue

//#DCFE4B yellow
// #8BD173 green
// #33D2D0 blue
// #04A883 green
//#ADC009 green

const Generator = () => {

    const viewportWidth = window.innerWidth
    function getContainerHeight(viewportWidth) {
        if(viewportWidth < 500){
            return <Generator_mobile />
        } else {
            return <Generator_desktop/>
        }
    }

    return (
      <div className={"container mb-5"}>
        <h3 className={'mb-3 mt-3 text-center text-sm-left'}>Soft-UI generator</h3>
          <div className={'row'}>
              <div className={'col-12'}>
                  <OptionBar/>
              </div>
          </div>
          {getContainerHeight(viewportWidth)}
      </div>
  );
};

export default Generator;
