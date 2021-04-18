import './App.css';
import Bisection from './rootofequation/Bisection';
import { Route, HashRouter,Link } from "react-router-dom";
import React from 'react';
import { Layout, Typography, Menu, Breadcrumb} from 'antd';

import False_position from  './rootofequation/False_position'
import One_point  from  './rootofequation/One_point'
import Newton_raphson from  './rootofequation/Newton_raphson'
import Secant from  './rootofequation/Secant'
import Guass_elimation from  './Matrix/Guass_elimation'
import Lu_decomposition from './Matrix/Lu_decomposition'
import Guass_jordan from  './Matrix/Guass_jordan'
import Guass_seidel from  './Matrix/Guass_seidel'
import Conjugate_gradient from  './Matrix/Conjugate_gradient'
import Jacobi from  './Matrix/Jacobi'
import Cramer from  './Matrix/Cramer'

const { SubMenu } = Menu;

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;


class App extends React.Component{

  render(){
    
    return (
      <div className="App">
      <HashRouter>

      
      <Layout>
        <Header className="header">
          
          <div className="logo" />
          
          
        </Header>
      <Layout style = {{minHeight:'100vh'}}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1"  title="Root of Equations">
            <Menu.Item key="1">Bisection Method <Link to = '/bisection' /></Menu.Item>
            <Menu.Item key="2">False-Position Method<Link to = '/false-position' /></Menu.Item>
            <Menu.Item key="3">One-Point Iteration Method<Link to = '/one-point' /></Menu.Item>
            <Menu.Item key="4">Newton-Raphson Method<Link to = '/newton-raphson' /></Menu.Item>
            <Menu.Item key="5">Secant Method<Link to = '/secant' /></Menu.Item>
            
          </SubMenu>
          <SubMenu key="sub2" title="Linear Algebraic Equations">
            <Menu.Item key="6">Cramer's Rule<Link to = '/cramer' /></Menu.Item>
            <Menu.Item key="7">Gauss Elimation Method<Link to = '/guass-elimation' /></Menu.Item>
            <Menu.Item key="8">Guass-Jordan Method<Link to = '/guass-jordan' /></Menu.Item>
            <Menu.Item key="9">LU Decompostion Method<Link to = '/lu-decompostion' /></Menu.Item>
            <Menu.Item key="10">Jacobi Iteration Method<Link to = '/jacobi-iteration' /></Menu.Item>
            <Menu.Item key="11">Guass-Seidel Iteration Method<Link to = '/guass-seidel' /></Menu.Item>
            <Menu.Item key="12">Conjugate Gradient Method<Link to = '/conjugate-gradient' /></Menu.Item>
            
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
         { /* Root of Equation  */}
         <Route exact path = '/'component = {Bisection}/>
         <Route path = '/bisection'component = {Bisection}/>
         <Route path = '/false-position' component = {False_position} />
         <Route path = '/one-point' component = {One_point} />
         <Route path = '/newton-raphson' component = {Newton_raphson} />
         <Route path = '/secant' component = {Secant} />
         { /* Linear Algebraic Equation  */}
         <Route path = '/cramer' component = {Cramer} />
         <Route path = '/guass-elimation' component = {Guass_elimation} />
         <Route path = '/lu-decompostion' component = {Lu_decomposition} />
         <Route path = '/jacobi-iteration' component = {Jacobi} />
         <Route path = '/guass-seidel' component = {Guass_seidel} />
         <Route path = '/guass-jordan' component = {Guass_jordan} />
         <Route path = '/conjugate-gradient' component = {Conjugate_gradient} />
        
           
        </Content>
      </Layout>
    </Layout>
  </Layout>
  </HashRouter>  
      </div>
    );
  }

}

export default App;