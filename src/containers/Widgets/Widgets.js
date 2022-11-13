import React, { useEffect } from 'react';
import clone from 'clone';
import { Row, Col, Card, Progress, Icon, Button } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import IsoWidgetsWrapper from './WidgetsWrapper';
import IsoWidgetBox from './WidgetBox';
import CardWidget from './Card/CardWidget';
import ProgressWidget from './Progress/ProgressWidget';
import SingleProgressWidget from './Progress/ProgressSingle';
import ReportsWidget from './Report/ReportWidget';
import StickerWidget from './Sticker/StickerWidget';
import SaleWidget from './Sale/SaleWidget';
import VCardWidget from './vCard/vCardWidget';
import SocialWidget from './SocialWidget/SocialWidget';
import SocialProfile from './SocialWidget/SocialProfileIcon';
import userpic from '@iso/assets/images/user1.png';
import { isServer } from '@iso/lib/helpers/isServer';
import { FileTwoTone, EllipsisOutlined } from '@ant-design/icons';
import './WIdget.scss';

import {
  TableViews,
  tableinfos,
  dataList,
} from '../Tables/AntTables/AntTables';
import * as rechartConfigs from '../Charts/Recharts/config';
import StackedAreaChart from '../Charts/Recharts/Charts/StackedAreaChart';
import GoogleChart from 'react-google-charts';
import * as googleChartConfigs from '../Charts/GoogleChart/config';
import IntlMessages from '@iso/components/utility/intlMessages';
import firebase from 'firebase';
import WidgetBox from './WidgetBox';
import WidgetsWrapper from './WidgetsWrapper';

const tableDataList = clone(dataList);
tableDataList.size = 5;
const styles = {
  wisgetPageStyle: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
    width:"100%"
  },
};
const SIGNLE_PROGRESS_WIDGET = [
  {
    label: 'widget.singleprogresswidget1.label',
    percent: 70,
    barHeight: 7,
    status: 'active',
    info: true,
  },
  {
    label: 'widget.singleprogresswidget2.label',
    percent: 80,
    barHeight: 7,
    status: 'active',
    info: true,
  },
  {
    label: 'widget.singleprogresswidget3.label',
    percent: 40,
    barHeight: 7,
    status: 'active',
    info: true,
  },
  {
    label: 'widget.singleprogresswidget4.label',
    percent: 60,
    barHeight: 7,
    status: 'active',
    info: true,
  },
];

const STICKER_WIDGET = [
  {
    number: 'widget.stickerwidget1.number',
    text: 'widget.stickerwidget1.text',
    icon: 'ion-email-unread',
    fontColor: '#ffffff',
    bgColor: '#7266BA',
  },
  {
    number: 'widget.stickerwidget1.number',
    text: 'widget.stickerwidget2.text',
    icon: 'ion-android-camera',
    fontColor: '#ffffff',
    bgColor: '#42A5F6',
  },
  {
    number: 'widget.stickerwidget1.number',
    text: 'widget.stickerwidget3.text',
    icon: 'ion-chatbubbles',
    fontColor: '#ffffff',
    bgColor: '#7ED320',
  },
  {
    number: 'widget.stickerwidget1.number',
    text: 'widget.stickerwidget4.text',
    icon: 'ion-android-cart',
    fontColor: '#ffffff',
    bgColor: '#F75D81',
  },
];

const SALE_WIDGET = [
  {
    label: 'widget.salewidget1.label',
    icon: 'ion-android-cart',
    price: 'widget.salewidget1.price',
    details: 'widget.salewidget1.details',
    fontColor: '#F75D81',
  },
  {
    label: 'widget.salewidget2.label',
    icon: 'ion-android-cart',
    price: 'widget.salewidget2.price',
    details: 'widget.salewidget2.details',
    fontColor: '#F75D81',
  },
  {
    label: 'widget.salewidget3.label',
    icon: 'ion-android-cart',
    price: 'widget.salewidget3.price',
    details: 'widget.salewidget3.details',
    fontColor: '#F75D81',
  },
  {
    label: 'widget.salewidget4.label',
    icon: 'ion-android-cart',
    price: 'widget.salewidget4.price',
    details: 'widget.salewidget4.details',
    fontColor: '#F75D81',
  },
];

const CARD_WIDGET = [
  {
    icon: 'ion-android-chat',
    iconcolor: '#42A5F5',
    number: 'widget.cardwidget1.number',
    text: 'widget.cardwidget1.text',
  },
  {
    icon: 'ion-music-note',
    iconcolor: '#F75D81',
    number: 'widget.cardwidget2.number',
    text: 'widget.cardwidget2.text',
  },
  {
    icon: 'ion-trophy',
    iconcolor: '#FEAC01',
    number: 'widget.cardwidget3.number',
    text: 'widget.cardwidget3.text',
  },
];

const PROGRESS_WIDGET = [
  {
    label: 'widget.progresswidget1.label',
    details: 'widget.progresswidget1.details',
    icon: 'ion-archive',
    iconcolor: '#4482FF',
    percent: 50,
    barHeight: 7,
    status: 'active',
  },
  {
    label: 'widget.progresswidget2.label',
    details: 'widget.progresswidget2.details',
    icon: 'ion-pie-graph',
    iconcolor: '#F75D81',
    percent: 80,
    barHeight: 7,
    status: 'active',
  },
  {
    label: 'widget.progresswidget3.label',
    details: 'widget.progresswidget3.details',
    icon: 'ion-android-download',
    iconcolor: '#494982',
    percent: 65,
    barHeight: 7,
    status: 'active',
  },
];

const SOCIAL_PROFILE = [
  {
    url: '#',
    icon: 'ion-social-facebook',
    iconcolor: '#3b5998',
  },
  {
    url: '#',
    icon: 'ion-social-twitter',
    iconcolor: '#00aced',
  },
  {
    url: '#',
    icon: 'ion-social-googleplus',
    iconcolor: '#dd4b39',
  },
  {
    url: '#',
    icon: 'ion-social-linkedin-outline',
    iconcolor: '#007bb6',
  },
  {
    url: '#',
    icon: 'ion-social-dribbble-outline',
    iconcolor: '#ea4c89',
  },
];
const { Meta } = Card;

export default function () {
  const { rowStyle, colStyle } = basicStyle;
  const [vehicleData, setVehicleData] = React.useState([]); 
  const [policeCar, setPoliceCar] = React.useState([]);
  const [color1, setColor1] = React.useState(false);
  const [color2, setColor2] = React.useState(false);
  const [color3, setColor3] = React.useState(false);
  const [color4, setColor4] = React.useState(false);
  const [color5, setColor5] = React.useState(false);
  const [vipCar, setVipCar] = React.useState([]);
  const [ambulance, setAmbulance] = React.useState([]);
  const [fireBrigade, setFireBrigade] = React.useState([]);


  useEffect(() => {

    const wordRef = firebase.database().ref("TData");
    wordRef.on("value", (snapshot) => {
      let words = snapshot.val();

      let newState = [];
      let policeCarLength = [...policeCar];
      let vipCarLength = [...vipCar];
      let ambulanceLength = [...ambulance];
      let firebrigadeLength = [...fireBrigade];

      for (let key in words) {
        newState.push({
          vehicle: words[key].Vehicle,
        })

        if (words[key].Vehicle === "PoliceCar") {
          policeCarLength.push(words[key].Vehicle)
        } else if (words[key].Vehicle === "VipCar") {
          vipCarLength.push(words[key].Vehicle)
        } else if (words[key].Vehicle === "Ambulancce") {
          ambulanceLength.push(words[key].Vehicle)
        } else if (words[key].Vehicle === "FireBrigade") {
          firebrigadeLength.push(words[key].Vehicle)
        } else {
          console.log("")
        }

      }

      setVehicleData(newState);
      setPoliceCar(policeCarLength);
      setVipCar(vipCarLength);
      setAmbulance(ambulanceLength);
      setFireBrigade(firebrigadeLength);

    })
  }, []);
  setTimeout(() => console.log(vehicleData, policeCar), 5000);

  const chartEvents = [
    {
      eventName: 'select',
      callback(Chart) { },
    },
  ];

  const stackConfig = {
    ...rechartConfigs.StackedAreaChart,
    width: !isServer && window.innerWidth < 450 ? 300 : 500,
  };

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
      <div style={styles.wisgetPageStyle}>
        
      <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
           <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
              <p>My Files</p>
              <Button type="primary">
                <IntlMessages id="page.addButton" />
              </Button>
              </div>
            </IsoWidgetsWrapper>
          </Col>
        </Row>


        <Row style={rowStyle} gutter={0} justify="start" >

          <Col lg={6} md={12} sm={12} xs={24} style={{ padding: "10px 10px" }} >
            <Card
              bordered={false} style={{ width: "100%" }}>
              <Meta
                description={[
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <FileTwoTone />
                    <EllipsisOutlined rotate={90} />
                  </div>
                ]}
              />

              <p style={{ marginTop: "20px", marginBottom: "10px" }}>Ambulance</p>
              <Progress percent={(ambulance.length / vehicleData.length) * 100} showInfo={false} />
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                <p>Files</p>
                <p>{ambulance.length}</p>
              </div>
            </Card>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={{ padding: "10px 10px" }} >
            <Card
              bordered={false} style={{ width: "100%" }}>
              <Meta
                description={[
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <FileTwoTone />
                    <EllipsisOutlined rotate={90} />
                  </div>
                ]}
              />

              <p style={{ marginTop: "20px", marginBottom: "10px" }}>Police</p>
              <Progress percent={(policeCar.length / vehicleData.length) * 100} showInfo={false} />
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                <p>Files</p>
                <p>{policeCar.length}</p>
              </div>
            </Card>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={{ padding: "10px 10px" }} >
            <Card
              bordered={false} style={{ width: "100%" }}>
              <Meta
                description={[
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <FileTwoTone />
                    <EllipsisOutlined rotate={90} />
                  </div>
                ]}
              />

              <p style={{ marginTop: "20px", marginBottom: "10px" }}>Fire Brigade Van</p>
              <Progress percent={(fireBrigade.length / vehicleData.length) * 100} showInfo={false} />
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                <p>Files</p>
                <p>{fireBrigade.length}</p>
              </div>
            </Card>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={{ padding: "10px 10px" }} >
            <Card
              bordered={false} style={{ width: "100%" }}>
              <Meta
                description={[
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <FileTwoTone />
                    <EllipsisOutlined rotate={90} />
                  </div>
                ]}
              />

              <p style={{ marginTop: "20px", marginBottom: "10px" }}>VIP Car</p>
              <Progress percent={(vipCar.length / vehicleData.length) * 100} showInfo={false} />
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                <p>Files</p>
                <p>{vipCar.length}</p>
              </div>
            </Card>
          </Col>

        </Row>

      </div>
    </LayoutWrapper>
  );
}
