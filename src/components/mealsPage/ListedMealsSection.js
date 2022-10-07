import React, { Component } from 'react';


class ListedMealsSection extends Component {
    
        render() {
            let styles ={
                "backgroundColor":'#fd8953'
            }
            const mealsListed = this.props.recipes.map(
                (meal)=> {
                    //console.log(this.props.selectedMeal);
                    if(meal === this.props.selectedMeal){
                        return  <li key={meal.id} onClick={this.props.showIngredients}> <span style={styles}><b>{meal.label}</b></span> </li>
                    }
                    else{
                        return <li key={meal.id} onClick={this.props.showIngredients}> {meal.label} </li>
                    }
                })

            return (
                <div>                    
                    <ol> {mealsListed} </ol>
                </div>
            );
        }
}

export default ListedMealsSection;