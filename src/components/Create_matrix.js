import {Input ,Row, Col} from 'antd'
import React from 'react';
 class InputMultiple extends React.Component{

    ShowInput(){
        let arrRow = []
        for(let i = 0 ; i < this.props.n ; i++){
            let arrCol = []
            for(let j = 0 ;  j < 4 ; j++){
                if(j == 3 ){
                    arrCol.push(<Col className = 'colInput'>  <Input style = {{width : '100px'}} value = {this.props.value[i][j]} name = {i.toString()+' '+j.toString()} placeholder = {'Y'+i.toString()} onChange = {this.props.onChange} autoComplete = 'off'/>  </Col>)
                    
                }
                else {
                    arrCol.push(<Col className = 'colInput'>  <Input style = {{width : '100px'}}  value = {this.props.value[i][j]} name = {i.toString()+' '+j.toString()} placeholder = {'X'+i.toString()+''+j.toString()} onChange = {this.props.onChange} autoComplete = 'off'/>  </Col>)
                }
               
                
            }
            arrRow.push(<Row className = 'rowInput'>{arrCol}</Row>)
            
            
        } 
        return arrRow
    }
    
    render(){
        return(
            <div>
                {this.ShowInput()}
            </div>
        )
    }
}
class InputXY extends React.Component{

    ShowInput(){
        let arrRow = []
        for(let i = 0 ; i < this.props.n ; i++){
            let arrCol = []
            for(let j = 0 ;  j < 2 ; j++){
                if(j == 0){
                    arrCol.push(<Col className = 'colInput'>  <Input style = {{width : '100px'}} value = {this.props.value[i][j]} name = {i.toString()+' '+j.toString()} placeholder = 'X' onChange = {this.props.onChange} autoComplete = 'off'/>  </Col>)
                }
                else if(j == 1){
                    arrCol.push(<Col className = 'colInput'>  <Input style = {{width : '100px'}} value = {this.props.value[i][j]} name = {i.toString()+' '+j.toString()} placeholder = 'f(X)' onChange = {this.props.onChange} autoComplete = 'off'/>  </Col>)
                }
               
                
            }
            arrRow.push(<Row className = 'rowInput'>{arrCol}</Row>)
            
            
        } 
        return arrRow
    }
    
    render(){
        return(
            <div>
                {this.ShowInput()}
            </div>
        )
    }
}
 class Inputmatrix extends React.Component{

    
    showInput(){
        let arrRow = []
        for(let i = 0 ; i < this.props.n ; i++){
            let arrCol = [] 
            for(let j = 0 ;  j < this.props.n ; j++){
                arrCol.push(<Col className = 'colInput'>  <Input style = {{width : '60px'}}  name = {i.toString()+' '+j.toString()} placeholder = '' value = {this.props.value[i][j]} onChange = {this.props.onChange} autoComplete = 'off'/>  </Col>)
                
            }
            arrRow.push(<Row className = 'rowInput'>{arrCol}</Row>)
            
            
        } 
        return arrRow
    }

    render() {
        return (
            <div>
                
                
                   {this.showInput()}
                
            </div>
        )
    }
}
 class InputB extends React.Component{

    ShowInput(){
        let arrCol = []
        for(let i = 0 ; i < this.props.n ; i++){
           
            for(let j = 0 ;  j < 1 ; j++){
                arrCol.push(<Row className = 'colInput'>  <Input style = {{width : '60px'}}  name = {'b'+' '+i.toString()} placeholder = '' value = {this.props.value[i]}  onChange = {this.props.onChange} autoComplete = 'off'/>  </Row>)
                
            }
           
            
            
        } 
        
        return arrCol
    } 
    render(){
        return(
            <div>
                {this.ShowInput()}
            </div>
        )
    }
}

export {InputMultiple , InputB , Inputmatrix , InputXY}