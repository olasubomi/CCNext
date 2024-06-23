import React, { Component } from 'react';
//import {Typeahead} from 'react-bootstrap-typeahead';
import Popup from "reactjs-popup";


class RecipeContentSection extends Component {
   
    render(){
        //var imgsrc = this.props.selectedMeal.imageSrc;
        const mealPrep = this.props.selectedMeal.instructions.map((step)=> <li key={step} > {step} </li>);

            return (
                <div>                  
                    <div>{this.props.selectedMeal.label} </div>
                    <div> 
                    {/* <img src={require('./images/Garri.jpg')}/> */}
                    {/* <img src={this.props.selectedMeal.imageSrc} alt="alt"/> */}
                    <img src={this.props.selectedMeal.imageSrc} alt='info' style={{width:'350px', height:'350px'}}/>
                    {/* <img src={require('/images/Garri.jpg')} alt='info' style={{width:'13px', height:'13px'}}/> */}
                    </div>
                    <div>{this.props.selectedMeal.readTime} </div>
                    <div> {this.props.selectedMeal.cookTime}</div>
                    <Popup trigger={<u>Click here to read steps</u>} modal 
                        contentStyle={contentStyle}>
                        {close => (
                            <div>
                                <button href = "#" className="close" onClick={close}>&times;</button>
                                <div className="container" style={containerStyle} id="bigContainer">
                                <div className="row align-items-center">
                                    <img src={this.props.selectedMeal.imageSrc} alt='info' style={{width:'35%', height:'35%'}}></img>
                                    <div className="col-sm"><ol style={listStyle}>{mealPrep}</ol></div>
                                </div>
                                    <div className="row" >
                                     <div className="container"> {/*Trying to create a new sub container*/}
                                        <div className = "row">
                                            <div className="col-sm">
                                                
                                            </div>
                                        </div>
                                         </div>
                                        
        {/*<img src="../images/Arrow--NicholasJudy456.png" width="50%" height="40%" onclick="DoSomething();"/>*/}
        {/* <button onClick="DoSomething" style={buttonStyle}>Next Page</button> */}
                                    </div>
                            </div>
                        </div>
                        )}           
                    </Popup>
                    {/* <ol> {mealPrep}</ol> {/*trigger={<a href="#">Click hear to read steps</a>}*/}

                </div>
        );
            
    } 

   
    
}

const containerStyle = {
        //font: "50px",
        display: "inline-block",
        width: "100%",
        height: "100%"
}

const contentStyle = {
    // borderRadius: "25px",
    maxWidth: "100%",
    maxHeight: "100%",
    // width: "90%",
    // height: "50%",
   
};

const listStyle = {
   
}

// const buttonStyle={
//     display:"inline-block"
// }

// const arrowPic = {
//     width: "50%",
//     height: "40%"
// }




export default RecipeContentSection;
