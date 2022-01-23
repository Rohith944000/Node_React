import React from 'react';
import styles from './Offices.module.css'

/**
* Dresses components
* uses our dress server REST API http://localhost:3001/dresses
* props inputs: none
*/
class Offices extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        dataCleared: false,
        message : "",
        offices_data : [], // will contain dresses data array from server
        offices_index : 0, // the index of the dress currently shown, start at first in array
        offices_count : 0, // how many dresses in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the dress server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/offices')
        .then(
            (response)=> {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        //console.log(json_response)
                        this.setState({
                            offices_data:json_response.offices, // data received from server
                            offices_count:json_response.offices.length, // how many dresses in array
                            offices_index:0,  // will first show the first dress in the array
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "dress not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "dress not found", db_data:{}}
                            offices_data: {}, // no data received from server
                            offices_count:0,
                            offices_index:0,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    offices_data: {}, // no data received from server
                    offices_count:0,
                    offices_index:0,
                });
            }
        )
    }

    handleChange = (event)=>{
        if(event.target.name === "next"){
            if(this.state.offices_index < this.state.offices_count-1){
                this.setState({offices_index:this.state.offices_index+1})
            }
        }else{
            if(this.state.offices_index > 0){
                this.setState({offices_index:this.state.offices_index-1})
            }
        }
        this.setState({dataCleared:false})
    }
    deleteOffice = (event)=>{
        //this.setState({message:"deleted"})


        let URL = 'http://localhost:8000/offices/' + this.state.offices_data[this.state.offices_index].officecode
        //console.log(URL)

        fetch(URL,
            {
                method: 'DELETE'
            }
        )
        .then((response)=> {

                if (response.ok) {
                   this.setState({message:"Office deleted"})
                   this.componentDidMount()

                }else{
                    this.setState({message:"Data not found"})
            }
        })
    }

    updateOfficeElement = (event)=>{
        const officeIndex = this.state.offices_index
        this.setState(state =>{
            const list = state.offices_data.map((office,index) =>{
                if(index === officeIndex){
                office[event.target.name] = event.target.value
                return office
                }else{
                    return office
                }
            })
            return{
                list,
            }
        })
    }


    updateOffice = ()=>{

        let  URL = 'http://localhost:8000/offices/'

        // let URL = 'http://localhost:8000/offices/' + this.state.offices_data[this.state.offices_index].officecode
        // console.log(URL)

        let officeInfo = this.state.offices_data[this.state.offices_index]
        fetch(URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(officeInfo)
            }
        )

            .then((response) => {
                if (response.ok) {
                    this.setState({message:"Office updated"})
                    this.componentDidMount()

                 }else{
                     this.setState({message:"Please enter valid info"})
             }
            })


    }
    clearData=()=>{
        document.getElementById("officecode").value=""
        document.getElementById("city").value=""
        document.getElementById("phone").value=""
        document.getElementById("addressline1").value=""
        document.getElementById("addressline2").value=""
        document.getElementById("state").value=""
        document.getElementById("country").value=""
        document.getElementById("postalcode").value=""
        document.getElementById("territory").value=""
    }


    // display the offices table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                // office table not empty
                return (
                    <div className={styles.panel300}>
                        <b className={styles.heading}>List of Office from server localhost:8000/offices</b> <br/><br/>
                        <table className={styles.table}>
                            <tbody>
                            <tr><th>officecode</th><td><input type="number" id="officecode" name ="officecode" value={this.state.offices_data[this.state.offices_index].officecode} onChange={(event)=>this.updateOfficeElement(event)} /></td></tr>
                            <tr><th>city</th><td><input type="text" id ="city" name="city" value={this.state.offices_data[this.state.offices_index].city} onChange={(event)=>this.updateOfficeElement(event)} /></td></tr>
                            <tr><th>phone</th><td><input type="text" id ="phone" name="phone" value={this.state.offices_data[this.state.offices_index].phone} onChange={(event)=>this.updateOfficeElement(event)} /></td></tr>
                            <tr><th>addressline1</th><td><input type="text" id ="addressline1" name="addressline1" value={this.state.offices_data[this.state.offices_index].addressline1} onChange={(event)=>this.updateOfficeElement(event)} /></td></tr>
                            <tr><th>addressline2</th><td><input type="text" id ="addressline2" name="addressline2" value={this.state.offices_data[this.state.offices_index].addressline2} onChange={(event)=>this.updateOfficeElement(event)}/></td></tr>
                            <tr><th>state</th><td><input type="text" id ="state" name="state" value={this.state.offices_data[this.state.offices_index].state} onChange={(event)=>this.updateOfficeElement(event)}/></td></tr>
                            <tr><th>country</th><td><input type="text" id ="country" name="country" value={this.state.offices_data[this.state.offices_index].country} onChange={(event)=>this.updateOfficeElement(event)}/></td></tr>
                            <tr><th>postalcode</th><td><input type="text" id ="postalcode" name="postalcode" value={this.state.offices_data[this.state.offices_index].postalcode} onChange={(event)=>this.updateOfficeElement(event)} /></td></tr>
                            <tr><th>territory</th><td><input type="text" id ="territory" name="territory" value={this.state.offices_data[this.state.offices_index].territory}onChange={(event)=>this.updateOfficeElement(event)} /></td></tr>
                            </tbody>
                        </table>
                        <pre><button name="prev" style={{marginRight:"5px"}} onClick={(event)=>this.handleChange(event)} >Prev</button>
                        <b style={{marginRight:"5px"}}>{this.state.offices_index + 1} OF {this.state.offices_count}</b>
                        <button name="next" onClick={(event)=>this.handleChange(event)} >Next</button></pre>
                        <button name="save" style={{marginRight:"5px"}} onClick={()=>this.updateOffice()} >Save</button>
                        <button name="Delete" style={{marginRight:"5px"}} onClick={(event)=>this.deleteOffice(event)} >Delete</button>
                        <button name="clear"style={{marginRight:"5px"}} onClick={()=>this.clearData()} >Clear Data to add new form</button><br/>
                        <b className={styles.message}>{this.state.message}</b><br/>

                    </div>
                )
            }else{
                return(<div className={styles.error}><b>Dress table is empty</b></div>)
            }
        }else{
            return (<div className={styles.error} ><b>Waiting for server ...</b></div>)
        }
    }
  }

export default Offices;