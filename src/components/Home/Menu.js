import React, { Component } from 'react'
import Title from '../Globals/Title'
import Img from 'gatsby-image'
import styles from '../css/parallax.module.css';

const getCategories = items => {
    let tempItems = items.map(items => {
        return items.node.category;
    })
    let tempCategories = new Set(tempItems); // get unique value: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    let categories = Array.from(tempCategories); // change object to array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    categories = ['all', ...categories]
    return categories;
}

class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("<<menu props>>");
        console.log(props.items);
        this.state = {
            items: props.items.edges,
            listItems: props.items.edges,
            categories: getCategories(props.items.edges)
        }
    }
    handleItems = (category) => {
        let tempItems = [...this.state.items];
        if (category === "all") {
            this.setState(() => {
                return { listItems: tempItems }
            })
        }
        else {
            let items = tempItems.filter(({ node }) => node.category === category);
            this.setState(() => {
                return { listItems: items };
            })
        }
    }

    render() {
        console.log("<<get categories>>");
        console.log(this.state.categories);
        if (this.state.items.length > 0) {
            return (
                <section className={styles.contentAreaBig}>
                    <div className={styles.stickySmall}>
                        <section className="menu py-5">
                            <div className="container">
                                <Title title="Our Menu" />
                                {/* Categories */}
                                <div className="row mb-5">
                                    <div className="col-10 mx-auto text-center">
                                        {this.state.categories.map((category, index) => {
                                            return (<button type="button" key={index} className="btn btn-blue text-capitalize m-3" onClick={() => { this.handleItems(category) }}>{category}</button>)
                                        })}
                                    </div>
                                </div>
                                {/* Items */}
                                <div className="row">
                                    {/* list items array in state, loop through array */}
                                    {this.state.listItems.map(({ node }) => {
                                        return (

                                            <div key={node.id} className="col-11 col-md-6 my-3 d-flex mx-auto">
                                                <div><Img fixed={node.image.fixed} /></div>
                                                <div className="flex-grow-1 px-3">
                                                    <div className="d-flex justify-content-between">
                                                        <h6 className="mb-0">{node.title}</h6>
                                                        <h6 className="mb-0">{node.price}</h6>
                                                    </div>
                                                    <p className="text-muted">
                                                        <small>{node.description.description}</small>
                                                    </p>
                                                </div>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            );
        } else {
            return (
                <section className={styles.contentAreaSmall}>
                    <div className={styles.sticky}>
                        <div>
                            <section>
                                <section className="menu py-5">
                                    <div className="container">
                                        <Title title="Our Menu"></Title>
                                        <div className="row">
                                            <div className="col-10 col-sm-6 mx-auto text-center text-capitalize">
                                                <h1>Nothing to display</h1>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </section>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

export default Menu
