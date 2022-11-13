import React, { useEffect } from 'react';
import { Row, Col, Card, Progress, Icon, Button } from 'antd';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import IsoWidgetsWrapper from '../../../containers/Widgets/WidgetsWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import "./Front.scss";

const styles = {
    wisgetPageStyle: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
};

export default function () {
    
    let history = useHistory();
    const { rowStyle, colStyle } = basicStyle;
    const [color1, setColor1] = React.useState(false);
    const [color2, setColor2] = React.useState(false);
    const [color3, setColor3] = React.useState(false);
    const [color4, setColor4] = React.useState(false);
    const [color5, setColor5] = React.useState(false);


    const handleColorChange1 = () => {
        setColor1(!color1);
    }
    const handleColorChange2 = () => {
        setColor2(!color2);
    }
    const handleColorChange3 = () => {
        setColor3(!color3);
    }
    const handleColorChange4 = () => {
        setColor4(!color4);
    }
    const handleColorChange5 = () => {
        setColor5(!color5);
    }

    return (
        <LayoutWrapper>

            <Row style={rowStyle} gutter={0} justify="start" className='isoFront'>
                <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>

                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "auto" }}>
                        <Button type={'primary'} onClick={() => history.push("/SignIn")}>
                            <IntlMessages id="page.signInButton" />
                        </Button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "80px", width: "100%" }}>

                        <Button className={color1 ? "secondary" : "primary"} style={{ width: "250px", height: "250px" }} onClick={() => handleColorChange1()}>
                            <IntlMessages id="page.laneButton1" />
                        </Button>

                        <Button className={color2 ? "secondary" : "primary"} style={{ width: "250px", height: "250px" }} onClick={() => handleColorChange2()}>
                            <IntlMessages id="page.laneButton2" />
                        </Button>

                        <Button className={color3 ? "secondary" : "primary"} style={{ width: "250px", height: "250px" }} onClick={() => handleColorChange3()}>
                            <IntlMessages id="page.laneButton3" />
                        </Button>

                        <Button className={color4 ? "secondary" : "primary"} style={{ width: "250px", height: "250px" }} onClick={() => handleColorChange4()}>
                            <IntlMessages id="page.laneButton4" />
                        </Button>

                        <Button className={color5 ? "secondary" : "primary"} style={{ width: "250px", height: "250px" }} onClick={() => handleColorChange5()}>
                            <IntlMessages id="page.laneButton5" />
                        </Button>

                    </div>
                </Col>
            </Row>
        </LayoutWrapper>
    );
}
