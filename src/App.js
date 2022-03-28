import React from 'react';
import Odometer from 'react-odometerjs';
import {drawArcAndLine,rgb2hsv} from './utils'
import './css/style.css'
import './css/masonry.css'
const colorsjson = require('./color.json')


class App extends React.Component{

    constructor(props) {
        super(props);
        console.log('加载数据:',colorsjson);
        colorsjson.sort(function(a, b){
            if (rgb2hsv(a.RGB)[0] === rgb2hsv(b.RGB)[0])
                return rgb2hsv(b.RGB)[1] - rgb2hsv(a.RGB)[1];
            else
                return rgb2hsv(b.RGB)[0] - rgb2hsv(a.RGB)[0];
        });
        this.state = {
            CMYK: [0, 0, 0, 0],
            c:{r:"rotate(0deg)", l:"rotate(180deg)"},
            m:{r:"rotate(0deg)", l:"rotate(180deg)"},
            y:{r:"rotate(0deg)", l:"rotate(180deg)"},
            k:{r:"rotate(0deg)", l:"rotate(180deg)"},
            RGB: [255, 255, 255],
            "hex": "#000000",
            "name": "中国色",
            "pinyin": "ZHONGGUOSE"
        }
    }

    componentDidMount(){
        for (let index in colorsjson){
            drawArcAndLine(colorsjson[index].CMYK,colorsjson[index].RGB,index);
        }
    }

    render() {

        const aonClick = (value) => {
            let wrapper = document.getElementById('wrapper');
            wrapper.style.backgroundColor = value.hex;
            //旋转角度计算
            //值小于五十时 r偏转180*v/50的比例 否则180
            //值小于五十时 l偏转180 否则360*v/100
            value.c = autoRotate(value.CMYK[0]);
            value.m = autoRotate(value.CMYK[1]);
            value.y = autoRotate(value.CMYK[2]);
            value.k = autoRotate(value.CMYK[3]);
            document.title = value.name + ' - 中国色 - 中国传统颜色'
            this.setState(value)
        }

        const autoRotate = (value) => {
            return{
                r : 'rotate(' + (value <= 50 ? 180*value/50:180) + 'deg)',
                l : 'rotate(' + (value <= 50 ? 180:360*value/100) + 'deg)'
            }
        }

        const onMouseEnter = () => {
            let RGBvalue = document.getElementById('RGBvalue');
            RGBvalue.style.opacity = 1;
        }
        const onMouseLeave = () =>{
            let RGBvalue = document.getElementById('RGBvalue');
            RGBvalue.style.opacity = 0;
        }


        return (
            <div id="container">
                <header id="logo">
                    <h1>中国色 Chinese Colors</h1>
                </header>
                <nav className="masonry">
                    <div className="grid-sizer"/>
                    <ui id="colors">
                        {colorsjson.map(function(value,index){
                            return <li className="masonry__brick" id={'li_'+index} style={{borderTop:'6px solid ' + value.hex,top:Math.floor(index/7) * 300 + 'px',left:(index-(Math.floor(index/7)*7)) * 65 + 'px'}}>
                                <div>
                                    <a onClick={aonClick.bind(this,value)}>
                                        <span className="name" style={{color: value.hex}}>{value.name}</span>
                                        <span className="pinyin">{value.pinyin.toUpperCase()}</span>
                                        <span className="rgb">{value.hex.replace('#','').toUpperCase()}</span>
                                        <canvas id={"canvas_"+index}/>
                                    </a>
                                </div>
                            </li>
                        })}
                    </ui>
                </nav>
                <article id="data">
                    <h2>
                        <span id="name">{this.state.name}</span>
                        <span id="pinyin">{this.state.pinyin.toUpperCase()}</span>
                    </h2>
                    <div id="color-value">
                        <dl id="CMYKcolor">
                            <dt className="c">C</dt>
                            <dd className="c">
                                <span className="cont">{this.state.CMYK[0]}</span>
                                <span className="circle"/>
                                <span className="r" style={{mask:'url(#maskingr)'}}><span className="line" style={{transform:this.state.c.r}}/></span>
                                <span className="l" style={{mask:'url(#maskingl)'}}><span className="line" style={{transform:this.state.c.l}}/></span>
                            </dd>
                            <dt className="m">M</dt>
                            <dd className="m">
                                <span className="cont">{this.state.CMYK[1]}</span>
                                <span className="circle"/>
                                <span className="r" style={{mask:'url(#maskingr)'}}><span className="line" style={{transform:this.state.m.r}}/></span>
                                <span className="l" style={{mask:'url(#maskingl)'}}><span className="line" style={{transform:this.state.m.l}}/></span>
                            </dd>
                            <dt className="y">Y</dt>
                            <dd className="y">
                                <span className="cont">{this.state.CMYK[2]}</span>
                                <span className="circle"/>
                                <span className="r" style={{mask:'url(#maskingr)'}}><span className="line" style={{transform:this.state.y.r}}/></span>
                                <span className="l" style={{mask:'url(#maskingl)'}}><span className="line" style={{transform:this.state.y.l}}/></span>
                            </dd>
                            <dt className="k">K</dt>
                            <dd className="k">
                                <span className="cont">{this.state.CMYK[3]}</span>
                                <span className="circle"/>
                                <span className="r" style={{mask:'url(#maskingr)'}}><span className="line" style={{transform:this.state.k.r}}/></span>
                                <span className="l" style={{mask:'url(#maskingl)'}}><span className="line" style={{transform:this.state.k.l}}/></span>
                            </dd>
                        </dl>

                        <div id="RGBcolor" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            <dl>
                                <dt className="r altText">R</dt>
                                <dd className="r">
                                    <Odometer value={this.state.RGB[0]}/>
                                </dd>
                                <dt className="g altText">G</dt>
                                <dd className="g">
                                    <Odometer value={this.state.RGB[1]}/>
                                </dd>
                                <dt className="b altText">B</dt>
                                <dd className="b">
                                    <Odometer value={this.state.RGB[2]}/>
                                </dd>
                            </dl>
                            <div id="RGBvalue" style={{opacity: 0}}>
                                <span>{this.state.hex}</span>
                            </div>
                        </div>

                        <div id="share"/>
                    </div>
                </article>

            </div>
        );
    }
}

export default App;
