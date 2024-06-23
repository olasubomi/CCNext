import React from 'react';
import { Popover, PopoverBody } from 'reactstrap';


class IngredientSection extends React.Component {
    number = 3;
    ingredientPopOver = true;
    stored_ingredients = [{
        "Garri": { availability: ["Lizy Gidy"] }, "Water": { availability: ["Lizy Gidy"] }, "Sugar": { availability: ["Lizy Gidy"] },
        "Rice- 3 Cups": { availability: ["Lizy Gidy"] }, "Tomatoes x 6": { availability: ["Lizy Gidy"] }, "Onion x 2": { availability: ["Lizy Gidy"] },
        "Palm Oil- 2 Cups": { availability: ["Lizy Gidy"] }, "Black Eyed Beans x 1 bag(350mL)": { availability: ["Lizy Gidy"] }, "Onions x 2": { availability: ["Lizy Gidy"] },
        "Potatoes - 8": { availability: ["Lizy Gidy"] }, "Garlic- 6 cloves": { availability: ["Lizy Gidy"] },
        "Thyme": { availability: ["Lizy Gidy"] }, "Oregano": { availability: ["Lizy Gidy"] }, "Basil": { availability: ["Lizy Gidy"] },
        "Parmesan Cheese": { availability: ["Lizy Gidy"] }, "Oil": { availability: ["Lizy Gidy"] }, "Butter": { availability: ["Lizy Gidy"] }
    }];

    constructor(props) {
        super(props);
        this.IngredientInfoToggle = this.IngredientInfoToggle.bind(this);

        this.state = {
            ingredientPopOver: false,
        }
    }

    IngredientInfoToggle(e) {
        console.log("toggled by:" + e.target);
        console.log()
        // figure out which popver it is
        // this.setState({
        //     ingredientPopOver: !this.state.ingredientPopOver
        // });
    }

    render() {
        let ingredientCount = this.props.selectedMeal.ingredients.length;
        const mealIngredients = (this.props.selectedMeal.ingredients).map((ingredient) =>
            <li key={ingredient}> {ingredient} &nbsp;
                <span id={ingredient} onMouseOver={this.IngredientInfoToggle} onMouseOut={this.IngredientInfoToggle} >
                    <img src="/images/info_icon.png" alt="Product details not found" style={{ width: '13px', height: '13px' }} />
                </span>
            </li>
        );

        var i;
        var popovers;
        for (i = 0; i < ingredientCount; i++) {
            popovers += <Popover placement="auto" isOpen={this.ingredientPopOver} target={this.props.selectedMeal.ingredients[i]} toggle={this.IngredientInfoToggle}>
                <PopoverBody><div className="payback-disclaimer">
                    In Stock in {this.stored_ingredients} store(s)<br></br>
                    <hr></hr>
                    <button>Add to WishList</button><br></br>
                    <button>Add to Cart </button> <br></br>

                </div></PopoverBody>
            </Popover>;
        }
        // const popovers = (this.props.selectedMeal.ingredients).map((ingredient)=>
        //     <Popover placement="auto" isOpen={this.ingredientPopOver} target={ingredient} toggle={this.IngredientInfoToggle}>
        //         <PopoverBody><div className="payback-disclaimer">
        //             In Stock in {this.stored_ingredients} store(s)<br></br>
        //             <hr></hr>
        //             <button>Add to WishList</button><br></br>
        //             <button>Add to Cart </button> <br></br>

        //         </div></PopoverBody>
        //     </Popover>);
        {/* const mealIngredients = <li>{this.props.selectedMeal}</li>;
         (this.props.selectedMeal.ingredients).map(
             (ingredient) => 
             <li key={ingredient[0].toString()}> {ingredient} s {ingredient[0]} t
             <span id="Popover2" onMouseOver={this.IngredientInfoToggle} onMouseOut={this.IngredientInfoToggle} >
             <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/> </span></li> ); */}

        return (
            <div>
                <ul> {mealIngredients} </ul>
                {/* {popovers} */}
                {/* <Popover placement="auto" isOpen={this.ingredientPopOver} target={'Garri'} toggle={this.IngredientInfoToggle}>
            <PopoverBody><div className="payback-disclaimer">
                In Stock in {this.stored_ingredients} store(s)<br></br>
                <hr></hr>
                <button>Add to WishList</button><br></br>
                <button>Add to Cart </button> <br></br>
                    
            </div></PopoverBody>
        </Popover>; */}

                {/* <button>ADD ALL<br></br>PRODUCTS<br></br>TO CART</button> */}
            </div>
        );
    }
}

export default IngredientSection