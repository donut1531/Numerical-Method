import React from 'react';
import {Input , Button} from 'antd';


import {
    atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
  } from 'mathjs'


class Newton_raphson extends React.Component{

    state = { Equation : '' , X : '' , E : '' ,status : null};

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
            let Equation = this.state.Equation;
            // ** ใช้ใน derivative ไม่ได้ใช้ได้แต่ ^
            Equation = Equation.replaceAll('X','x');
            let FFX = derivative(Equation,'x').toString();
          //  console.log('1. ' +FFX);
            Equation = fixed_fx(Equation);
            FFX = fixed_fx(FFX);
            console.log('2. ' + FFX);
            
            
            equation(2,Equation);//debug
           
            let X = parseFloat(this.state.X);
            let E = parseFloat(this.state.E);
            
            
            
            let Error = 99999;
            let i = 1;
            let arr = [];
            
            let old_X1 = X;

            //          X^2-7
            
            arr.push(<div style = {{textAlign : 'left' , fontSize : '25px'}}><span> f'(x) = {FFX}</span></div>)

            while(Error > E){
            let F_X = equation(X,Equation);
            console.log('true'); 
            let  F_Xprime    = equation(X,FFX);
              
            
             
            
                X = X - (F_X/F_Xprime);
            
                Error = Math.abs((X - old_X1)/X);
               old_X1 = X;
              
              
               arr.push(<div style = {{fontSize : '25px' , display : 'flex' }}>
               <span style = {{ width : '60%' , textAlign : 'left'}}> Iteration {i} : x is {X}</span>
               <span > Error : {Error.toFixed(15)}</span>
               </div>);
               console.log(i);
               i++;
            }
            arr.push(<div style = {{fontSize:'40px' , fontWeight : 'bold',textAlign : 'left'}}> Result of x is {X}</div>);
            this.setState({arr:arr});
        }
        catch(error){
            this.setState({status : <div style = {{color :  'red'}}> ใส่ฟังก์ชั่นไม่ถูกต้อง</div>});
        }
        
        

    }

    render(){

        return(
            <div>

            
            <div>
             Newton_Raphson Method
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
                <Button type = 'primary' onClick = {this.cal_newton} >Calculate</Button>
                {this.state.arr}
            </div>
            </div>
        );
    }
}

export default Newton_raphson;
 