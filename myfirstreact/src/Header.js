import React from 'react'
import './Header.css'

class Header extends React.Component {

    render(){
        if(this.props.companyName){
            return(
            <header>
                Company : {this.props.companyName}
             </header>
            )
        }else{
            <header>
                company name is missing
            </header>
        }

    }
}
export default Header