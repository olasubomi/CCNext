import React from 'react';
import './componentToPrint.css'
import img_logo from "../../assets/images/logo2.png"

class ComponentToPrint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          instructionFontSize: '14px'
        }
    }

    componentDidMount(){
      console.log(this)
      if(this.props.instructionWordlength > 150){
        this.setState({
          instructionFontSize: '10px'
        })
        alert('Instruction steps might be too long for preview. Consider reducing text or spreading text more evenly between the sections available.')
      }

      // if((this.props.instructionChunk4.instructionSteps.length+this.props.instructionChunk1.instructionSteps.length) > 12){
      //   this.setState({
      //     instructionFontSize: '10px'
      //   })
      // }else if((this.props.instructionChunk2.instructionSteps.length+this.props.instructionChunk5.instructionSteps.length) > 12){
      //   this.setState({
      //     instructionFontSize: '10px'
      //   })
      // }else if((this.props.instructionChunk3.instructionSteps.length+this.props.instructionChunk6.instructionSteps.length) > 12){
      //   this.setState({
      //     instructionFontSize: '10px'
      //   })
      // }
    }

    render() {
        const { ingredientsList, categories, utensilsList } = this.props;
        let displayedCategories = ''
        displayedCategories = categories.map((cat) => cat + ', ');
        let displayedIngredients = ingredientsList.map((ingredientSyntax) => <li key={ingredientSyntax} > <h4>{ingredientSyntax} </h4></li>);
        let displayedUtensils =  utensilsList.map((utensil) => <li key={utensil} >{utensil}</li>);
        //  displayedCategories+= '</div>'
    
        let fontSize;

        if(ingredientsList.length > 11){
          fontSize = (14 - (ingredientsList.length / 11)) + "px"
        }else{
          fontSize = '14px'
        }
        let mealFont;
        if(this.props.mealName.length > 16){
          mealFont = '20px'
        }else{
          mealFont = '70px'
        }
        console.log("categories are:")
        console.log(this.props.categories);
        console.log("displayed categories are:")
        console.log(displayedCategories);
        console.log("mealImageData");

        console.log(this.props.mealImageData);

        
        return (
            <div>
               {/* <div className="container">
                <div className="row" style={{ width: "100%" }}>
                  <div className="detail-firstCol col-md-5 col-sm-12" >
                    <img src={this.props.mealImageData} ></img>
                    Meal Image
                  </div>
                </div>
              </div>
              {displayedCategories}<br></br>
              Prep Time: {this.props.prepTime} | Cook Time: {this.props.cookTime} | Serves {this.props.serves} people<br></br>
              <img alt="Logo"></img> {this.props.mealName}<br></br>
              Ingredients:<br></br>
              <ul>{displayedIngredients}</ul><br></br>
              Utensils Needed:
              <ul>{displayedUtensils}</ul> */}

              {/* Page 2 */}
              {/* <div style={{"pageBreakBefore": "always"}}>
                <div> 
                  {this.props.instructionChunk1.title}<br></br>
                  {this.props.instructionChunk1.dataName}<br></br>
                  {this.props.instructionChunk1.instructionSteps}
                  {this.props.instructionChunk2.title}<br></br>
                  {this.props.instructionChunk2.dataName}<br></br>
                  {this.props.instructionChunk2.instructionSteps}
                </div>
                <div> 
                  {this.props.instructionChunk3.title}<br></br>
                  {this.props.instructionChunk3.dataName}<br></br>
                  {this.props.instructionChunk3.instructionSteps}
                  {this.props.instructionChunk4.title}<br></br>
                  {this.props.instructionChunk4.dataName}<br></br>
                  {this.props.instructionChunk4.instructionSteps}
                </div>
                <div> 
                  {this.props.instructionChunk5.title}<br></br>
                  {this.props.instructionChunk5.dataName}<br></br>
                  {this.props.instructionChunk5.instructionSteps}
                  {this.props.instructionChunk6.title}<br></br>
                  {this.props.instructionChunk6.dataName}<br></br>
                  {this.props.instructionChunk6.instructionSteps}
                </div>
                {this.props.tips}
                <div>Connect with us @chop_soul_full</div>
              </div> */}
                <div className="print">
                  <div className="print_page_1">
                    <div className="print_page_1_row_1">
                      <img className="print_main_logo_img" alt="print_main_logo_image" src={this.props.mealImageData} ></img>
                    </div>
                    <div className="print_page_1_row_2">
                      <div className="print_page_1_col_1">
                        <div className="print_categories">
                          <h5 className="print_category">{this.props.categories.join(', ')}</h5>
                          
                        </div>
                        <div className="meal_details">
                          <div className="col_2">
                            <div className="meal_detail">
                              <img className='meal_detail_icon' alt="meal_detail_icon" src='/images/meal_preview_imgs/prep_time.jpg' />
                              <h2>Prep Time:</h2>
                              <p>{this.props.prepTime} mins</p>
                            </div>
                          </div>
                          <div className="col_2">
                            <div className="meal_detail">
                              <img className='meal_detail_icon' alt="meal_detail_icon" src='/images/meal_preview_imgs/cook_time.jpg' />
                              <h2>Cook Time:</h2>
                              <p>{this.props.cookTime} mins</p>
                            </div>
                            <div className="meal_detail">
                              <img className='meal_detail_icon' alt="meal_detail_icon" src='/images/meal_preview_imgs/serves.jpg' />
                              <h2>Serves</h2>
                              <p>{this.props.serves} {this.props.serves>1 ? " people" : " person"}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="print_top2">
                          <img className="print_top_logo_img" alt="print_top_logo_img" src={img_logo} />
                          <h2 style={{ fontSize: mealFont }}>{this.props.mealName}</h2>
                        </div>
                      </div>
                      <div className="print_col_1_detail">
                        <h2>Ingredients</h2>
                        <ul style={{ fontSize: fontSize }}>{displayedIngredients}</ul>
                        <h2>Utensils Needed</h2>
                        <ul style={{ fontSize: fontSize }}>{displayedUtensils}</ul>
                      </div>
                    </div>
                  </div>
                  <div className="print_page_2">
                    <div className="print_body">
                      <div className="meal_instructions">
                        <div style={(this.props.instructionChunk4.instructionSteps.length > 0 || this.props.instructionChunk4.title || this.props.chunk4Content) ? {flexWrap: 'wrap'}: {}} className="meal_instruction"> 
                        {(this.props.instructionChunk1.instructionSteps.length > 0 || this.props.instructionChunk1.title || this.props.chunk1Content) &&
                          <div style={(this.props.instructionChunk4.instructionSteps.length > 0 || this.props.instructionChunk4.title || this.props.chunk4Content) ? {flex: '0 0 32.5%'} : {}}>
                            <div className="instruction_step_top">
                              <h4>1</h4>
                              {this.props.chunk1Content &&
                              <img className="instruction_img" alt="instruction_img" src={this.props.chunk1Content} ></img>}
                              {!this.props.chunk1Content &&
                              <h4 className='title'>{this.props.instructionChunk1.title}</h4>}
                            </div>
                            {this.props.chunk1Content &&
                            <h4 className='title'>{this.props.instructionChunk1.title}</h4>}
                            {/* <div>{this.props.instructionChunk1.dataName}</div> */}
                            <div className='instruction_steps'>
                              <div className="instruction_step" style={{ fontSize: this.state.instructionFontSize }}>
                                {this.props.instructionChunk1.instructionSteps.map((step, index) => (index+1)+". " + step + " ")}
                              </div>
                            </div>
                            {/* <div>{this.props.instructionChunk1.instructionSteps}</div> */}
                            
                          </div>
                          }
                          {(this.props.instructionChunk2.instructionSteps.length > 0 || this.props.instructionChunk2.title || this.props.chunk2Content) &&
                          <div style={(this.props.instructionChunk4.instructionSteps.length > 0 || this.props.instructionChunk4.title || this.props.chunk4Content) ? {flex: '0 0 32.5%'} : {}}>
                            <div className="instruction_step_top">
                              <h4>2</h4>
                              {this.props.chunk2Content &&
                              <img className="instruction_img" alt = "instruction_img" src={this.props.chunk2Content} ></img>}
                              {!this.props.chunk2Content &&
                              <h4 className='title'>{this.props.instructionChunk2.title}</h4>}
                            </div>
                            {this.props.chunk2Content &&
                            <h4 className='title'>{this.props.instructionChunk2.title}</h4>}
                            {/* <div>{this.props.instructionChunk4.dataName}</div> */}
                            <div className='instruction_steps'>
                              <div className="instruction_step" style={{ fontSize: this.state.instructionFontSize }}>
                                {this.props.instructionChunk2.instructionSteps.map((step, index) => (this.props.instructionChunk1.instructionSteps.length+index+1)+". " + step + " ")}
                              </div>
                            </div>
                          </div>
                          }
                          {(this.props.instructionChunk3.instructionSteps.length > 0 || this.props.instructionChunk3.title || this.props.chunk3Content) &&
                          <div style={(this.props.instructionChunk4.instructionSteps.length > 0 || this.props.instructionChunk4.title || this.props.chunk4Content) ? {flex: '0 0 32.5%'} : {}}>
                            <div className="instruction_step_top">
                              <h4>3</h4>
                              {this.props.chunk3Content &&
                              <img className="instruction_img" alt="instruction_img" src={this.props.chunk3Content} ></img>}
                              {!this.props.chunk3Content &&
                            <h4 className='title'>{this.props.instructionChunk3.title}</h4>}
                            </div>
                            {this.props.chunk3Content &&
                            <h4 className='title'>{this.props.instructionChunk3.title}</h4>}
                            {/* <div>{this.props.instructionChunk3.dataName}</div> */}
                            <div className='instruction_steps'>
                              <div className="instruction_step" style={{ fontSize: this.state.instructionFontSize }}>
                                {this.props.instructionChunk3.instructionSteps.map((step, index) => (this.props.instructionChunk1.instructionSteps.length+this.props.instructionChunk2.instructionSteps.length+index+1)+". " + step + " ")}
                              </div>
                            </div>
                            {/* <div>{this.props.instructionChunk3.instructionSteps}</div> */}
                            
                          </div>
                          }
                          {(this.props.instructionChunk4.instructionSteps.length > 0 || this.props.instructionChunk4.title || this.props.chunk4Content) &&
                          <div style={(this.props.instructionChunk4.instructionSteps.length > 0 || this.props.instructionChunk4.title || this.props.chunk4Content) ? {flex: '0 0 32.5%'} : {}}>
                            <div className="instruction_step_top">
                              <h4>4</h4>
                              {this.props.chunk4Content &&
                              <img className="instruction_img" alt="instruction_img" src={this.props.chunk4Content} ></img>}
                              {!this.props.chunk4Content &&
                              <h4 className='title'>{this.props.instructionChunk4.title}</h4>}
                            </div>
                            {this.props.chunk4Content &&
                            <h4 className='title'>{this.props.instructionChunk4.title}</h4>}
                            {/* <div>{this.props.instructionChunk4.dataName}</div> */}
                            <div className='instruction_steps'>
                              <div className="instruction_step" style={{ fontSize: this.state.instructionFontSize }}>
                                {this.props.instructionChunk4.instructionSteps.map((step, index) => (this.props.instructionChunk1.instructionSteps.length+this.props.instructionChunk2.instructionSteps.length+this.props.instructionChunk3.instructionSteps.length+index+1)+". " + step + " ")}
                              </div>
                            </div>
                          </div>
                          }
                          {(this.props.instructionChunk5.instructionSteps.length > 0 || this.props.instructionChunk5.title || this.props.chunk5Content) && 
                          <div style={(this.props.instructionChunk4.instructionSteps.length > 0 || this.props.instructionChunk4.title || this.props.chunk4Content) ? {flex: '0 0 32.5%'} : {}}>
                            <div className="instruction_step_top">
                              <h4>5</h4>
                              {this.props.chunk5Content &&
                              <img className="instruction_img" alt="instruction_img" src={this.props.chunk5Content} ></img>}
                              {!this.props.chunk5Content &&
                              <h4 className='title'>{this.props.instructionChunk5.title}</h4>}
                            </div>
                            {this.props.chunk5Content &&
                            <h4 className='title'>{this.props.instructionChunk5.title}</h4>}
                            {/* <div>{this.props.instructionChunk5.dataName}</div> */}
                            <div className='instruction_steps'>
                              <div className="instruction_step" style={{ fontSize: this.state.instructionFontSize }}>
                                {this.props.instructionChunk5.instructionSteps.map((step, index) => (this.props.instructionChunk1.instructionSteps.length+this.props.instructionChunk2.instructionSteps.length+this.props.instructionChunk3.instructionSteps.length+this.props.instructionChunk4.instructionSteps.length+index+1)+". " + step + " ")}
                              </div>
                            </div>
                            {/* <div>{this.props.instructionChunk5.instructionSteps}</div> */}
                            
                          </div>
                          }
                          
                          {(this.props.instructionChunk6.instructionSteps.length > 0 || this.props.instructionChunk6.title || this.props.chunk6Content) &&
                          <div style={(this.props.instructionChunk4.instructionSteps.length > 0 || this.props.instructionChunk4.title || this.props.chunk4Content) ? {flex: '0 0 32.5%'} : {}}>
                            <div className="instruction_step_top">
                              <h4>6</h4>
                              {this.props.chunk6Content &&
                              <img className="instruction_img"alt ="instruction_img" src={this.props.chunk6Content} ></img>}
                              {!this.props.chunk6Content &&
                              <h4 className='title'>{this.props.instructionChunk6.title}</h4>}
                            </div>
                            {this.props.chunk6Content &&
                            <h4 className='title'>{this.props.instructionChunk6.title}</h4>}
                            {/* <div>{this.props.instructionChunk6.dataName}</div> */}
                            <div className='instruction_steps'>
                              <div className="instruction_step" style={{ fontSize: this.state.instructionFontSize }}>
                                {this.props.instructionChunk6.instructionSteps
                                .map((step, index) => (this.props.instructionChunk1.instructionSteps.length+this.props.instructionChunk2.instructionSteps.length+this.props.instructionChunk3.instructionSteps.length+this.props.instructionChunk4.instructionSteps.length+this.props.instructionChunk5.instructionSteps.length+index+1)+". " + step + " ")}
                              </div>
                            </div>
                            {/* <div>{this.props.instructionChunk6.instructionSteps}</div> */}
                            
                          </div>
                          }
                        </div>
                        
                      </div>
                    </div>
                    {this.props.tips.length > 0 &&
                    <div className='tips'>
                      <h2>Tips:</h2>
                      {/* {this.props.tips} */}
                      <ul>
                        {this.props.tips.map((step, index) => <li>{step}</li>)}
                      </ul>
                    </div>
                    }
                      <div className='footer'>
                        <h2>Connect with us @chop_soul_full</h2>
                      </div>
                  </div>
                  
                </div>

            </div>
        );
    }
}

export default ComponentToPrint