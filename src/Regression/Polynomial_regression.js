import React from 'react';
import {Input, Row, Col , Button  } from 'antd'
import all_Api from '../API/index'
import {InputXY}  from '../components/Create_matrix'

import '../Linear_Algebric_Equation/matrix.css'
import { calPoly ,copyArray } from '../Calculator.js'

export default class Polynomial_regression extends React.Component{

    state = {
        n: 2,
        A: [[],[]],
      
        X: '',
        data: [],
       
        apiData: [],
       
        id : 1
    }
    async getData() {
        let tempData = null
        await all_Api.get_Matrix_Regression().then(res => { tempData = res.data })
        this.setState({ apiData: tempData })
       
        
        this.setState({
            n: this.state.apiData[1]["n"],
            
            A: copyArray(this.state.apiData[1]["n"],this.state.apiData[1]["matrixA"]),

            X: this.state.apiData[1]["x"],

        
            
            
        })
    }
   

    onClickExample = e => {
        
            this.getData()
       
    }

    onChangematrixXY = (e) =>{
        let index = e.target.name.split(" ")
        let value = e.target.value
        let arr = this.state.A
        arr[parseInt(index[0])][parseInt(index[1])] = value
        this.setState({A : arr})
       
    
    }
    onChangeX = e => {
        this.setState({X : e.target.value})
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
        
            this.setState({data : calPoly(this.state.A,this.state.X)})
        
        
    }

    render(){
        return(
            <div>
                <Row style ={{marginBottom : '10px  '}}>
                    <Col span={24} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                            Polynomial Regression
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
              
                <Row className='blackground_row_matrix'>
                    <Col span={24}> กรุณาใส่ค่า XY </Col>
                    <Col span={24}> 
                        <InputXY n={this.state.n} value={this.state.A} onChange={this.onChangematrixXY} />
                    </Col>
                    <Col span = {24}>กรุณากรอกค่า X </Col>
                    <Col span={24}>

                        <Input style={{ width: '150px', marginBottom: '20px', marginTop: '10px' }} value={this.state.X} placeholder='Example X = 42000' onChange={this.onChangeX} />
                    </Col>
             
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
        )
    }
}