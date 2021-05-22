import React from 'react';
import {Input , Button } from 'antd';

import all_Api from '../API/index'
import {calOnepoint} from '../Calculator.js'
import './roe.css'


class One_point extends React.Component{

    state = { 
        arr : [],
        Equation : '' ,
        X : '' ,
        E : '' ,

        status : null,
        
        apiData: [],
     
        };
    
    async getData() {
        let tempData = null
        await all_Api.get_Root_of_equation().then(res => { tempData = res.data })
        this.setState({ apiData: tempData })
     
        
        this.setState({
            Equation: this.state.apiData[2]["equation"],
            X: this.state.apiData[2]["x"],
            E: this.state.apiData[2]["error"],
            
        })
    }

    onClickExample = (Event) => {
        
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
    cal_onepoint = (Event) =>{
        this.setState({status : null})
        if(this.state.Equation === '' ||  this.state.E === ''||this.state.X === ''){
           this.setState({status : <div style = {{color : 'red'}}>  โปรดกรอกข้อมูลให้ครบถ้วน      </div>})
            return ;
        }
        
        try{
        
            this.setState({ arr: calOnepoint(this.state.Equation, this.state.X,this.state.E) })
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
             One-Point Iteration Method
            </div>

            <div style = {{marginTop : '10px'}}>
                <Input placeholder = 'ใส่สมการ' value = {this.state.Equation} onChange = {this.getEquation}/>
                {this.state.status}
            </div>
            <div style = {{marginTop : '10px'}}>
                <span> <Input  placeholder = 'X=0.00' value = {this.state.X} onChange = {this.getX} style = {{width : '100px'}}/>     </span>
                <span> <Input  placeholder = 'Error=0.00000' value = {this.state.E} onChange = {this.getE} style = {{width : '100px'}}/>     </span>
            </div>
            <div style = {{marginTop : '10px'}}>
            <span><Button type = 'primary' onClick = {this.cal_onepoint} >Calculate</Button></span>
                <span style = {{padding : '0px 0px 0px 30px'}}>
                    <Button size='medium' type='primary' onClick={this.onClickExample}>ตัวอย่าง</Button>
                    </span>
                    {this.state.arr}
            </div>
            </div>
            </div>
        );
    }
}

export default One_point;
 