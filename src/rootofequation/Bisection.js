import React from 'react';
import {Input , Button} from 'antd';


class Bisection extends React.Component{
    state = {
        
    Equation : '',
     XL :'',
     XR : '' ,
      E : '',
      e : null,
      ans : null ,
      status : null,
      isModalVisible : false,
      apiData : [],
      hasData : false
    };
    async getData(){
        let tempData = null
        await apis.getRootofequation().then(res => { tempData = res.data })
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
            XL: this.state.apiData[index]["xl"],
            XR: this.state.apiData[index]["xr"],
            E: this.state.apiData[index]["error"],
            isModalVisible: false
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
    getXR = (Event) =>{
        this.setState({XR : Event.target.value})
    }
    getE = (Event) =>{
        this.setState({E : Event.target.value})
    }
    
    cal_bisection = (Event) =>{
        this.setState({status : null});
        if(this.state.Equation === '' ||  this.state.E === ''||this.state.XL === '' || this.state.XR === ''){
           
            this.setState( {status :<div style = {{color : 'red'}}> โปรดกรอกข้อมูลให้ครบถ้วน </div>})
            return;
        }

        try {
            
            let Equation = this.state.Equation;
            Equation = fixed_fx(Equation);
             
            let XL = parseFloat(this.state.XL);
            let XR = parseFloat(this.state.XR);
            let E = parseFloat(this.state.E);

            let XM =(XL + XR)/2;
            let num = equation(XM,Equation)*equation(XR,Equation);
            
            let ER = 999999;
            let old_XM = XM;

            let arr = [];
            let i = 1;

            if(num > 0){

                XR = XM;
            }
            else if(num < 0){
                XL = XM;
            }

            while(ER > E){
                XM = (XL+XR)/2;
                num = equation(XM,Equation)*equation(XR,Equation);

                
            if(num < 0){

                XL = XM;
            }
            else {
                XR = XM;
            }

            ER = Math.abs((XM-old_XM)/XM);

            old_XM = XM;
            arr.push(<div style = {{fontSize : '25px' , display : 'flex' }}>
            <span style = {{ width : '40%' , textAlign : 'left'}}> Iteration {i} : x is {XM}</span>
            <span > Error : {ER.toFixed(15)}</span>
            </div>);
            i++;
            }
            
            arr.push(<div style = {{fontSize:'40px' , fontWeight : 'bold',textAlign : 'left'}}> Result of x is {XM}</div>);
            this.setState({ans:arr});
        
        }

        
        catch(error){
            
            this.setState({status :  <div style = {{color : 'red'}}> ใส่ฟังก์ชั่นไม่ถูกต้อง </div>});
        }
        } 
            

        
       
    
   
    render(){

        return(
            <div>
             <div>
             Bisection Method
             </div>
             <div style = {{
                 marginTop : '10px'
             }}>
              <Input placeholder = 'ใส่สมการ' onChange = {this.getEquation}/>
               
              {this.state.status}
             </div>
             <div style = {{
                 marginTop : '10px'
                 
             }}>
                 <span style = {{marginLeft : '10px'}}><Input placeholder = 'XL = 0.0' onChange = {this.getXL}style = {{width : '100px'}} /></span>
                 <span style = {{marginLeft : '10px'}}><Input placeholder = 'XR = 0.0' onChange = {this.getXR}style = {{width : '100px'}}/></span>
                 <span style = {{marginLeft : '10px'}}><Input placeholder = 'Error = 0.000' onChange = {this.getE}style = {{width : '100px'}} /></span>
             </div>
             <div style = {{
                 marginTop : '10px'
                 ,marginLeft : '10px'
             }}>
                 
                 <Button type = 'primary' onClick = {this.cal_bisection}> Calculate </Button>

             </div>
             <div>
                 {this.state.ans}
             </div>
            </div>
        );
    }
}

export default Bisection;
 
