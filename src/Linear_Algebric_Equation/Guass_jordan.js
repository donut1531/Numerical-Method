import React from 'react';
import { Row, Col , Button  } from 'antd'
import all_Api from '../API/index'
import {Inputmatrix,InputB}  from '../components/Create_matrix'
import {Modal_matrix} from '../components/Modal'
import './matrix.css'

import { calJordan , copyArray } from '../calculator.js'
class Guass_jordan extends React.Component{
    state = {
        n: 2,
        A: [[],[]],
        B: [],
        data: [],
        isModalVisible: false,
        apiData: [],
        hasData: false
    }

    
    async getData() {
        let tempData = null
        await all_Api.get_Matrix().then(res => { tempData = res.data })
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
            n: this.state.apiData[index]["n"],
            
            A: copyArray(this.state.apiData[index]["n"],this.state.apiData[index]["matrixA"]),

            B: [...this.state.apiData[index]["matrixB"]],
            
            isModalVisible: false
        })
    }

    onClickExample = e => {
         if (!this.state.hasData) { 
            this.getData()
        }
        this.setState({ isModalVisible: true })
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
        
            this.setState({data : calJordan(this.state.n,this.state.A,this.state.B)})
        
       
    }
    render(){

        return(
            <div>
                 <Modal_matrix
                    visible={this.state.isModalVisible}
                    onOK={this.onClickOk}
                    hasData={this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick={this.onClickInsert}
                />
                <Row>
                    <Col span={24} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                        Guass Jordan Method
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
                </Row>
                <Row className='blackground_row_matrix'>
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

export default Guass_jordan;