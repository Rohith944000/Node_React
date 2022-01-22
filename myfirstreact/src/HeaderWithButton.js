import React from 'react';
import styles from './Header.module.css'
/**
 * Web Site Header component
 */
class HeaderWithButton extends React.Component {
    constructor(props){
        super(props)
        // initialize companyName with props input
        this.state= {companyName:this.props.companyName}
    }

    // onClick event handler for button 'Change Name'
    // MUST USE ARROW SYNTAX FOR EVENT HANDLERS otherwise 'this' will cause problems !
    changeName =(newname)=>{
        this.setState({companyName:newname})
    }
    changeNameEvent =(event)=>{
        this.setState({companyName:event.target.value})
    }

    // this code without arrow function syntax throws an error when clicking and executing
    // because 'this' is undefined
    // Uncaught TypeError: Cannot read property 'setState' of undefined
    //changeNameFixValue(){
    //    this.setState({companyName:"Testing.com"})
    //}

    changeNameFixValue=()=>{
        this.setState({companyName:"Testing.com"})
    }

    render(){
        // using in-line styling, note the use of double curly brackets
        // the style must be a js object. see https://www.w3schools.com/react/react_css.asp
        // property names are not the same as pure CSS, they must follow the camelCased syntax
        return (
            <header className={styles.header}>
                <p className={styles.p1}>
                    from header
                </p>
                <h2>
                    Welcome to {this.state.companyName}
                </h2>
                <button onClick={()=>this.changeNameFixValue()}>Change to fix name</button>
                <br/>
                <form>
                <input type="text" name="newname" id="newname" onChange = {(event)=>this.changeNameEvent(event)}/>
                <button type="button" onClick={()=>this.changeName(document.getElementById("newname").value)}>Change name</button>
                </form>
            </header>
        )
    }
}

export default HeaderWithButton;