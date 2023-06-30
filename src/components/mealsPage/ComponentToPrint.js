import React from 'react';
import styles from './componentToPrint.module.css'
import img_logo from "../../../public/assets/logos/logo2.png"

class ComponentToPrint extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      instructionFontSize: '14px'
    }
  }

  componentDidMount() {
    var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;

    console.log(allowedImageExtensions.exec(this.props.chunk1Content) && this.props.chunk1Content !== '', 'blocll')
    if ((this.props.instructionChunk1?.instructionSteps?.length +
      this.props.instructionChunk2?.instructionSteps?.length +
      this.props.instructionChunk3?.instructionSteps?.length +
      this.props.instructionChunk4?.instructionSteps?.length +
      this.props.instructionChunk5?.instructionSteps?.length +
      this.props.instructionChunk6?.instructionSteps?.length) > 10) {
      this.setState({
        instructionFontSize: '11px'
      })
      // alert('Instruction steps might be too long for preview. Consider reducing text or spreading text more evenly between the sections available.')
    }

    // if((this.props.instructionChunk4?.instructionSteps?.length+this.props.instructionChunk1?.instructionSteps?.length) > 12){
    //   this.setState({
    //     instructionFontSize: '10px'
    //   })
    // }else if((this.props.instructionChunk2?.instructionSteps?.length+this.props.instructionChunk5?.instructionSteps?.length) > 12){
    //   this.setState({
    //     instructionFontSize: '10px'
    //   })
    // }else if((this.props.instructionChunk3?.instructionSteps?.length+this.props.instructionChunk6?.instructionSteps?.length) > 12){
    //   this.setState({
    //     instructionFontSize: '10px'
    //   })
    // }
  }

  render() {
    const { ingredientsList = [], categories = [], utensilsList = [] } = this.props;
    let displayedCategories = ''
    displayedCategories = categories?.map((cat) => cat + ', ');
    let displayedIngredients = ingredientsList.map((ingredientSyntax) => ingredientSyntax + ', ');
    let displayedUtensils = utensilsList.map((utensil) => utensil + ', ');
    //  displayedCategories+= '</div>'

    let fontSize;
    let lineHeight;

    if (ingredientsList.length > 11 || utensilsList.length > 11 || (ingredientsList.length + utensilsList.length) > 11) {
      fontSize = (14 - (ingredientsList.length / 11)) + "px"
    } else {
      fontSize = '14px'
    }
    let mealFont;
    if (this.props.itemMealName?.length > 16) {
      // if (this.props.mealName.length > 16) {
      mealFont = '20px'
      lineHeight = '20px'
    } else {
      mealFont = '70px'
      lineHeight = '30px'
    }
    console.log("categories are:", this.props.chunk1Content)
    console.log(this.props.mealImageData,);
    console.log(displayedIngredients, "coding")
    console.log("displayed categories are:")
    console.log(displayedCategories);
    console.log("mealImageData");

    console.log(this.props.mealImage, "helloo--");

    var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;
    var allowedVideoExtensions = /(\.mp4|\.m4v|\.)$/i;
    return (
      <div>
        <div className={styles.print}>
          <div className={styles.print_page_1}>
            <div className={styles.print_page_1_row_1}>
              <img className={styles.print_main_logo_img1} alt="print_main_logo_image" src={Array.isArray(this.props.allImagesData) ? this.props.allImagesData[0] : this.props.mealImage} />
            </div>
            <div className={styles.print_page_1_row_2}>
              <div className={styles.print_page_1_col_1}>
                <div className={styles.print_categories} style={{ display: "flex", alignItems: "center" }}>
                  <p>MEAL CATERGORY: </p>
                  <h5 className={styles.print_category}>{this.props?.categories?.join(', ')}</h5>

                </div>
                <div className={styles.border}>

                </div>
                <div className={styles.meal_details}>
                  <div className={styles.col_2}>
                    <div className={styles.meal_detail} style={{ marginLeft: "2rem" }}>
                      <h2> Prep Time:</h2>
                      <p>{this.props.prepTime} mins</p>
                    </div>
                  </div>
                  <div className={styles.col_2}>
                    <div className={styles.meal_detail}>
                      {/* {
                        this.props.mealImageData ? null : <div style={{display: "flex", justifyContent: "space-between", position: "absolute"}}>
                           <img className={styles.meal_detail_icon2} alt="meal_detail_icon2" src='/assets/icons/meal_preview_imgs/cook_time.jpg' />
                           <img className={styles.meal_detail_icon2} alt="meal_detail_icon2" src='/assets/icons/meal_preview_imgs/serves.jpg' />
                        </div>
                      } */}
                      {/* <img className='meal_detail_icon' alt="meal_detail_icon" src='/assets/icons/meal_preview_imgs/cook_time.jpg' /> */}
                      <h2 style={{ marginLeft: "3rem" }}>Cook Time:</h2>
                      <p>{this.props.cookTime} mins</p>
                    </div>
                    <div className={styles.meal_detail}>

                      {
                        this.props.mealImageData ? null : <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", width: "100%", top: "5%", left: "0", right: "0" }}>
                          <img className={styles.meal_detail_icon2} alt="meal_detail_icon2" src='/assets/icons/meal_preview_imgs/cook_time.jpg' />
                          {/* <img className={styles.meal_detail_icon2} alt="meal_detail_icon2" src='/assets/icons/meal_preview_imgs/prep_time.jpg' /> */}
                          <img className={styles.meal_detail_icon2} alt="meal_detail_icon2" src='/assets/icons/meal_preview_imgs/serves.jpg' />
                        </div>
                      }

                      {/* <img className='meal_detail_icon' alt="meal_detail_icon" src='/assets/icons/meal_preview_imgs/serves.jpg' /> */}
                      <h2 style={{ marginLeft: "3rem" }}>Serves</h2>
                      <p>{this.props.serves} {this.props.serves > 1 ? " people" : " person"}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.print_top2}>
                  <h2 style={{ fontSize: mealFont, lineHeight: lineHeight }}>{this.props.ItemMealName}</h2>
                  {/* <h2 style={{ fontSize: mealFont, lineHeight: lineHeight }}>{this.props.mealName}</h2> */}
                  <img className={styles.print_top_logo_img} alt="" src="/assets/logos/CC_Logo_no_bg 2.svg" />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", position: "absolute", right: "3%", top: "5%", height: "90%", }}>
                <div className={styles.print_col_1_detail} style={{ marginBottom: "2rem" }}>
                  <h2>Ingredients</h2>
                  <ul className={styles.ul} style={{ listStyle: "disc", listStyleType: "disc", fontSize: fontSize }}>
                    {displayedIngredients?.map((elem) => (
                      <li key={elem}>{elem.toString().slice(0, elem.indexOf(","))}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.print_col_1_detail}>
                  <h2>Utensils Needed</h2>
                  <ul className={styles.ul} style={{ listStyle: "disc", listStyleType: "disc", fontSize: fontSize, display: "flex", flexDirection: "column" }}>
                    {displayedUtensils?.map((element) => (
                      <li key={element}>{element.toString().slice(0, element.indexOf(","))}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.print_page_2}>
            <div className={styles.print_body}>
              <div className={styles.meal_instructions}>
                <h2>STEPS/INSTRUCTIONS</h2>
                <div style={(this.propsinstructionChunk4Step?.length > 0 || this.props.instructionChunk4 || this.props.chunk4Content) ? { flexWrap: 'wrap' } : {}} className={styles.meal_instruction}>
                  {(this.props.instructionChunk2Step?.length > 0 || this.props.instructionChunk1 || this.props.chunk1Content) &&
                    <div style={(this.props.instructionChunk4Step?.length > 0 || this.props.instructionChunk4 || this.props.chunk4Content) ? { flex: '0 0 32.5%' } : {}}>
                      <div className={styles.instruction_step_top}>
                        {/* <h4>1</h4> */}
                        abc
                        {/* {(allowedImageExtensions.exec(this.props.chunk1Content) && this.props.chunk1Content !== '') && */}
                        {(this.props.chunk1Content !== '') &&
                          <img
                            src={this.props.chunk1Content}
                            alt={this.props.instructionChunk1?.title}
                            className={styles.instruction_img}
                          />
                        }

                        {(allowedVideoExtensions.exec(this.props.instructionChunk1?.dataName) && this.props.chunk1Content !== '') &&
                          <video className={styles.instruction_img} src={this.props.chunk1Content}>
                            Your browser does not support the video tag.
                          </video>
                        }
                        {!this.props.chunk1Content &&
                          <h4 className={styles.title}>{this.props.instructionChunk1}</h4>}
                      </div>
                      {this.props.chunk1Content &&
                        <h4 className={styles.title}>{this.props.instructionChunk1}</h4>}
                      {/* <div>{this.props.instructionChunk1?.dataName}</div> */}
                      <div className={styles.instruction_steps}>
                        <div className={styles.instruction_step} style={{ fontSize: this.state.instructionFontSize }}>
                          {this.props.instructionChunk1Step?.map((step, index) => (index + 1) + ". " + step + " ")}
                        </div>
                      </div>
                      {/* <div>{this.props.instructionChunk1?.instructionSteps?}</div> */}

                    </div>
                  }
                  {(this.props.instructionChunk2Step?.length > 0 || this.props.instructionChunk2 || this.props.chunk2Content) &&
                    <div style={(this.props.instructionChunk4Step?.length > 0 || this.props.instructionChunk4 || this.props.chunk4Content) ? { flex: '0 0 32.5%' } : {}}>
                      <div className={styles.instruction_step_top}>
                        {/* <h4>2</h4> */}
                        {( this.props.chunk2Content !== '') &&
                          <img
                            src={this.props.chunk2Content}
                            alt={this.props.instructionChunk2}
                            className={styles.instruction_img} />
                        }

                        {(allowedVideoExtensions.exec(this.props.instructionChunk2?.dataName) && this.props.chunk2Content !== '') &&
                          <video className={styles.instruction_img} src={this.props.chunk2Content}>
                            Your browser does not support the video tag.
                          </video>
                        }
                        {!this.props.chunk2Content &&
                          <h4 className={styles.title}>{this.props.instructionChunk2}</h4>}
                      </div>
                      {this.props.chunk2Content &&
                        <h4 className={styles.title}>{this.props.instructionChunk2}</h4>}
                      {/* <div>{this.props.instructionChunk4?.dataName}</div> */}
                      <div className={styles.instruction_steps}>
                        <div className={styles.instruction_step} style={{ fontSize: this.state.instructionFontSize }}>
                          {this.props.instructionChunk2Step?.map((step, index) => (this.props.instructionChunk1Step?.length + index + 1) + ". " + step + " ")}
                        </div>
                      </div>
                    </div>
                  }
                  {(this.props.instructionChunk3?.instructionSteps?.length > 0 || this.props.instructionChunk3?.title || this.props.chunk3Content) &&
                    <div style={(this.props.instructionChunk4?.instructionSteps?.length > 0 || this.props.instructionChunk4?.title || this.props.chunk4Content) ? { flex: '0 0 32.5%' } : {}}>
                      <div className={styles.instruction_step_top}>
                        {/* <h4>3</h4> */}
                        {(this.props.chunk3Content !== '') &&
                          <img
                            src={this.props.chunk3Content}
                            alt={this.props.instructionChunk3?.title}
                            className={styles.instruction_img} />
                        }

                        {(allowedVideoExtensions.exec(this.props.instructionChunk3?.dataName) && this.props.chunk3Content !== '') &&
                          <video className={styles.instruction_img} src={this.props.chunk3Content}>
                            Your browser does not support the video tag.
                          </video>
                        }
                        {!this.props.chunk3Content &&
                          <h4 className='title'>{this.props.instructionChunk3?.title}</h4>}
                      </div>
                      {this.props.chunk3Content &&
                        <h4 className={styles.title}>{this.props.instructionChunk3?.title}</h4>}
                      {/* <div>{this.props.instructionChunk3?.dataName}</div> */}
                      <div className={styles.instruction_steps}>
                        <div className={styles.instruction_step} style={{ fontSize: this.state.instructionFontSize }}>
                          {this.props.instructionChunk3?.instructionSteps?.map((step, index) => (this.props.instructionChunk1?.instructionSteps?.length + this.props.instructionChunk2?.instructionSteps?.length + index + 1) + ". " + step + " ")}
                        </div>
                      </div>
                      {/* <div>{this.props.instructionChunk3?.instructionSteps?}</div> */}

                    </div>
                  }
                  {(this.props.instructionChunk4?.instructionSteps?.length > 0 || this.props.instructionChunk4?.title || this.props.chunk4Content) &&
                    <div style={(this.props.instructionChunk4?.instructionSteps?.length > 0 || this.props.instructionChunk4?.title || this.props.chunk4Content) ? { flex: '0 0 32.5%' } : {}}>
                      <div className={styles.instruction_step_top}>
                        {/* <h4>4</h4> */}
                        {(allowedImageExtensions.exec(this.props.instructionChunk4?.dataName) && this.props.chunk4Content !== '') &&
                          <img
                            src={this.props.chunk4Content}
                            alt={this.props.instructionChunk4?.title}
                            className={styles.instruction_img} />
                        }

                        {(allowedVideoExtensions.exec(this.props.instructionChunk4?.dataName) && this.props.chunk4Content !== '') &&
                          <video className={styles.instruction_img} src={this.props.chunk4Content}>
                            Your browser does not support the video tag.
                          </video>
                        }
                        {!this.props.chunk4Content &&
                          <h4 className={styles.title}>{this.props.instructionChunk4?.title}</h4>}
                      </div>
                      {this.props.chunk4Content &&
                        <h4 className={styles.title}>{this.props.instructionChunk4?.title}</h4>}
                      {/* <div>{this.props.instructionChunk4?.dataName}</div> */}
                      <div className={styles.instruction_steps}>
                        <div className={styles.instruction_step} style={{ fontSize: this.state.instructionFontSize }}>
                          {this.props.instructionChunk4?.instructionSteps?.map((step, index) => (this.props.instructionChunk1?.instructionSteps?.length + this.props.instructionChunk2?.instructionSteps?.length + this.props.instructionChunk3?.instructionSteps?.length + index + 1) + ". " + step + " ")}
                        </div>
                      </div>
                    </div>
                  }
                  {(this.props.instructionChunk5?.instructionSteps?.length > 0 || this.props.instructionChunk5?.title || this.props.chunk5Content) &&
                    <div style={(this.props.instructionChunk4?.instructionSteps?.length > 0 || this.props.instructionChunk4?.title || this.props.chunk4Content) ? { flex: '0 0 32.5%' } : {}}>
                      <div className={styles.instruction_step_top}>
                        {/* <h4>5</h4> */}
                        {( this.props.chunk5Content !== '') &&
                          <img
                            src={this.props.chunk5Content}
                            alt={this.props.instructionChunk5?.title}
                            className={styles.instruction_img} />
                        }

                        {(allowedVideoExtensions.exec(this.props.instructionChunk5?.dataName) && this.props.chunk5Content !== '') &&
                          <video className={styles.instruction_img} src={this.props.chunk5Content}>
                            Your browser does not support the video tag.
                          </video>
                        }
                        {!this.props.chunk5Content &&
                          <h4 className={styles.title}>{this.props.instructionChunk5?.title}</h4>}
                      </div>
                      {this.props.chunk5Content &&
                        <h4 className={styles.title}>{this.props.instructionChunk5?.title}</h4>}
                      {/* <div>{this.props.instructionChunk5?.dataName}</div> */}
                      <div className={styles.instruction_steps}>
                        <div className={styles.instruction_step} style={{ fontSize: this.state.instructionFontSize }}>
                          {this.props.instructionChunk5?.instructionSteps?.map((step, index) => (this.props.instructionChunk1?.instructionSteps?.length + this.props.instructionChunk2?.instructionSteps?.length + this.props.instructionChunk3?.instructionSteps?.length + this.props.instructionChunk4?.instructionSteps?.length + index + 1) + ". " + step + " ")}
                        </div>
                      </div>
                      {/* <div>{this.props.instructionChunk5?.instructionSteps?}</div> */}

                    </div>
                  }

                  {(this.props.instructionChunk6?.instructionSteps?.length > 0 || this.props.instructionChunk6?.title || this.props.chunk6Content) &&
                    <div style={(this.props.instructionChunk4?.instructionSteps?.length > 0 || this.props.instructionChunk4?.title || this.props.chunk4Content) ? { flex: '0 0 32.5%' } : {}}>
                      <div className={styles.instruction_step_top}>
                        {/* <h4>6</h4> */}
                        {( this.props.chunk6Content !== '') &&
                          <img
                            src={this.props.chunk6Content}
                            alt={this.props.instructionChunk6?.title}
                            className={styles.instruction_img} />
                        }

                        {(allowedVideoExtensions.exec(this.props.instructionChunk6?.dataName) && this.props.chunk6Content !== '') &&
                          <video className={styles.instruction_img} src={this.props.chunk6Content}>
                            Your browser does not support the video tag.
                          </video>
                        }
                        {!this.props.chunk6Content &&
                          <h4 className={styles.title}>{this.props.instructionChunk6?.title}</h4>}
                      </div>
                      {this.props.chunk6Content &&
                        <h4 className={styles.title}>{this.props.instructionChunk6?.title}</h4>}
                      {/* <div>{this.props.instructionChunk6?.dataName}</div> */}
                      <div className={styles.instruction_steps}>
                        <div className={styles.instruction_step} style={{ fontSize: this.state.instructionFontSize }}>
                          {this.props.instructionChunk6?.instructionSteps?.map((step, index) => (this.props.instructionChunk1?.instructionSteps?.length + this.props.instructionChunk2?.instructionSteps?.length + this.props.instructionChunk3?.instructionSteps?.length + this.props.instructionChunk4?.instructionSteps?.length + this.props.instructionChunk5?.instructionSteps?.length + index + 1) + ". " + step + " ")}
                        </div>
                      </div>
                      {/* <div>{this.props.instructionChunk6?.instructionSteps?}</div> */}

                    </div>
                  }
                </div>

              </div>
            </div>
            {this.props?.tips?.length > 0 &&
              <div className={styles.tips}>
                <h2>TIPS</h2>
                {/* {this.props.tips} */}
                <ul>
                  {this.props.tips.map((step, index) => <li>{step}</li>)}
                </ul>
              </div>
            }
            <div className={styles.footer}>
              <h2>Connect with us @chop_soul_full</h2>
            </div>
          </div>

        </div>

      </div >
    );
  }
}

export default ComponentToPrint