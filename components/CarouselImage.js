import * as React from "react";
import {  Spin } from 'antd';
import 'antd/dist/antd.css'
// import appImages from '../Themes/AppImages'

const CarouselImage = ({ img, onClick, isIconVisible }) => {
        const imageRef=React.useRef()
    const [loadImg,setLoadImg]= React.useState(true)
    const [timeUpdate, setTimeUpdate]= React.useState(Date.now())
   React.useEffect(() => {
    const timer =   setInterval(() => {
        setTimeUpdate(Date.now())
        setLoadImg(true)
      }, 60000);

      return () => {
        clearTimeout(timer);
      };
      
    //    console.log(imageRef?.current?.onload,'mageRef.current',imageRef);
   }, [])


    return (
        <Spin spinning={loadImg}>
        <img
        //   key={timeUpdate}
          onLoad={()=>setLoadImg(false)}
          src={
            img+"?"+timeUpdate
          }
          className="terminalImage"
        />
         </Spin>
    )
}

export default CarouselImage