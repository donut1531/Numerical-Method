import React from 'react';
import {Input , Button} from 'antd';

import all_Api from '../API/index'
import {Modal_roe} from '../components/Modal.js'

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
         arr : null ,
         status : null,
         isModalVisible : false,
         apiData : [],
         hasData : false}
        
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
                equation: this.state.apiData[index]["equation"],
                xl : this.state.apiData[index]["xl"],
                xr : this.state.apiData[index]["xr"],
                error : this.state.apiData[index]["error"],
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

            let Equation = this.state.Equation;

            Equation = fixed_fx(Equation);
            equation(2,Equation); // debug
            

            let XL = parseFloat(this.state.XL);
            let XR = parseFloat(this.state.XR);

            let X1 = parseFloat(this.state.X1);

            let E  = parseFloat(this.state.E);
            let ERROR = 99999;

            
            
            let arr = [];

            let X1_OLD = 0;

            let i = 1;

            while(ERROR > E){
                
            let FXL = equation(XL,Equation);
            let FXR = equation(XR,Equation);
             X1 = ((XL * FXR) - (XR * FXL)) / (FXR - FXL);
             console.log(X1);
            let FX1 = equation(X1,Equation);
            
            
            if(FX1 * FXR >= 0) {
            
                XR = X1;
            }
            else{
               
                XL = X1;
            
            }

            
            ERROR = Math.abs((X1 - X1_OLD)/X1);
            X1_OLD = X1;
            arr.push(<div style = {{fontSize : '25px' ,display : 'flex'}}>
            <span style = {{width : '40%' , textAlign : 'left'}}> Iteration {i} : X is {X1} </span>
            <span > Error : {ERROR.toFixed(15)} </span>

            </div>)
            i++;   
            }

            arr.push(<div style = {{fontSize:'40px' , fontWeight : 'bold',textAlign : 'left'}}>RESULT OF X IS {X1} </div>)
            this.setState({arr : arr});
        
        
        }
        
        catch(error){
           
            this.setState({status :  <div style = {{color : 'red'}}> ใส่ฟังก์ชั่นไม่ถูกต้อง </div>});
        }
        } 
    render(){
    
        return(
            <div>
            
            
            <div>
             False-Position Method
            </div>
            <div style = {{marginTop : '10px'}}>
                <Input placeholder = 'ใส่สมการ'  onChange = {this.getEquation} />
                {this.state.status}
            
            </div>
            <div style = {{marginTop : '10px'}}>
                
                <span style = {{marginLeft : '10px'}}><Input placeholder = 'XL = 0.00' onChange = {this.getXL} style ={{width : '100px'}}/></span>
                <span style = {{marginLeft : '10px'}}> <Input placeholder = 'XR = 0.00 ' onChange = {this.getXR} style = {{width : '100px'}}/></span>
                <span style = {{marginLeft : '10px'}}> <Input placeholder = 'Error = 0.0000' onChange = {this.getE} style = {{width : '100px'}} /> </span>

            </div>
            <div style = {{marginTop : '10px' ,marginLeft : '10px'}}>
                <Button type = 'primary' onClick = {this.cal_false}> Calculate </Button>
            </div>
            {this.state.arr}

            </div>
        );
    }
}

export default False_position;
 
