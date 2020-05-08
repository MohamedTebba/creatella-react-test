import React from 'react'
import ReactLoading from 'react-loading'

class Ads extends React.Component{

    _isMounted = false
    
    state = {
        imgURL: '',
        loading: false,
    }

    componentDidMount() {
        this._isMounted = true
        const {randomNb} = this.props,
        url = `/ads/?r=${randomNb}`
        this.setState({loading:true})
        fetch(url)
        .then(data => {
            if(this._isMounted){
                this.setState({imgURL: data.url, loading: false})
            }
        })
    }
    
    componentWillUnmount(){
        this._isMounted = false
    }

    render(){
        return(
                this.state.loading?
                <ReactLoading className="loading" type={'bars'} color="#8c1e3cb3" /> :
                <img className="ad" src={this.state.imgURL} alt="sponsor img"/>
            )
        }
    }
    
    export default Ads