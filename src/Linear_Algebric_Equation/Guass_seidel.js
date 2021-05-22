import React from 'react';
import {Input, Row, Col , Button  } from 'antd'
import all_Api from '../API/index'
import {Inputmatrix,InputB}  from '../components/Create_matrix'

import './matrix.css'
import { calSeidel , copyArray } from '../Calculator.js'
class Guass_Seidel extends React.Component{
    state = {
        n: 2,
        A: [[],[]],
        B: [],
        E: '',
        data: [],
       
        apiData: [],
      
    }

    
    async getData() {
        let tempData = null
        await all_Api.get_Matrix().then(res => { tempData = res.data })
        this.setState({ apiData: tempData })
        
        this.setState({
            n: this.state.apiData[1]["n"],
            
            A: copyArray(this.state.apiData[1]["n"],this.state.apiData[1]["matrixA"]),

            B: [...this.state.apiData[1]["matrixB"]],
            
            E: this.state.apiData[1]["error"],
          
        })
       
    }
   

    onClickExample = e => {
         
            this.getData()
       
      
    }

    onChangematrixA = (e) =>{
        let index = e.target.name.split(" ")
        let value = e.target.value 
        let arr = this.state.A
        arr[parseInt(index[0])][parseInt(index[1])] = value
        this.setState({A : arr})
    
    }
    onChangematrixB = (e) =>{
        let index = e.target.name.split(" ")
        let value = e.target.value
        let arr = this.state.B
        arr[parseInt(index[1])] = value
        this.setState({B : arr})
        // console.log(this.state.matrixB[0])
        // console.log(this.state.matrixB[1])
    
    }
    onChangeError = e => {
        this.setState({E : e.target.value})
    }
    onClickmatrixadd = (e)=>{
        if(this.state.n < 6){
            this.setState({n : this.state.n+=1})
            this.state.A.push([])
        }
    }
    onClickmatrixsubtract = (e)=>{
        if(this.state.n > 2){
            this.setState({n : this.state.n-=1})
            this.state.A.pop([])
        }
    }
    onClickCalculator = (e)=>{
        
            this.setState({data : calSeidel(this.state.n,this.state.A,this.state.B,this.state.E)})
        
       
    }
    render(){

        return(
            <div>
               
                <Row>
                    <Col span={24} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                        Guass Seidel Iteration
                         </Col>
                    <Row className='borderaddmatrix'>
                        <Col className='buttonaddmatrix'>
                            <Button onClick={this.onClickmatrixadd}> เพิ่มขนาดเมตตริกซ์ </Button>
                        </Col>
                        <Col className='buttonaddmatrix'>
                            <Button onClick={this.onClickmatrixsubtract}> ลดขนาดเมตตริกซ์ </Button>
                        </Col>
                
                    </Row>

                </Row>
                <Row className='titlematrix'>
                    <Col span={10}> A </Col>
                    <Col span={5}> B </Col>
                </Row>
                <Row className='blackground_row_matrix'>
                    <Col span={10}> <Inputmatrix n={this.state.n} value = {this.state.A} onChange={this.onChangematrixA} /> </Col>
                    <Col span={14}><InputB n={this.state.n} value = {this.state.B} onChange={this.onChangematrixB} /> </Col>
                    <Row>
                    <Input  style = {{width : '150px' ,marginBottom : '20px',marginTop : '10px' }} value = {this.state.E} placeholder = 'Example = 0.00001' onChange = {this.onChangeError}/>
                    </Row>
                </Row>
                
                <Row className='blackground_row_matrix' > 
                    <Col style = {{marginBottom : '10px'}}>
                    <Button size='medium'  style = {{backgroundColor : 'aqua' , border : '2px solid black'   }} onClick={this.onClickCalculator}>คำนวณ</Button>
                    </Col>
                   
                    <Col style = {{padding : '0px 0px 0px 20px' }} >
                     <Button size='medium'  style = {{backgroundColor : 'aqua' , border : '2px solid black'   }} onClick={this.onClickExample}>ตัวอย่าง</Button>
                    </Col>
                </Row>
                <Row style = {{padding : '40px 0px 0px 40px'}}>
                    <Col >
                       {this.state.data}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Guass_Seidel;