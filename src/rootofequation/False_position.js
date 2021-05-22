import React from 'react';
import {Input , Button} from 'antd';
import './roe.css'
import all_Api from '../API/index'

import {calFalse} from '../Calculator.js'


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
        
         apiData : [],
        
        };
        
        async getData(){
            let tempData = null
            await all_Api.get_Root_of_equation().then(res => {tempData = res.data})
            this.setState({apiData:tempData})
            
            
            this.setState({
                Equation: this.state.apiData[1]["equation"],
                XL : this.state.apiData[1]["xl"],
                XR : this.state.apiData[1]["xr"],
                E : this.state.apiData[1]["error"],
              
            })
        }
      
        
        onClickExample = (Event) =>{
                
                this.getData()
            
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
               
             <div className = "content-box">
            <div style = {{ fontWeight : "bold" , fontSize : "20px"}}>
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
            </div>
        );
    }
}

export default False_position;
 
