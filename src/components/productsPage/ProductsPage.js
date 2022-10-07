import React, { Component } from 'react';
import Popup from "reactjs-popup";

class ProductSection extends Component {
storeCollection = []

constructor(props) {
    super(props);
    this.state = {
      store_products_fetched : false
    };
  }

componentDidMount(){
    console.log("Comes in product pages component will mount")
    var url = "https://chopchowdev.herokuapp.com/get_store_products" // for production
    // var url = "http://localhost:5000/get_store_products"

     fetch(url)
        .then(res => res.text())
        .then(body => {
            var storeList = JSON.parse(body);
             for(var i = 0 ; i < storeList.length; i++){
                console.log("Inner fetch loop");
                console.log(storeList[i]);
                this.storeCollection.push(storeList[i]);
                console.log(storeList[i].store_name)
            }

            this.setState({store_products_fetched:true});


        })
        .catch(error=>{
            console.log(error);
        })
        console.log("reaches end of product pages component will mount");
}

        render() {
            var store_products = []
            console.log(this.storeCollection);
            for (const  [index, value] of this.storeCollection.entries()){
                var productsMenu = []
                // use index to remove warning 
                console.log(index);
                // console.log(value);

                for (const [storeProductsIndex, productValue] of value.products.entries()) {
                    console.log("Inner for loop");
                    //const element = array[index];
                    console.log(storeProductsIndex);
                    console.log(productValue.product_name);

                    //productsMenu.push(productValue.product_name)
                    var key = value.store_name+productValue.product_name
                    productsMenu.push(
                        <div className="col-sm-12 col-md-6 col-lg-4 mealContainer"  key = {key} >
                            <div>
                                <div style={containerStyle}> 
                                    <Popup trigger={
                                        <div id = {productValue.id} style={containerStyle}>
                                            <img src={productValue.product_image} className="images" style={{width:"100%"}} alt={productValue.id}></img>
                                            <div id="textbox">
                                                <p className="alignleft">{productValue.product_name}</p>
                                                <p className="alignright"  style={{color: "green"}}>${productValue.product_price}</p>
                                            </div> 
                                        </div> 
                                    } modal closeOnDocumentClick contentStyle={contentStyle}>
                                        {/* Inside Pop - up */}
                                        <div>
                                            {productValue.product_name}
                                            <br></br>
                                            Availability
                                        </div>

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-6"><b>
                                                <img src={productValue.product_image} alt='info' style={{ width:"100%", height:"100%", align:"center"}}></img>

                                                    </b>
                                                </div> 
                                                <div className="col-sm-6"><b>
                                                    Availabile<br></br>
                                                    Variations:<br></br>
                                                    Price:
                                                    </b>
                                                </div> 
                                            </div>
                                        </div>

                                        <span>View Product</span>&nbsp;|&nbsp;<span>Update Product</span>&nbsp;|&nbsp;<span>Add To Cart..</span>
                                        <hr></hr>
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    )

                }

                store_products.push(
                    <div key={value.store_name}>
                        <hr></hr>
                        <img src={value.store_image} className="images" style={{width:"10%"}} alt={value.id}></img>
                        <b>{value.store_name}</b>

                            <br></br>
                        <div className="container">
                            
                           <div className="row ">
                           {productsMenu}
                           </div>
                       </div>
                        <hr></hr>
                    </div>
                )


            }



            return (
                <div>                    
                    <div id="title"><b>Our Products</b></div>
                    {store_products}
                </div>
            );
        }
}

const containerStyle = {
    //font: "50px",
    display: "inline-block",
    width: "100%",
    height: "100%",
    
}

const contentStyle = {
    // borderRadius: "25px",
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflow: "scroll"
    // width: "90%",
    // height: "50%",
    
    };

    // storeCollection = [
    //     {
    //         store_name: "Lizy Gidy",
    //         store_image: '/images/store_pics/lizy_gidy.jpg',
    //         products:[{
    //             product_name: "Garri",
    //             product_image: '/images/products/garri.jpg',
    //             product_price: 8.99,
    //             variations:["Ijebu Garri", "Ghana Garri","Yellow Garri"],
    //             sizes:["50lbs"]
    //         },{
    //         product_name:"Palm Oil",
    //         product_image: '/images/products/ola_ola_palm_oil.jpg',
    //         product_price: 8.99,
    //         sizes:["64 oz","32 oz","17.6 choleterol free", "35.2","105.60"],
    //         respective_prices:[ 19.99,10.99,7.99,13.99,29.00]
    //         },{
    //         product_name:"Beans",
    //         product_image: '/images/products/beans.jpeg',
    //         product_price: 12.00,
    //         variations:["Brown Beans","Honey Beans"],
    //         sizes:["2 lbs"],
    //         price_per_ounce: 3.2
    //         }
    //     ]},
    //     {
    //         store_name:"African Carribean Market",
    //         store_image: '/images/store_pics/african_carribean_storefront_people.jpg',
    //         products:[{
    //             product_name:"Palm Oil",
    //             product_image: '/images/products/ola_ola_palm_oil.jpg',
    //             product_price: 8.99,
    //             variations:["Ola-Ola Palm Oil","Omni Red Palm Oil 100% unrefined"],
    //             sizes:["1.32 Gallons","0.9 Gallons","50lbs" ],
    //             price_per_gallon: 3.00,
    //             price_per_pound: 0.30
    
    //         },{
    //             product_name:"Beans",
    //             product_image: '/images/products/beans.jpg',
    //             product_price: 2.25,
    //             variations:[ "Black Eyes Peas","Whole Green Peas","Pinto Beans","Red Kidney Beans","Large Lime Beans"],
    //             sizes: "0.5 L"       
    //         },{
    //             product_name:"Egusi",
    //             product_image: '/images/products/egusi.jpg',
    //             product_price: 9.95,
    //             sizes:"5 Lbs"
    //         },{
    //         product_name:"Garri",
    //         product_image: '/images/products/garri.jpg',
    //         product_price: 8.99,
    //         variations:["Ijebu Garri","Ghana Garri","Yellow Garri"],
    //         sizes:"50lbs"
    //         }]
    //     }     
    // ]


export default ProductSection;