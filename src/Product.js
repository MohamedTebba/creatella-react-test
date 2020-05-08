import React from 'react'
/**import helper functions */
import {dateFormatter} from './utils'

class Product extends React.Component{
    _isMounted = false

    componentDidMount(){
        this._isMounted = true
        this.props.isMounted(this._isMounted)
    }
    
    componentWillUnmount(){
        this._isMounted = false
        this.props.isMounted(this._isMounted)
    }

    render(){
        const {product} = this.props
        return(
           this._isMounted ? <li className='product'>
                    <span className='product__id'>{product.id}</span>
                    <span className='product__face' style={
                        {
                            /**to give faces their real size */
                            fontSize: product.size
                        }
                    }>{product.face}</span>
                    <span className='product__size'>{product.size} px</span>
                    <span className='product__price'>${product.price/100}</span>
                    <span className='product__date'>{dateFormatter(product.date)}</span>
            </li>
            :null
            )
            
             
        
    }
}

export default Product