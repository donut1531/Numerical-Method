import React from 'react'
import { Row, Col } from 'antd'
import { Button ,Modal} from 'antd'


 class Modal_roe extends React.Component{

    render(){
        return(
            <div>
                
                 <Modal
                    title ='ตัวอย่าง'
                    visible ={this.props.visible}
                    onOK={this.props.onOK}
                    onCancel={this.props.onOK}
                    footer = {[
                        <Button type = 'primary' onClick={this.props.onOK}>
                            Ok
                        </Button>
                    ]}
                >   
                    {this.props.hasData ?
                        
                        this.props.apiData.map((x,i) =>(
                            <Row>
                                    <Col span={12}>{x['equation']}</Col>
                                    <Col span={12}>
                                        <Button name = {'insert_'+i} type='primary' onClick={this.props.onClick}>Insert</Button>
                                    </Col>
                                    <hr/>
                               
                            </Row>
                        ))
                        :   <span style={{fontSize:"25px", textAlign:"center"}}>กำลังโหลดข้อมูล</span>}
                    
                </Modal>
            </div>
        )
    }
}

class Modal_matrix extends React.Component{

    render(){
        return(
            <div>
                
                <Modal
                    title ='ตัวอย่าง'
                    visible ={this.props.visible}
                    onOK={this.props.onOK}
                    onCancel={this.props.onOK}
                    footer = {[
                        <Button type = 'primary' onClick={this.props.onOK}>
                            Ok
                        </Button>
                    ]}
                >   
                   {this.props.hasData ?
                        
                        this.props.apiData.map((x,i) =>(
                            <Row>
                                    <Col span={12}>โจทย์ {x['id']+1}</Col>
                                    <Col span={12}>
                                        <Button name = {'insert_'+i} type='primary'  onClick={this.props.onClick}>Insert</Button>
                                    </Col>
                                    <hr/>

                            </Row>
                        ))
                        : <span style={{fontSize:"25px", textAlign:"center"}}>กำลังโหลดข้อมูล</span>}
                    
                </Modal>
            </div>
        )
    }
}




export {Modal_roe , Modal_matrix}

