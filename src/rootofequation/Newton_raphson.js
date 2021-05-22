import React from 'react';
import {Input , Button} from 'antd';
import {Modal_roe} from '../components/Modal'
import all_Api from '../API/index'
import './roe.css'
import {calNewton} from '../Calculator.js'
const math = require('mathjs');
class Newton_raphson extends React.Component{

    state = { 
          arr : [],
          Equation : '' ,
          X : '' ,
          E : '' ,
          status : null,
         
          apiData: [],
    }
    async getData() {
        let tempData = null
        await all_Api.get_Root_of_equation().then(res => { tempData = res.data })
        this.setState({ apiData: tempData })
       
        

        this.setState({
            Equation: this.state.apiData[3]["equation"],
            X: this.state.apiData[3]["x"],
           
            E: this.state.apiData[3]["error"],
            
        })
    }
    onClickOk = e => {
        this.setState({ isModalVisible: false })
    }
    onClickInsert = e => {
        let index = e.currentTarget.getAttribute('name').split('_')
        index = parseInt(index[1])
       
    }
    onClickExample = e => {
       
            this.getData()
       
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

    cal_newton = (Event) =>{
       
        this.setState({status : null});
        if(this.state.Equation === '' || this.state.X === '' || this.state.E === ''){
            this.setState({status : <div style = {{color : 'red'}}> โปรดกรอกข้อมูลให้ครบถ้วน </div>})
            return;
        }
        try{
            this.setState({arr : calNewton(this.state.Equation , this.state.X ,this.state.E)})
        }
        catch(error){
            this.setState({status : <div style = {{color :  'red'}}> ใส่ฟังก์ชั่นไม่ถูกต้อง</div>});
        }
        
        

    }

    render(){

        return(
            <div>
             
             <div className = "content-box">
            <div style = {{ fontWeight : "bold" , fontSize : "20px"}}>
             Newton_Raphson Method
            </div>

            <div style = {{marginTop : '10px'}}>
                <Input placeholder = 'ใส่สมการ' value = {this.state.Equation} onChange = {this.getEquation}/>
                {this.state.status}
            </div>
            <div style = {{marginTop : '10px'}}>
                <span> <Input  placeholder = 'X=0.00' onChange = {this.getX} value = {this.state.X} style = {{width : '100px'}}/>     </span>
                <span> <Input  placeholder = 'Error=0.00000' value = {this.state.E} onChange = {this.getE} style = {{width : '100px'}}/>     </span>
            </div>
            <div style = {{marginTop : '10px'}}>
            <span><Button type = 'primary' onClick = {this.cal_newton} >Calculate</Button></span>
                <span style = {{padding : '0px 0px 0px 30px'}}><Button size='medium' type='primary' onClick={this.onClickExample}>ตัวอย่าง</Button></span>
                {this.state.arr}
            </div>
            </div>
            </div>
        );
    }
}

export default Newton_raphson;
 