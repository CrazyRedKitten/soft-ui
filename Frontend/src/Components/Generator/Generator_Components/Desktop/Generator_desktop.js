import React from "react";
import SoftUIPreviewDesktop from "./desktop_components/SoftUIPreviewDesktop";
import SoftUIControlDesktop from "./desktop_components/SoftUIControlDesktop";


const Generator_desktop = () => {

    return(
        <div>
            <div className='row' style={{ marginRight: "0px", marginLeft: "0px" }}>
                <div className={"col-md-6"}>
                    <SoftUIPreviewDesktop/>
                </div>
                <div className={"col-md-6"}>
                    <SoftUIControlDesktop/>
                </div>
            </div>
        </div>
    )
}

export default Generator_desktop;