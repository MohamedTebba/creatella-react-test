import React from 'react'
import IdleTimer from 'react-idle-timer'
/**styles */
import './styles/products.scss'
/**components */
import Product from './Product'
import Ads from './Ads'
import ReactLoading from 'react-loading'
/**helper functions */
import { handleScroll, handleAdsShwo } from './utils'

class ProductsList extends React.Component {

    state = {
        productIsMounted: false,
        products: [],
        limit: 45,
        randomNb: 0,
        end: false,
        loading: false,
        page: 1,
        param: `&_sort=null`,
    }
    idleTimerRef = null

    fetchResults(param, page, limit){
            return new Promise((res, err) => {
                fetch(`/products?_page=${page}&_limit=${limit}${param ? param.split('=')[1] !== 'null' ? param : '' : ''}`)
                    .then(res => res.json())
                    .then(data => res(data))
            })
    }

    firstFetch(){
        localStorage.clear()
        this.setState({products: []})
        this.setState({loading: true})
        const {param, limit, page} = this.state
        this.fetchResults(param, page, limit)
            .then(data => {
            localStorage.setItem('products', "[]")
            this.setState({
                products: [...data]
            })
            this.setState({
                loading: false,
                page: page+1
            })})
    
    }

    /**get the next batch of products */
    nextFetch() {
        const {param, limit, page} = this.state
        this.fetchResults(param, page, limit)
            .then(data => {
                const cachedProducts = JSON.parse(localStorage.getItem('products'))
            localStorage.setItem('products', JSON.stringify([...cachedProducts, ...data]))
            this.setState({
                page: page+1
            })})
    }

    /**get only a limitied number of products to display them */
    getLimitedResults(limit, cachedProducts){
        const {products } = this.state
        const preemtivelyProducts = []
            preemtivelyProducts.push(...cachedProducts.slice(0, limit))
                this.setState({
                    products: [...products,...preemtivelyProducts]
                })
            const leftProducts = cachedProducts.slice(limit, cachedProducts.length)
            localStorage.setItem('products', JSON.stringify(leftProducts))
    }

    getPreemptivelyProducts(limit = 15){
        const cachedProducts = JSON.parse(localStorage.getItem('products'))   
        if(cachedProducts){
            if(cachedProducts.length>0){
                this.getLimitedResults(limit, cachedProducts)
            }else{
                this.setState({ end: true })
            }
        }
    }

    /**sort function to sort products */
    sortBy(param) {
        // window.removeEventListener('scroll', this.onScrollEvent)
        if(this.state.productIsMounted) {
            this.setState({ param: `&_sort=${param}`, end: false, page:1 }, this.firstFetch)
        }
        window.scrollTo(window.top)
    }

    onScrollEvent(limit, products){
             /**add shadow to sort bar when scrolling and remove it when on top */
             if(document.querySelector('.sort-bar').getBoundingClientRect().top === 0) {
                document.querySelector('.sort-bar').classList.add('on-scroll')
            }else{
                document.querySelector('.sort-bar').classList.remove('on-scroll')
            }
            /**check if scrolling reached the bottom of the page */
            if (handleScroll()) {
                this.getPreemptivelyProducts(limit)
                /**create random numbers for ads after every 20 products */
                /**first I need to track how many products I have that have reached every 20 ones or passed them */
                /**then I'll get the modulo of the difference between the current products number and the number I have calculated before, with the 20 */
                if ((products.length - (products.length - 20)) % 20 === 0) {
                        this.setState({ randomNb: handleAdsShwo(this.state.randomNb) })
                }
            }
    }

    onIdleHandler() {
        console.log('user is idle...')
        this.nextFetch()
    }

    componentDidMount(){
            const { limit, products } = this.state
                this.firstFetch()
                this.setState({ randomNb: handleAdsShwo(this.state.randomNb) })
                window.addEventListener('scroll', () => {
                    this.onScrollEvent(limit, products)
                })
        }

    mountedProductToggle(isMounted) {
        this.setState({productIsMounted: isMounted})
    
    }

    render() {
        const { products, randomNb, loading } = this.state
        return (
            <section className="products" >
                <p>But first, a word from our sponsors:</p>
                <Ads randomNb={randomNb}/>
                <div className="sort-bar">
                    <span>sort by</span>
                    <div className="sort-bar__sort-by"
                        onClick={(e) => {
                            this.sortBy(e.target.innerText.toLowerCase())
                            Array.from(e.target.parentElement.children).forEach(span => span.classList.remove("active-order"))
                            e.target.classList.add('active-order')
                        }}>
                        <span className="active-order">default</span>
                        <span>size</span>
                        <span>price</span>
                        <span>id</span>
                    </div>
                </div>
                <IdleTimer ref={ref=>{this.idleTimerRef=ref}} timeout={3.5*1000} onIdle={this.onIdleHandler.bind(this)}>
                    <ul className="products__list">
                        {loading ?
                            <ReactLoading className="loading" type={'bars'} color="#8c1e3cb3" />
                            : products.map((product, index) => {
                                /**generate ads every 20 products */
                                if ((index + 1) % 20 === 0) {
                                    return <React.Fragment key={index}>
                                        <Product product={product} key={index+product.id} isMounted={this.mountedProductToggle.bind(this)} />
                                        <Ads key={index} randomNb={randomNb}/>
                                    </React.Fragment>
                                } else {
                                    return <Product product={product} key={index+product.id} isMounted={this.mountedProductToggle.bind(this)}/>
                                }
                            })
                        }
                        {
                            (this.state.end) && <h2 className="end-of-catalog">~ end of catalogue ~</h2>
                        }
                    </ul>
                </IdleTimer>
            </section>
        )
    }
}

export default ProductsList 