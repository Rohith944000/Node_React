import React from "react";

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        //save intial value in state
        this.state ={
            "username":this.props.username,
            "pw": this.props.pw
        }
    }
    handleChange = (event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        return(
            <form style={{border:"1px solid black",width:"300px", backgroundColor : "red"}}>
                username <input type="text" id="username" name="username" value={this.state.username} onChange={(event)=>this.handleChange(event)}  /><br/>
                password <input type="password" id = "pw" name="pw" value={this.state.pw} onChange={(event)=>this.handleChange(event)}/><br/>
                <button>Connect</button>
            </form>
        )
    }

}

export default LoginForm