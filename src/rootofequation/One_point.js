import React from 'react';
import {Input , Button } from 'antd';

class One_point extends React.Component{

    state = { Equation : '' , X : '' , E : '' , status : null};

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
         let Equation = this.state.Equation;
         Equation = fixed_fx(Equation);
         equation(2,Equation); // debug   
       
         let E = parseFloat(this.state.E);
         let X = parseFloat(this.state.X);
         

         let Error = 999999 ;
         let i = 0;
         let arr = [];
         let old_X = 0;

         while(Error > E){
          

            X = equation(X,Equation);
            
            Error = Math.abs((X - old_X)/X);

            old_X = X;

            arr.push(<div style = {{fontSize : '25px' , display : 'flex' }}>
            <span style = {{ width : '40%' , textAlign : 'left'}}> Iteration {i} : x is {X}</span>
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
                <Button type = 'primary' onClick = {this.cal_onepoint} >Calculate</Button>
            </div>
            {this.state.arr}
            </div>
        );
    }
}

export default One_point;
 