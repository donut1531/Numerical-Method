import React from 'react';
import {Input , Button } from 'antd';
import {Modal_roe} from '../components/Modal'
import all_Api from '../API/index'
import {calOnepoint} from '../Calculator'

const math = require('mathjs');

class One_point extends React.Component{

    state = { 
        arr : [],
        Equation : '' ,
        X : '' ,
        E : '' ,
        status : null,
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
    getX = (Event) => {
        this.setState({X : Event.target.value})
    }
    getE = (Event) => {
        this.setState({E : Event.target.value})
    }
    cal_onepoint = (Event) =>{
        this.setState({status : null})
        if(this.state.Equation === '' ||  this.state.E === ''||this.state.X === ''){
           this.setState({status : <div style = {{color : 'red'}}>  โปรดกรอกข้อมูลให้ครบถ้วน      </div>})
            return ;
        }
        
        try{
        
            this.setState({ arr: calOnepoint(this.state.equation, this.state.x0, this.state.x1, this.state.error) })
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
             One-Point Iteration Method
            </div>

            <div style = {{marginTop : '10px'}}>
                <Input placeholder = 'ใส่สมการ' onChange = {this.getEquation}/>
                {this.state.status}
            </div>
            <div style = {{marginTop : '10px'}}>
                <span> <Input  placeholder = 'X=0.00' onChange = {this.getX} style = {{width : '100px'}}/>     </span>
                <span> <Input  placeholder = 'Error=0.00000' onChange = {this.getE} style = {{width : '100px'}}/>     </span>
            </div>
            <div style = {{marginTop : '10px'}}>
            <span><Button type = 'primary' onClick = {this.cal_secant} >Calculate</Button></span>
                <span style = {{padding : '0px 0px 0px 30px'}}>
                    <Button size='medium' type='primary' onClick={this.onClickExample}>ตัวอย่าง</Button>
                    </span>
                    {this.state.arr}
            </div>
            
            </div>
        );
    }
}

export default One_point;
 