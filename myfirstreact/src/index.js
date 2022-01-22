import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
//import Nav from './Nav'
import Footer from './Footer'
//import Header from './Header'
import SelectList from './SelectList'
// import App from './App'
import reportWebVitals from './reportWebVitals'
import HeaderWithButton from './HeaderWithButton'
import LoginForm from './LoginForm'

const provinces=[ {code:'QC',name:'Quebec'},{code:'ON',name:'Ontario'},{code:'NB',name:'New-Brunswick'}]

const countries=[{code:'CA',name:'Canada'},{code:'US',name:'USA'},{code:'IN',name:'India'},{code:'MX',name:'Mexixo'}]

class Page extends React.Component{
  render(){
            return (
            <div>
                <HeaderWithButton companyName="blabla.com"/>
                <p>Hello World !</p>
                <SelectList array={provinces}/>
                <SelectList array={countries}/>
                <LoginForm username = "toto" pw = "12345678" />
                <Footer author="Rohith"/>
            </div>
        )
    }
}

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
