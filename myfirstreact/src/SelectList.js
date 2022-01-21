import React from 'react'

class SelectList extends React.Component{

    render(){
        const elements = this.props.array
        const updatedElements = elements.map((element,index)=>{
            return <option key={index} value={element.code}>{element.name}</option>
        })
        return(
            <div>
                <select>
                    {updatedElements}
                </select>
            </div>
        )

    }

}

export default SelectList