import React from 'react'

class Footer extends React.Component {

    render(){
        return(
            <footer>
            author : {this.props.author}
        </footer>
        )
    }
}
export default Footer