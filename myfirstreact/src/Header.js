import React from 'react'

class Header extends React.Component {

    render(){
        return(
            <header>
            Company : {this.props.companyName}
        </header>
        )
    }
}
export default Header