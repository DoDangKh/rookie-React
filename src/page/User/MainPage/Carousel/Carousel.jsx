import React from 'react';
import { Carousel } from 'antd';
import "./Carousel.css"
const contentStyle = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};
const App = () => (
    <Carousel arrows infinite={false} className='flex justify-center items-center h-96'>
        <div>
            <h3 style={contentStyle} className='flex justify-center items-center  h-96 bg-slate-600 '>
                <img className=' h-96' src='https://media.hypedc.com/cdn-cgi/image/fit=scale-down,f=auto,w=1800/navigation/1800-1200/eafecf2c-92ce-440b-9590-ac5ac1ac784d/adidas_1800x1200.jpg'></img>
            </h3>
        </div>
        <div>
            <h3 style={contentStyle} className='flex justify-center items-center  h-96 bg-slate-600 '>
                <img className=' h-96' src='https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2150600586/settings_images/gQcZ6CNNShKeVCw7fHpO_SneakersShoesFootwear_Banner.png'></img>
            </h3>
        </div>
        <div>
            <h3 style={contentStyle} className='flex justify-center items-center  h-96 bg-slate-600 '>
                <img className=' h-96' src='https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2150600586/settings_images/qJRcZhJ4T9ikoHj0k3vE_Slide1.png'></img>
            </h3>
        </div>
        <div>
            <h3 style={contentStyle} className='flex justify-center items-center  h-96 bg-slate-600 '>
                <img className=' h-96' src='https://i.insider.com/63efc338ce407400194340f4?width=750&format=jpeg&auto=webp'></img>
            </h3>
        </div>
    </Carousel>
);
export default App;