import React, {Fragment, useContext} from "react";
import Input from "../../../../Layout/Input";
import ThemeContext from "../../../../../../../contexts/theme/ThemeContext";


const HEXinput = () => {

    const themeContext = useContext(ThemeContext);
    const {font, colorRGB, colorHEX, shadows, shadowBlur, shadowLength, changeColor} = themeContext;

    const onChangeColor = (event, hexOrRGBColorName) => changeColor(hexOrRGBColorName, event.target.value);

    const {Red, Green, Blue} = colorRGB;

    const lighterShadows = shadows.ligherShadowArray;
    const darkerShadows = shadows.darkerShadowArray;
    const mainColor = `rgb(${Red}, ${Green}, ${Blue})`;
    const lighterShadow = `rgb(${lighterShadows[0]}, ${lighterShadows[1]}, ${lighterShadows[2]})`;
    const darkerShadow = `rgb(${darkerShadows[0]}, ${darkerShadows[1]}, ${darkerShadows[2]})`;


    const componentProps = {
        mainColor: mainColor,
        font: font,
        Blur: shadowBlur,
        shadowLength: shadowLength,
        darkerShadow: darkerShadow,
        lighterShadow: lighterShadow,
    };

    return(
        <div style={{display:'inline-block',
            borderRadius:'12px',
            boxShadow:`5px 5px 30px 0 ${darkerShadow}, -5px -5px 30px 0 ${lighterShadow}`,
        }}>
            <div style={{display:'inline-block', padding:'13px',paddingRight:'0',borderRadius:'12px',
                borderTopRightRadius:'0',borderBottomRightRadius:'0',fontWeight:'bold'
            }}>#</div>
            <div style={{display:'inline-block', padding:'9px',borderRadius:'12px',
                borderTopLeftRadius:'0',borderBottomLeftRadius:'0'
            }}>
                <Input
                    onChange={(event) => onChangeColor(event, "Hex")}
                    value={colorHEX}
                    style={{width:'100px', height:'32px', border: "0px",marginBottom:'0',textAlign:'center',
                        borderRadius:'6px'}}
                    placeholder={"#000000"}
                    props={componentProps}
                />
            </div>
        </div>
    )
};

export default HEXinput;