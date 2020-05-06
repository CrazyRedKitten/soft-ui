import React, {Fragment, useContext, useState} from "react";
import ThemeContext from "../../../../../../../contexts/theme/ThemeContext";
import {calculateTintAndShades, fontColor, getRandomInt, hexToRGB, toHex} from "../../../../../../../Functions";
import ColorPickerSketch from "../../../../ColorPickers/colorPickerSketch";
import StagesContext from "../../../../../../../contexts/Stages/StagesContext";
import Badge from "../../../../../../Badge/Badge.component";
import Button from "../../../../Layout/Button";
import Input from "../../../../Layout/Input";
import Card from "../../../../Layout/Card";
import ColorInput from "./ColorInput";

const ControlStageChooseColor = () => {
    const themeContext = useContext(ThemeContext);
    const {
        colorRGB,
        shadows,
        changeColor,
        darkShadowFactor,
        lightShadowFactor,
        resetTheme,
        inverseFont,
        darkModeFactor,
        changeDarkModeFactor,
        darkModeDarkShadowFactor, darkModeLightShadowFactor,
        changeDarkModeDarkShadowFactor, changeDarkModeLightShadowFactor,} = themeContext;

    const stagesContext = useContext(StagesContext);
    const {generateDarkMode, changeGenerateDarkMode} = stagesContext;

    const {Red, Green, Blue} = colorRGB;

    const lighterShadows = shadows.ligherShadowArray;
    const darkerShadows = shadows.darkerShadowArray;
    const mainColor = `rgb(${Red}, ${Green}, ${Blue})`;
    const lighterShadow = `rgb(${lighterShadows[0]}, ${lighterShadows[1]}, ${lighterShadows[2]})`;
    const darkerShadow = `rgb(${darkerShadows[0]}, ${darkerShadows[1]}, ${darkerShadows[2]})`;

    const HEX = `${toHex(Red)}${toHex(Green)}${toHex(Blue)}`;

    const lightShadowForSVG =() => {
        if (HEX === "FFFFFF"){
            return calculateTintAndShades(Red,Green,Blue,95)
        }
        else {
            return `#${toHex(lighterShadows[0])}${toHex(lighterShadows[1])}${toHex(lighterShadows[2])}`;
        }
    }

    // True for Hex and False for RGB
    const [colorInputMode, setColorInputMode] = useState(false);

    const onChangeDarkMode = () => changeGenerateDarkMode();

    const onChangeDarkModeFactor = (event) => changeDarkModeFactor(event.target.value);

    const onChangeDarkModeDarkShadowFactor = (event) => changeDarkModeDarkShadowFactor(event.target.value);

    const onChangeDarkModeLightShadowFactor = (event) => {
        console.log('OnchangeDarkModeLightShadow',event.target.value)
        changeDarkModeLightShadowFactor(event.target.value);
    }

    const generateRandom = () => {
        let rgbObject = {
            Red:getRandomInt(255),
            Green:getRandomInt(255),
            Blue:getRandomInt(255)
        }
        changeColor('RGB', rgbObject);
    }

    const darkModeBackground = calculateTintAndShades(Red, Green, Blue, Math.round(darkModeFactor * 100))
    const darkmodeDarkShadowFactor = Math.round(Math.round(darkModeFactor * 100) *  darkModeDarkShadowFactor);
    const darkmodeLightShadowFactor = Math.round(Math.round(darkModeFactor * 100) *  darkModeLightShadowFactor);

    const {
        Red: darkModeRed,
        Green: darkModeGreen,
        Blue: darkModeBlue} = hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeDarkShadowFactor));

    const darkModeDarkShadow = () => {
        let {Red: red, Green: green, Blue: blue} =
            hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeDarkShadowFactor))

        return calculateTintAndShades(red,green,blue,Math.round(darkShadowFactor * 100))
    }
    const darkModeLightShadow = () => {
        let {Red: red, Green: green, Blue: blue} =
            hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeLightShadowFactor))

        return calculateTintAndShades(red,green,blue,Math.round(lightShadowFactor * 100))
    }

    const darkModeFont = fontColor( darkModeRed, darkModeGreen, darkModeBlue)


    const darkModeSettings = (
        <Card background={darkModeBackground}
              color={darkModeFont}
        >
            <div className={"row"}>
                <div className={"col-md-4"}>
                    <h6>
                        <Badge background={darkModeDarkShadow()}>Dark mode  %</Badge>
                    </h6>
                    <Input
                        color={darkModeFont}
                        background={darkModeBackground}
                        lightShadow={darkModeLightShadow()}
                        darkShadow={darkModeDarkShadow()}
                        type={'number'}
                        style={{marginBottom:0}}
                        onChange={(event) => onChangeDarkModeFactor(event)}
                        value={Math.round(darkModeFactor * 100)}
                        placeholder={"#000000"}/>
                </div>
                <div className={"col-md-4"}>
                    <h6>
                        <Badge background={darkModeDarkShadow()}>Dark Shadow %</Badge>
                    </h6>
                    <Input
                        color={darkModeFont}
                        background={darkModeBackground}
                        lightShadow={darkModeLightShadow()}
                        darkShadow={darkModeDarkShadow()}
                        type={'number'}
                        style={{marginBottom:0}}
                        onChange={(event) => onChangeDarkModeDarkShadowFactor(event)}
                        value={Math.round(darkModeDarkShadowFactor * 100)}
                        placeholder={"#000000"}
                    />
                </div>
                <div className={"col-md-4"}>
                    <h6>
                        <Badge background={darkModeDarkShadow()}>Light shadow %</Badge>
                    </h6>
                    <Input
                        color={darkModeFont}
                        background={darkModeBackground}
                        lightShadow={darkModeLightShadow()}
                        darkShadow={darkModeDarkShadow()}
                        type={'number'}
                        style={{marginBottom:0}}
                        onChange={(event) => onChangeDarkModeLightShadowFactor(event)}
                        value={Math.round(darkModeLightShadowFactor * 100)}
                        placeholder={"#000000"}
                    />
                </div>
        </div>
        </Card>
    );

    return (
        <Fragment>
            <div className={'mb-3'}>
                <Card
                    type={'top'}
                    style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <svg width="10%" height="10%" viewBox="0 0 173 173" style={{fillRule:'evenodd',clipRule:'evenodd',strokeLinejoin:'round',strokeMiterlimit:2}}>
                        <path id="BottomShadow" d="M155.311,28.461c10.358,6.678 17.223,18.317 17.223,31.547l0,75.017c0,20.702 -16.807,37.509 -37.509,37.509l-75.017,0c-13.215,0 -24.844,-6.85 -31.525,-17.19c5.851,3.773 12.815,5.962 20.286,5.962l75.017,0c20.701,0 37.508,-16.807 37.508,-37.509l0,-75.016c0,-7.486 -2.197,-14.462 -5.983,-20.32Z"
                              style={{fill:`#${toHex(darkerShadows[0])}${toHex(darkerShadows[1])}${toHex(darkerShadows[2])}`}}/>
                        <path id="TopShadow" d="M17.209,144.064c-10.351,-6.68 -17.209,-18.315 -17.209,-31.539l0,-75.017c0,-20.701 16.807,-37.508 37.508,-37.508l75.017,0c13.239,0 24.885,6.873 31.56,17.242c-5.853,-3.777 -12.822,-5.97 -20.299,-5.97l-75.017,0c-20.701,0 -37.508,16.807 -37.508,37.509l0,75.016c0,7.463 2.184,14.42 5.948,20.267Z"
                              style={{fill:lightShadowForSVG()}}/>
                        <path d="M144.085,57.385c0,-15.952 -12.951,-28.904 -28.904,-28.904l-57.808,0c-15.952,0 -28.903,12.952 -28.903,28.904l0,57.808c0,15.952 12.951,28.904 28.903,28.904l57.808,0c15.953,0 28.904,-12.952 28.904,-28.904l0,-57.808Z"
                              style={{fill: lightShadowForSVG()}}/>
                    </svg>
                </Card>
                <Card
                    type={'bottom'}
                >
                    <div className={"row"}>
                        <div className={"col-6 mr-3"}>
                            <h5>Pick a color:</h5>
                        </div>
                    </div>
                    <div className={'row mb-3'}>
                        <div className={'col-2'}>
                            <ColorPickerSketch />
                        </div>
                        <div className={'col-6'}>
                            <Button onClick={generateRandom} children={'Random color'}/>
                        </div>
                        <div className={'col-4'}>
                            <Button onClick={resetTheme} children={'Reset'}/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'mb-3 col-md-4'}>
                            <Button
                                style={{height:'50px'}}
                                onClick={() =>setColorInputMode(!colorInputMode)}
                                children={ colorInputMode ? "Hex" :'RGB'}/>
                        </div>
                        <div className={'col-md-8'}>
                            <ColorInput inputMode={colorInputMode}/>
                        </div>
                    </div>
                    <div className={"row mt-3 mb-3"}>
                        <div className={"col-12"}>
                            <Button
                                onClick={() => inverseFont()}
                                children={'Inverse font color'}
                            />
                        </div>
                    </div>
                    <div className={"row mb-3"}>
                        <div className={'col-12'}>
                            <Badge background={darkerShadow}>
                                Generate darkmode{" "}
                                <input
                                    type={'checkbox'}
                                    onChange={() => onChangeDarkMode()}
                                    checked={generateDarkMode}
                                />
                            </Badge>
                        </div>
                    </div>
                </Card>
            </div>
            {generateDarkMode && darkModeSettings}
        </Fragment>
    )
}

export default ControlStageChooseColor;