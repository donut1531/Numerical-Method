import React from 'react';
import {Input, Row, Col , Button  } from 'antd'
import all_Api from '../API/index'
import {InputMultiple}  from '../components/Create_matrix'

import '../Linear_Algebric_Equation/matrix.css'
import { calMultiple ,copyArray } from '../Calculator.js'

export default class Multi_Linear extends React.Component{

    state = {
        n : 2,
        A : [[],[]]  ,
        X1 : '',
        X2 : '',
        X3 : '',
        data : [],
       
        apiData: [],
        
        id : 2
        }
        async getData() {
            let tempData = null
            await all_Api.get_Matrix_Regression().then(res => { tempData = res.data })
            this.setState({ apiData: tempData })
            
            
            this.setState({
                n: this.state.apiData[2]["n"],
                
                A: copyArray(this.state.apiData[2]["n"],this.state.apiData[2]["matrixA"]),
    
                X1: this.state.apiData[2]["x1"],
                X2: this.state.apiData[2]["x2"],
                X3: this.state.apiData[2]["x3"],
               
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
       
        onChangeX1 = e => {
            this.setState({X1 : e.target.value})
         }
        onChangeX2 = e => {
        this.setState({X2 : e.target.value})
        }
        onChangeX3 = e => {
        this.setState({X3 : e.target.value})
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
            
                this.setState({data : calMultiple(this.state.n,this.state.A,this.state.X1,this.state.X2,this.state.X3)})
        }
        
        render(){
            return(
                <div>
               
                <Row style ={{marginBottom : '10px  '}}>
                    <Col span={24} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                            Linear Regression
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
                        <InputMultiple n={this.state.n} value={this.state.A} onChange={this.onChangematrixXY} />
                    </Col>
                    <Col span = {24}>กรุณากรอกค่า X1 </Col>
                    <Col span={24}>

                        <Input style={{ width: '150px', marginBottom: '20px', marginTop: '10px' }} value={this.state.X1} placeholder='Example X = 1' onChange={this.onChangeX1} />
                    </Col>
                    <Col span = {24}>กรุณากรอกค่า X2 </Col>
                    <Col span={24}>

                        <Input style={{ width: '150px', marginBottom: '20px', marginTop: '10px' }} value={this.state.X2} placeholder='Example X = 0' onChange={this.onChangeX2} />
                    </Col>
                    <Col span = {24}>กรุณากรอกค่า X3 </Col>
                    <Col span={24}>

                        <Input style={{ width: '150px', marginBottom: '20px', marginTop: '10px' }} value={this.state.X3} placeholder='Example X = 1' onChange={this.onChangeX3} />
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