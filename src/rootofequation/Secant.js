import React from 'react';
import {Modal_roe} from '../components/Modal'
import {Input , Button} from 'antd';
import all_Api from '../API/index'
import {calSecant} from '../Calculator'
const math = require('mathjs');





class Secant extends React.Component{

    state = {
        arr :[],
        Equation: '',
        X0: '',
        X1: '',
        E: '',
        status: null,
        isModalVisible: false,
        apiData: [],
        hasData: false
    };
    
    async getData() {
        let tempData = null
        await all_Api.get_Root_of_equation().then(res => { tempData = res.data })
        this.setState({ apiData: tempData })
        this.setState({ hasData: true })
        // console.log(tempData)
    }
    onClickOk = e => {
        this.setState({ isModalVisible: false })
    }
    onClickInsert = e => {
        let index = e.currentTarget.getAttribute('name').split('_')
        index = parseInt(index[1])
        this.setState({
            Equation: this.state.apiData[index]["equation"],
            X0: this.state.apiData[index]["xl"],
            X1: this.state.apiData[index]["xr"],
            E: this.state.apiData[index]["error"],
            isModalVisible: false
        })
    }
    onClickExample = e => {
        if (!this.state.hasData) {
            this.getData()
        }
        this.setState({ isModalVisible: true })
    }

    getEquation = (Event) => {
        this.setState({Equation : Event.target.value})
    }
    getX0 = (Event) => {
        this.setState({X0 : Event.target.value})
    }
    getX1 = (Event) => {
        this.setState({X1 : Event.target.value})
    }
    getE = (Event) => {
        this.setState({E : Event.target.value})
    }
    cal_secant = (Event) =>{
        this.setState({status : null});
        if(this.state.Equation === '' || this.state.X0 === '' || this.state.X1 === '' || this.state.E === ''){
            this.setState({status : <div style = {{color : 'red'}}> โปรดกรอกข้อมูลให้ครบถ้วน </div>})
            return;
        }

        try{
            this.setState({ arr: calSecant(this.state.equation, this.state.x0, this.state.x1, this.state.error) })
        }
        catch(error){
            this.setState({status : <div style = {{color :  'red'}}> ใส่ฟังก์ชั่นไม่ถูกต้อง</div>});
        }

    }

    render(){

        return(
            <div>
            <Modal_roe
                    visible={this.state.isModalVisible}
                    onOK={this.onClickOk}
                    hasData={this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick={this.onClickInsert}
                />    
            
            <div>
             Secant Method
            </div>
            <div style = {{marginTop : '10px'}}>
                <Input placeholder = 'ใส่สมการ' value = {this.state.Equation} onChange = {this.getEquation}/>
                {this.state.status}
            </div>
            <div style = {{marginTop : '10px'}}>
                <span> <Input  placeholder = 'X0=0.00' onChange = {this.getX0} value = {this.state.X0} style = {{width : '100px'}}/>     </span>
                <span> <Input  placeholder = 'X1=0.00' onChange = {this.getX1} value = {this.state.X1} style = {{width : '100px'}}/>     </span>
                <span> <Input  placeholder = 'Error=0.00000' onChange = {this.getE} value = {this.state.E}style = {{width : '100px'}}/>     </span>
            </div>
            <div style = {{marginTop : '10px'}}>
                <span><Button type = 'primary' onClick = {this.cal_secant} >Calculate</Button></span>
                <span style = {{padding : '0px 0px 0px 30px'}}><Button size='medium' type='primary' onClick={this.onClickExample}>ตัวอย่าง</Button></span>
                {this.state.arr}
            </div>
            </div>
        );
    }
}

export default Secant;
 