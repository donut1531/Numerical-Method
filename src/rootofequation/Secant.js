import React from 'react';

import {Input , Button} from 'antd';
import all_Api from '../API/index'
import {calSecant} from '../Calculator.js'
import './roe.css'





class Secant extends React.Component{

    state = {
        arr: [],
        Equation: '',
        X0: '',
        X1: '',
        E: '',
        status: null,

        apiData: [],

    };

    async getData() {
        let tempData = null
        await all_Api.get_Root_of_equation().then(res => { tempData = res.data })
        this.setState({ apiData: tempData })


        this.setState({
            Equation: this.state.apiData[4]["equation"],
            X0: this.state.apiData[4]["xl"],
            X1: this.state.apiData[4]["xr"],
            E: this.state.apiData[4]["error"],

        })
    }

    onClickExample = (Event) => {

        this.getData()

    }

    getEquation = (Event) => {
        this.setState({ Equation: Event.target.value })
    }
    getX0 = (Event) => {
        this.setState({ X0: Event.target.value })
    }
    getX1 = (Event) => {
        this.setState({ X1: Event.target.value })
    }
    getE = (Event) => {
        this.setState({ E: Event.target.value })
    }
    cal_secant = (Event) => {
        this.setState({ status: null });
        if (this.state.Equation === '' || this.state.X0 === '' || this.state.X1 === '' || this.state.E === '') {
            this.setState({ status: <div style={{ color: 'red' }}> โปรดกรอกข้อมูลให้ครบถ้วน </div> })
            return;
        }

        try {
            this.setState({ arr: calSecant(this.state.Equation, this.state.X0, this.state.X1, this.state.E) })
        }
        catch (error) {
            this.setState({ status: <div style={{ color: 'red' }}> ใส่ฟังก์ชั่นไม่ถูกต้อง</div> });
        }

    }

    render(){

        return(
            

                <div className="content-box">
                    <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                        Secant Method
                 </div>
                    <div style={{ marginTop: '10px' }}>
                        <Input placeholder='ใส่สมการ' value={this.state.Equation} onChange={this.getEquation} />
                        {this.state.status}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span> <Input placeholder='X0=0.00' onChange={this.getX0} value={this.state.X0} style={{ width: '100px' }} />     </span>
                        <span> <Input placeholder='X1=0.00' onChange={this.getX1} value={this.state.X1} style={{ width: '100px' }} />     </span>
                        <span> <Input placeholder='Error=0.00000' onChange={this.getE} value={this.state.E} style={{ width: '100px' }} />     </span>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <span><Button type='primary' onClick={this.cal_secant} >Calculate</Button></span>
                        <span style={{ padding: '0px 0px 0px 30px' }}><Button size='medium' type='primary' onClick={this.onClickExample}>ตัวอย่าง</Button></span>
                        {this.state.arr}
                    </div>
                </div>
            
        );
    }
}

export default Secant;
 