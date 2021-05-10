import React from 'react';
import {Input , Button} from 'antd';

import all_Api from '../API/index'
import {Modal_roe} from '../components/Modal.js'
import {calFalse} from '../Calculator.js'
const math = require('mathjs');

class False_position extends React.Component{

    state= {
         Equation : '' ,
         XL : '' ,
         XR : '' ,
         E : '' ,
         X1 : null ,
         FXL : null ,
         FXR : null ,
         FX1 : null ,
         arr : [] ,
         status : null,
         isModalVisible : false,
         apiData : [],
         hasData : false
        };
        
        async getData(){
            let tempData = null
            await all_Api.get_Root_of_equation().then(res => {tempData = res.data})
            this.setState({apiData:tempData})
            this.setState({hasData:true})
            // console.log(tempData)
        }
        onClickOk = e =>{
            this.setState({isModalVisible:false})
        }
        onClickInsert = e =>{
        let index = e.currentTarget.getAttribute('name').split('_')
            index = parseInt(index[1])
            this.setState({
                Equation: this.state.apiData[index]["equation"],
                XL : this.state.apiData[index]["xl"],
                XR : this.state.apiData[index]["xr"],
                E : this.state.apiData[index]["error"],
                isModalVisible : false
            })
        }
        
        onClickExample = e =>{
            if(!this.state.hasData){
                this.getData()
            }
            this.setState({isModalVisible:true})
        }
        getEquation = (Event) =>{
        this.setState({Equation : Event.target.value})
        }
        getXL = (Event) =>{
        this.setState({XL : Event.target.value})
        }
        getXR =(Event) => {
        this.setState({XR : Event.target.value})
        }
        getE = (Event) => {
        this.setState({E : Event.target.value})
        }
    
    

    cal_false = (Event) => {
        this.setState({status : null});
        if(this.state.Equation === '' ||  this.state.E === ''||this.state.XL === '' || this.state.XR === ''){
           
            this.setState( {status :<div style = {{color : 'red'}}> โปรดกรอกข้อมูลให้ครบถ้วน </div>})
            return;
        }
        
        try{
             this.setState({ arr: calFalse(this.state.Equation, this.state.XL, this.state.XR, this.state.E) })
            }
        
        catch(error){
           
            this.setState({status :  <div style = {{color : 'red'}}> ใส่ฟังก์ชั่นไม่ถูกต้อง </div>});
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
             False-Position Method
            </div>
            <div style = {{marginTop : '10px'}}>
                <Input placeholder = 'ใส่สมการ'  value = {this.state.Equation} onChange = {this.getEquation} />
                {this.state.status}
            
            </div>
            <div style = {{marginTop : '10px'}}>
                
                <span style = {{marginLeft : '10px'}}><Input placeholder = 'XL = 0.00' value = {this.state.XL}  onChange = {this.getXL} style ={{width : '100px'}}/></span>
                <span style = {{marginLeft : '10px'}}> <Input placeholder = 'XR = 0.00 ' value = {this.state.XR} onChange = {this.getXR} style = {{width : '100px'}}/></span>
                <span style = {{marginLeft : '10px'}}> <Input placeholder = 'Error = 0.0000'value = {this.state.E} onChange = {this.getE} style = {{width : '100px'}} /> </span>

            </div>
            <div style = {{marginTop : '10px' ,marginLeft : '10px'}}>
            <span><Button type = 'primary' onClick = {this.cal_false} >Calculate</Button></span>
                <span style = {{padding : '0px 0px 0px 30px'}}><Button size='medium' type='primary' onClick={this.onClickExample}>ตัวอย่าง</Button></span>
                {this.state.arr}
            </div>
           

            </div>
        );
    }
}

export default False_position;
 
