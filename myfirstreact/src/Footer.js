import React from 'react'
import styles from './Footer.module.css'

class Footer extends React.Component {

    render(){
        return(
            <footer className={styles.footer}>
                 <p className={styles.p1}>
                    from footer
                </p>
            author : {this.props.author}
        </footer>
        )
    }
}
export default Footer