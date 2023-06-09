
import Header from '../../src/components/Header/Header';
import SideNav from '../../src/components/Header/sidenav';
import { container, col2, left, empty, center, status, approve, pending, rejected, actionIcon } from '../../src/components/dashboard/dashboard.module.css'
import styles from '../../src/components/dashboard/suggestedmeals.module.css'
import { CloseFillIcon, FillterIcon } from '../../src/components/icons';
import Link from 'next/link';
import Sidenav2 from '../../src/components/Header/sidenav2';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../src/util/Api';
import Meal from '../../src/components/individualPage/Meal';
import WestIcon from '@mui/icons-material/West';
import TransferToInventory from '../../src/components/dashboard/transferToInventory';
import SuggestedMealRow from '../../src/components/dashboard/suggestedmealRow';
import Sent from '../../src/components/dashboard/sent';
import Popup2 from '../../src/components/popups/popup2';
import Popup1 from '../../src/components/popups/popup1';
import Product from '../../src/components/individualPage/Product';
import AddIcon from '@mui/icons-material/Add';
import { suggestion_form_image, suggestion_form_image_col_1, suggestion_form_image_icon, suggestion_form_image_icon_con } from "../../src/components/suggestionPages/suggestion.module.css";
import Image from 'next/image';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SuggestedMeals = (props) => {
    const router = useRouter()
    const [addPublicMeal, setAddPublicMeal] = useState()
    const [searchType, setSearchType] = useState('Meal')
    const [searchOption, setSearchOption] = useState()
    const [search, setSearchState] = useState(false)
    const [showReason, setShowReasonState] = useState(false)
    const [suggestions, setSuggestionsState] = useState([])
    const [publicSuggestions, setPublicSuggestionsState] = useState([])
    const [suggestion, setSuggestionState] = useState({})
    const [filteredSuggestions, setFilteredSuggestionsState] = useState([])
    const [searchSuggestedSuggestion, setSearchSuggestedSuggestionState] = useState('')
    const [openSuggestion, setOpenSuggestionState] = useState(false)
    const [changeStatus, setChangeStatusState] = useState(false)
    const [transferToInventory, setTransferToInventoryState] = useState(false)
    const [sent, setSentState] = useState(false)
    const [openModal, setOpenModalState] = useState(false)
    const [openModal2, setOpenModal2State] = useState(false)
    const [statusType, setStatusTypeState] = useState('')
    const [page, setPageState] = useState(1);
    const [pages, setPagesState] = useState(1);
    const [ingredientsStringSyntax, setIngredientsString] = useState([]);
    const [suggestionCount, setSuggestedCountState] = useState(0);
    const [status2, setStatus2State] = useState('');
    const [message, setMessageState] = useState('');
    const [relateds, setRelatedsState] = useState([])


    useEffect(() => {
        if (props.auth.authUser) {
            setSearchType("Meal")
            let url
            if (props.auth.authUser.user_type === 'admin') {
                url = '/meals/get-meals/' + page
            } else {
                url = '/meals/get-meals/' + page + '?user=' + props.auth.authUser._id
            }

            axios.get(url).then(data => {
                console.log(searchType)
                if (data.data.data) {

                    setSuggestedCountState(data.data.data.count)
                    if (data.data.data.count > 10) {
                        setPagesState(Math.ceil(data.data.data.count / 10))
                    }
                    console.log('data.data.data.meals', data.data.data.meals)
                    setFilteredSuggestionsState(data.data.data.meals)
                    setSuggestionsState(data.data.data.meals)
                }
            })
        }
    }, [props.auth]);

    function togglePublicMeal() {
        setAddPublicMeal(!addPublicMeal)
    }

    function handleSearchType(type) {
        setSearchType(type)
        toggleSearchOption()
    }

    function handleSearchType2(type) {
        setSearchType(type)
        setPageState(1)
        let url
        if (type === 'Meal') {
            if (props.auth.authUser.user_type === 'admin') {
                url = '/meals/get-meals/1'
            } else {
                url = '/meals/get-meals/1?user=' + props.auth.authUser._id
            }
        } else if (type === 'Product') {
            if (props.auth.authUser.user_type === 'admin') {
                url = '/products/get-all-products/1'
            } else {
                url = '/products/get-all-products/1?user=' + props.auth.authUser._id
            }
        } else {
            if (props.auth.authUser.user_type === 'admin') {
                url = '/categories/get-all-categories/1'
            } else {
                url = '/categories/get-all-categories/1?user=' + props.auth.authUser._id
            }
        }
        getSuggestion(url, type)
    }

    function toggleSearchOption() {
        setSearchOption(!searchOption)
    }

    function handleSearch(e) {
        setSearchSuggestedSuggestionState(e.target.value);

    };

    function searchSuggested(e) {
        let url
        if (searchType === 'Meal') {
            if (props.auth.authUser.user_type === 'admin') {
                url = '/meals/get-meals/1?meal_name=' + searchSuggestedSuggestion
            } else {
                url = '/meals/get-meals/1?user=' + props.auth.authUser._id + '&meal_name=' + searchSuggestedSuggestion
            }
        } else if (searchType === 'Product') {
            if (props.auth.authUser.user_type === 'admin') {
                url = '/products/get-all-products/1?product_name=' + searchSuggestedSuggestion
            } else {
                url = '/products/get-all-products/1?user=' + props.auth.authUser._id + '&product_name=' + searchSuggestedSuggestion
            }
        }
        else {
            if (props.auth.authUser.user_type === 'admin') {
                url = '/categories/get-all-categories/1?product_name=' + searchSuggestedSuggestion
            } else {
                url = '/categories/get-all-categories/1?user=' + props.auth.authUser._id + '&product_name=' + searchSuggestedSuggestion
            }
        }
        let url2
        if (searchType === 'Meal') {
            if (props.auth.authUser.user_type === 'admin') {
                url2 = '/meals/get-meals/1'
            } else {
                url2 = '/meals/get-meals/1?user=' + props.auth.authUser._id
            }
        } else if (searchType === 'Product') {
            if (props.auth.authUser.user_type === 'admin') {
                url2 = '/products/get-all-products/1'
            } else {
                url2 = '/products/get-all-products/1?user=' + props.auth.authUser._id
            }
        } else {
            if (props.auth.authUser.user_type === 'admin') {
                url2 = '/categories/get-all-categories/1'
            } else {
                url2 = '/categories/get-all-categories/1?user=' + props.auth.authUser._id
            }
        }
        if (e.keyCode) {
            if (e.keyCode === 13) {
                if (searchSuggestedSuggestion.length >= 1) {
                    axios.get(url).then(data => {
                        console.log(data.data)
                        if (data.data.data) {

                            setSuggestedCountState(data.data.data.count)
                            if (data.data.data.count > 10) {
                                setPagesState(Math.ceil(data.data.data.count / 10))
                            }
                            if (searchType === 'Meal') {
                                setFilteredSuggestionsState(data.data.data.meals)
                                setSuggestionsState(data.data.data.meals)
                            } else {
                                setFilteredSuggestionsState(data.data.data.products)
                                setSuggestionsState(data.data.data.products)
                            }
                        }
                    })
                } else {
                    getSuggestion(url2)
                }
            }
        } else {
            if (searchSuggestedSuggestion.length >= 1) {
                axios.get(url).then(data => {
                    console.log(data.data)
                    if (data.data.data) {

                        setSuggestedCountState(data.data.data.count)
                        if (data.data.data.count > 10) {
                            setPagesState(Math.ceil(data.data.data.count / 10))
                        }
                        if (searchType === 'Meal') {
                            setFilteredSuggestionsState(data.data.data.meals)
                            setSuggestionsState(data.data.data.meals)
                        } else {
                            setFilteredSuggestionsState(data.data.data.products)
                            setSuggestionsState(data.data.data.products)
                        }
                    }
                })
            } else {
                getSuggestion(url2)
            }
        }
    };

    function searchRelated(e) {
        let searchVal = e.target.value
        console.log(searchVal)
        let url
        if (searchType === 'Meal') {
            if (props.auth.authUser.user_type === 'admin') {
                url = '/meals/get-meals/1?publicly_available=Public&meal_name=' + searchVal
            } else {
                url = '/meals/get-meals/1?publicly_available=Public&user=' + props.auth.authUser._id + '&meal_name=' + searchVal
            }
        } else if (searchType === 'Product') {
            if (props.auth.authUser.user_type === 'admin') {
                url = '/products/get-all-products/1?publicly_available=Public&product_name=' + searchVal
            } else {
                url = '/products/get-all-products/1?publicly_available=Public&user=' + props.auth.authUser._id + '&product_name=' + searchVal
            }
        }

        if (searchVal.length >= 1) {
            axios.get(url).then(data => {
                console.log(data.data)
                if (data.data.data) {
                    if (searchType === 'Meal') {
                        setRelatedsState(data.data.data.meals)
                    } else {
                        setRelatedsState(data.data.data.products)
                    }
                }
            })
        }
    };


    function addRelated(val) {
        console.log(val)
        let url
        let similar_meals
        if (searchType === 'Meal') {
            url = '/meals/update/'
            similar_meals = suggestion.similar_meals
        } else if (searchType === 'Product') {
            url = '/products/update/'
            similar_meals = suggestion.product_alternatives
        } else {
            url = '/categories/update/'
        }

        if (val && val.length >= 1) {
            similar_meals.push(val.split('/')[1])
            if (suggestion._id !== val.split('/')[1]) {
                let body
                if (searchType === 'Meal') {
                    body = { similar_meals: similar_meals }
                } else if (searchType === 'Product') {
                    body = { product_alternatives: similar_meals }
                } else {
                    url = '/categories/update/'
                }
                axios.post(url + suggestion._id, body).then(data => {
                    let meal = relateds.filter((rel) => rel._id === val.split('/')[1])
                    console.log(meal)
                    similar_meals[similar_meals.length - 1] = meal[0]
                    let url2
                    if (searchType === 'Meal') {
                        if (props.auth.authUser.user_type === 'admin') {
                            url2 = '/meals/get-meals/1'
                        } else {
                            url2 = '/meals/get-meals/1?user=' + props.auth.authUser._id
                        }
                    } else if (searchType === 'Product') {
                        if (props.auth.authUser.user_type === 'admin') {
                            url2 = '/products/get-all-products/1'
                        } else {
                            url2 = '/products/get-all-products/1?user=' + props.auth.authUser._id
                        }
                    } else {
                        if (props.auth.authUser.user_type === 'admin') {
                            url2 = '/categories/get-all-categories/1'
                        } else {
                            url2 = '/categories/get-all-categories/1?user=' + props.auth.authUser._id
                        }
                    }
                    getSuggestion(url2, searchType)
                })
            } else {
                console.log('the same id')
            }
        }
    };

    function toggleSearch() {
        setSearchState(!search);
    };

    function toggleShowReason() {
        setShowReasonState(!showReason)
    }

    function toggleOpenMeal(meal) {
        console.log("meal", meal)
        setSuggestionState(meal)
        setOpenSuggestionState(true)
    }

    function closeSuggestion() {
        setOpenSuggestionState(false)
    }

    function toggleChangeStatus() {
        setChangeStatusState(!changeStatus)
    }

    function handleStatusType(type) {
        setStatusTypeState(type)
        let url1
        if (searchType === 'Meal') {
            url1 = '/meals/update/'
        } else if (searchType === 'Product') {
            url1 = '/products/update/'
        } else {
            url1 = '/categories/update/'
        }
        axios.post(url1 + suggestion._id, { status: type }).then(res => {
            if (res.data.data) {
                suggestion.publicly_available = type
                let url2
                if (searchType === 'Meal') {
                    if (props.auth.authUser.user_type === 'admin') {
                        url2 = '/meals/get-meals/1'
                    } else {
                        url2 = '/meals/get-meals/1?user=' + props.auth.authUser._id
                    }
                } else if (searchType === 'Product') {
                    if (props.auth.authUser.user_type === 'admin') {
                        url2 = '/products/get-all-products/1'
                    } else {
                        url2 = '/products/get-all-products/1?user=' + props.auth.authUser._id
                    }
                } else {
                    if (props.auth.authUser.user_type === 'admin') {
                        url2 = '/categories/get-all-categories/1'
                    } else {
                        url2 = '/categories/get-all-categories/1?user=' + props.auth.authUser._id
                    }
                }
                getSuggestion(url2, searchType)
            }
        })
        toggleChangeStatus()
    }

    function getSuggestion(url, searchTypeP = searchType) {
        axios.get(url).then(data => {
            if (data.data.data) {
                console.log(data.data.data)
                setSuggestedCountState(data.data.data.count)
                if (data.data.data.count > 10) {
                    setPagesState(Math.ceil(data.data.data.count / 10))
                } else {
                    setPagesState(1)
                }
                console.log(searchTypeP)
                if (searchTypeP === 'Meal') {
                    console.log(data.data.meals)
                    setFilteredSuggestionsState(data.data.data.meals)
                    setSuggestionsState(data.data.data.meals)
                } else if (searchTypeP === 'Product') {
                    setFilteredSuggestionsState(data.data.data.products)
                    setSuggestionsState(data.data.data.products)
                } else {
                    setFilteredSuggestionsState(data.data.data.categories)
                    setSuggestionsState(data.data.data.categories)
                }
            }
        })
    }

    function deleteSuggestion(id) {
        let url1
        if (searchType === 'Meal') {
            url1 = '/meals/delete/'
        } else if (searchType === 'Product') {
            url1 = '/products/deleteproduct/'
        } else {
            url1 = '/categories/delete-category/'
        }
        axios.delete(url1 + id).then(res => {
            console.log(res.data)
            let url2
            if (searchType === 'Meal') {
                if (props.auth.authUser.user_type === 'admin') {
                    url2 = '/meals/get-meals/1'
                } else {
                    url2 = '/meals/get-meals/1?user=' + props.auth.authUser._id
                }
            } else if (searchType === 'Product') {
                if (props.auth.authUser.user_type === 'admin') {
                    url2 = '/products/get-all-products/1'
                } else {
                    url2 = '/products/get-all-products/1?user=' + props.auth.authUser._id
                }
            } else {
                if (props.auth.authUser.user_type === 'admin') {
                    url2 = '/categories/get-all-categories/1'
                } else {
                    url2 = '/categories/get-all-categories/1?user=' + props.auth.authUser._id
                }
            }
            getSuggestion(url2)
        }).catch(error => {
            setStatus2State('error')
            setMessageState('Suggestion not deleted')
            setTimeout(() => {
                setStatus2State('')
                setMessageState('')
            }, 5000)
        });
    }

    function toggleTransferToInventory(meal) {
        setSuggestionState(meal)
        setTransferToInventoryState(!transferToInventory)
    }

    function toggleSent(id, searchType) {
        if (typeof id === 'string') {
            let url1
            if (searchType === 'Meal') {
                url1 = '/meals/update/'
            } else if (searchType === 'Product') {
                url1 = '/products/update/'
            } else {
                url1 = '/categories/update/'
            }
            axios.post(url1 + id, { publicly_available: "Pending" }).then(res => {
                if (res.data.data) {
                    let url2
                    if (searchType === 'Meal') {
                        if (props.auth.authUser.user_type === 'admin') {
                            url2 = '/meals/get-meals/1'
                        } else {
                            url2 = '/meals/get-meals/1?user=' + props.auth.authUser._id
                        }
                    } else if (searchType === 'Product') {
                        if (props.auth.authUser.user_type === 'admin') {
                            url2 = '/products/get-all-products/1'
                        } else {
                            url2 = '/products/get-all-products/1?user=' + props.auth.authUser._id
                        }
                    } else {
                        if (props.auth.authUser.user_type === 'admin') {
                            url2 = '/categories/get-all-categories/1'
                        } else {
                            url2 = '/categories/get-all-categories/1?user=' + props.auth.authUser._id
                        }
                    }
                    getSuggestion(url2, searchType)
                }
            })
        }
        setSentState(!sent)
    }

    function handleSearchPublicSuggestion(e) {
        setSearchSuggestedSuggestionState(e.target.value);
        setSearchState(true)
        if (e.target.value.length >= 1) {
            let url
            if (searchType === 'Meal') {
                url = '/meals/get-meals/'
            } else {
                url = '/products/get-all-products/'
            }

            axios.get(url + '1?publicly_available=Public&' + (searchType === 'Meal' ? 'meal_name' : 'product_name') + '=' + e.target.value).then(data => {
                console.log(data.data)
                if (data.data.data) {
                    if (searchType === 'Meal') {
                        setPublicSuggestionsState(data.data.data.meals)
                    } else {
                        setPublicSuggestionsState(data.data.data.products)
                    }
                }
            })
        }

    };

    function addSuggestion(suggestion) {
        suggestion.user = props.auth.authUser._id
        suggestion.chef = props.auth.authUser.username
        suggestion.publicly_available = 'Draft'
        let newSuggestions = suggestions
        delete suggestion._id
        delete suggestion.createdAt
        let url
        if (searchType === 'Meal') {
            url = '/meals/create'
        } else {
            url = '/products/create'
        }
        axios.post(url, suggestion).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response.data)
                newSuggestions.push(response.data.data)
                setSuggestionsState(newSuggestions)
                setStatus2State('success')
                setMessageState('Suggestion added')
                setTimeout(() => {
                    setStatus2State('')
                    setMessageState('')
                }, 5000)
                setFilteredSuggestionsState(newSuggestions)

            } else {
                setStatus2State('error')
                setMessageState('Suggestion not added')
                setTimeout(() => {
                    setStatus2State('')
                    setMessageState('')
                }, 5000)
            }
        }).catch(error => {
            setStatus2State('error')
            setMessageState('Suggestion not added')
            setTimeout(() => {
                setStatus2State('')
                setMessageState('')
            }, 5000)
        });
    }

    function openMealDetailsModal(meal) {
        setSuggestionState(meal)
        if (meal.formatted_ingredients?.length > 0) {
            let ingredients = JSON.parse(meal.formatted_ingredients[0]);
            var ingredientsString = []
            for (let i = 0; i < ingredients.length; i++) {
                let properIngredientStringSyntax = ''
                if (ingredients[i].quantity === "") {
                    properIngredientStringSyntax = ingredients[i].productName;
                } else if (ingredients[i].measurement === "" && ingredients[i].quantity !== "") {
                    // MAKE sure we are using the right and tested variables to display the right type of string at all times.
                    properIngredientStringSyntax = "" + ingredients[i].quantity + " " + ingredients[i].productName;
                } else {
                    properIngredientStringSyntax =
                        "" + ingredients[i].quantity + " " + ingredients[i].measurement +
                        " of " + ingredients[i].productName;
                }
                ingredientsString.push(properIngredientStringSyntax)
            }
            console.log(ingredientsString)
            setIngredientsString(ingredientsString)
        }
        setOpenModalState(true)
        // console.log(typeof suggestion.formatted_instructions[0], "find instructionss")
        // console.log(eval('(' + suggestion.instructions + ')'), "help")
        console.log(suggestion, "suggests")
        console.log(suggestion.instructions, "wordlength")
        console.log(suggestion.id, "show the id")
    }

    function openDetailsModal(product) {
        // if(searchType == 'Product'){
        setSuggestionState(product)
        let ingredients = product.ingredients_in_product;
        var ingredientsString = []
        for (let i = 0; i < ingredients.length; i++) {
            let properIngredientStringSyntax = ''
            if (ingredients[i].quantity === "") {
                properIngredientStringSyntax = ingredients[i].productName;
            } else if (ingredients[i].measurement === "" && ingredients[i].quantity !== "") {
                // MAKE sure we are using the right and tested variables to display the right type of string at all times.
                properIngredientStringSyntax = "" + ingredients[i].quantity + " " + ingredients[i].productName;
            } else {
                properIngredientStringSyntax =
                    "" + ingredients[i].quantity + " " + ingredients[i].measurement +
                    " of " + ingredients[i].productName;
            }
            ingredientsString.push(properIngredientStringSyntax)
        }
        setIngredientsString(ingredientsString)
        setOpenModal2State(true)
        // }
    }

    function closeModal() {
        setOpenModalState(false);
        setOpenModal2State(false)
    }

    async function nextPage(newPage = page + 1) {
        if (page < pages) {
            setPageState(newPage)
            let url
            if (searchType === 'Meal') {
                if (props.auth.authUser.user_type === 'admin') {
                    url = '/meals/get-meals/' + newPage
                } else {
                    url = '/meals/get-meals/' + newPage + '?user=' + props.auth.authUser._id
                }
            } else if (searchType === 'Product') {
                if (props.auth.authUser.user_type === 'admin') {
                    url = '/products/get-all-products/' + newPage
                } else {
                    url = '/products/get-all-products/' + newPage + '?user=' + props.auth.authUser._id
                }
            } else {
                if (props.auth.authUser.user_type === 'admin') {
                    url = '/categories/get-all-categories/' + newPage
                } else {
                    url = '/categories/get-all-categories/' + newPage + '?user=' + props.auth.authUser._id
                }
            }
            axios.get(url).then(data => {
                console.log(data.data)
                if (data.data.data) {

                    setSuggestedCountState(data.data.data.count)
                    if (data.data.data.count > 10) {
                        setPagesState(Math.ceil(data.data.data.count / 10))
                    }
                    if (searchType === 'Meal') {
                        setFilteredSuggestionsState(data.data.data.meals)
                        setSuggestionsState(data.data.data.meals)
                    } else if (searchType === 'Product') {
                        setFilteredSuggestionsState(data.data.data.products)
                        setSuggestionsState(data.data.data.products)
                    } else {
                        setFilteredSuggestionsState(data.data.data.categories)
                        setSuggestionsState(data.data.data.categories)
                    }
                }
            })
        }
    };

    async function prevPage(newPage = page - 1) {
        if (page > 1) {
            setPageState(newPage)
            let url
            if (searchType === 'Meal') {
                if (props.auth.authUser.user_type === 'admin') {
                    url = '/meals/get-meals/' + newPage
                } else {
                    url = '/meals/get-meals/' + newPage + '?user=' + props.auth.authUser._id
                }
            } else if (searchType === 'Product') {
                if (props.auth.authUser.user_type === 'admin') {
                    url = '/products/get-all-products/' + newPage
                } else {
                    url = '/products/get-all-products/' + newPage + '?user=' + props.auth.authUser._id
                }
            } else {
                if (props.auth.authUser.user_type === 'admin') {
                    url = '/categories/get-all-categories/' + newPage
                } else {
                    url = '/categories/get-all-categories/' + newPage + '?user=' + props.auth.authUser._id
                }
            }
            axios.get(url).then(data => {
                console.log(data.data)
                if (data.data.data) {

                    setSuggestedCountState(data.data.data.count)
                    if (data.data.data.count > 10) {
                        setPagesState(Math.ceil(data.data.data.count / 10))
                    }
                    if (searchType === 'Meal') {
                        setFilteredSuggestionsState(data.data.data.meals)
                        setSuggestionsState(data.data.data.meals)
                    } else if (searchType === 'Product') {
                        setFilteredSuggestionsState(data.data.data.products)
                        setSuggestionsState(data.data.data.products)
                    } else {
                        setFilteredSuggestionsState(data.data.data.categories)
                        setSuggestionsState(data.data.data.categories)
                    }
                }
            })
        }
    };

    return (
        <div className={container + " " + col2}>
            <div className="alert">
                {status2 === "error" && <div className="alert-danger">{message}</div>}
                {status2 === "success" && <div className="alert-success">{message}</div>}
            </div>
            <Header />
            <SideNav />
            <div className={left}>
                <Sidenav2 showBottom={false} />
            </div>
            <div className={empty}></div>
            <div className={center}>
                {!openSuggestion &&
                    <>
                        <h3>Suggested Meal/Products</h3>
                        {props.auth.authUser &&
                            <div className={styles.suggestedmeal_container}>
                                <div className={styles.suggestedmeal_search_con}>
                                    <div className={styles.search_con}>
                                        <div className={styles.search_box}>
                                            <p onClick={searchSuggested} className={styles.search_icon}>
                                                <SearchIcon className={styles.search_icon} />
                                            </p>
                                            <input
                                                type="text"
                                                name="search"
                                                onChange={handleSearch}
                                                onKeyUp={searchSuggested}
                                                className={styles.search_input}
                                                placeholder="Search for products"
                                            />
                                        </div>
                                        <div className={styles.search_button} onClick={searchSuggested}>Search</div>
                                    </div>
                                    {props.auth.authUser.user_type === 'customer' &&
                                        <Link href='/dashboard/createstore'><a>Create Store</a></Link>}
                                </div>
                                <div className={styles.suggestedmeal_row2}>
                                    <div className={styles.mode_con}>
                                        <div onClick={() => handleSearchType2('Meal')} className={styles.mode + ' ' + styles.left_mode + ' ' + (searchType === 'Meal' ? styles.active_mode : '')}>Meal</div>
                                        <div onClick={() => handleSearchType2('Product')} className={styles.mode + ' ' + ' ' + (searchType === 'Product' ? styles.active_mode : '')}>Product</div>
                                        <div onClick={() => handleSearchType2('Category')} className={styles.mode + ' ' + styles.right_mode + ' ' + (searchType === 'Category' ? styles.active_mode : '')}>Category</div>
                                    </div>
                                    {props.auth.authUser.user_type !== 'admin' &&
                                        <div className={styles.suggestedmeal_row2_col2}>
                                            {/* <h5>Remove Sections(s)</h5> */}
                                            <div>
                                                {/* <div onClick={togglePublicMeal} className={styles.tableactionbutton}>+ Add public meal</div> */}
                                                <div className={styles.tableactionbutton}>
                                                    <Link href='/suggestmeal' >
                                                        <a>
                                                            + New Suggestion
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className={styles.suggestedmeal}>
                                    <div className={styles.request_table}>
                                        <div>
                                            <div className={styles.request_tr + ' ' + (props.auth.authUser.user_type === 'admin' ? styles.admin_request_tr :
                                                props.auth.authUser.user_type === 'customer' ? styles.customer_request_tr :
                                                    props.auth.authUser.user_type === 'supplier' ? styles.supplier_request_tr : '')}>
                                                <input name='id' type="checkbox" />
                                                {/* <p className={styles.request_th}>ID number</p> */}
                                                <p className={styles.request_th}>Name</p>
                                                <p className={styles.request_th} style={{ justifySelf: 'center' }}>Status <FillterIcon /></p>
                                                <p className={styles.request_th + " " + styles.hideData}>Categories <FillterIcon /></p>
                                                <p className={styles.request_th + " " + styles.hideData}>Date Created <FillterIcon /></p>
                                                <p className={styles.request_th} style={{ textAlign: 'center' }}>Action</p>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                filteredSuggestions && filteredSuggestions.map((suggestion) => {
                                                    return (
                                                        <SuggestedMealRow
                                                            searchType={searchType}
                                                            deleteSuggestion={deleteSuggestion}
                                                            toggleSent={toggleSent}
                                                            toggleTransferToInventory={toggleTransferToInventory}
                                                            openMealDetailsModal={openMealDetailsModal}
                                                            openDetailsModal={openDetailsModal}
                                                            auth={props.auth} key={suggestion._id}
                                                            suggestion={suggestion}
                                                            toggleOpenMeal={toggleOpenMeal}
                                                        />
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                    {suggestionCount > 0 &&
                                        <div className={styles.user_pagination}>
                                            <div>
                                                {
                                                    page > 1 &&
                                                    <>
                                                        <p onClick={() => prevPage(1)} className={styles.paginate_btn}>&lt;&lt;</p>
                                                        <p onClick={() => prevPage()} className={styles.paginate_btn}>&lt;</p>
                                                    </>
                                                }

                                                {
                                                    page < pages &&
                                                    <>
                                                        <p onClick={() => nextPage()} className={styles.paginate_btn}>&gt;</p>
                                                        <p onClick={() => nextPage(pages)} className={styles.paginate_btn}>&gt;&gt;</p>
                                                    </>
                                                }

                                            </div>
                                            <p>{'' + page + ' of ' + pages}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </>
                }
                {openSuggestion &&
                    <div>
                        <div className={styles.meal_section_1}>
                            <div className={styles.meal_section_1_col_1}>
                                <ul className={styles.goback_header_pages}>
                                    <div onClick={closeSuggestion}><WestIcon className={styles.goback_header_page_arrow} /></div>
                                    <li onClick={closeSuggestion}>
                                        back
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.meal_section_1}>
                            <div className={styles.meal_section_1_col_1}>
                                <h3>{searchType + " "} Description</h3>
                            </div>
                            <div className={styles.meal_section_1_col_2}>
                                {/* <p className={styles.meal_section_1_col_2_p}> Choose type</p> */}
                                <div className={styles.select_container}>
                                    <div onClick={toggleChangeStatus} className={styles.select_box}>
                                        <p>{statusType.length > 0 ? statusType : suggestion.publicly_available}</p>
                                        <ArrowDropDownIcon className={styles.select_box_icon} />
                                    </div>
                                    {changeStatus &&
                                        <div className={styles.select_options2}>
                                            <p onClick={() => handleStatusType('Public')}>Public</p>
                                            <p onClick={() => handleStatusType('Pending')}>Pending</p>
                                            <p onClick={() => handleStatusType('Rejected')}>Rejected</p>
                                        </div>}
                                </div>
                                <p className={status + " " +
                                    ((suggestion.publicly_available === 'Draft' || suggestion.publicly_available === 'Pending') ? pending :
                                        suggestion.publicly_available === 'Public' ? approve :
                                            suggestion.publicly_available === 'Rejected' ? rejected : '')}>
                                    {suggestion.publicly_available}
                                </p>
                            </div>
                        </div>
                        {searchType === 'Meal' ?
                            <Meal meal={suggestion} auth={props.auth} show={false} />
                            :
                            searchType === 'Product' &&
                            <Product product={suggestion} auth={props.auth} />
                        }

                        {searchType === 'Meal' &&
                            <div className={styles.form_group}>
                                {/* <h3>Upload Background Picture</h3> */}
                                <div className={styles.search_con}>
                                    {/* <div className={styles.search_box}> */}
                                    {/* <p onClick={searchSuggested} className={styles.search_icon}>
                                    <SearchIcon className={styles.search_icon} />
                                </p> */}
                                    <Autocomplete
                                        id="tags-outlined"
                                        freeSolo
                                        // filterSelectedOptions
                                        options={relateds.map((option) => option.meal_name + '/' + option._id)}
                                        // onChange={(ev,val)=>this.handleCategoryDropdownChange(ev,val)}
                                        onChange={(e, newValue) => addRelated(newValue)}
                                        // getOptionLabel={option => option}
                                        // renderTags={() => {}}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                onChange={(e) => searchRelated(e)}
                                                variant="outlined"
                                                placeholder="Search for related"
                                                fullWidth
                                            />
                                        )}
                                    />
                                    {/* <input
                                type="text"
                                name="search"
                                onChange={searchRelated}
                                className={styles.search_input}
                                placeholder="Search for related"
                                /> */}
                                    {/* </div> */}
                                    <div className={styles.search_button}>Search</div>
                                </div>
                                <div className={suggestion_form_image}>
                                    <div className={suggestion_form_image_col_1}>
                                        {suggestion.similar_meals.map((images, index) => {
                                            <Image key={index} width={300} height={300} src={images} alt="background" />
                                        })}

                                        {/* <div className={suggestion_form_image_icon_con}>
                                    <AddIcon className={suggestion_form_image_icon} />
                                </div> */}
                                    </div>
                                </div>
                            </div>
                        }
                        {searchType === 'Product' &&
                            <div className={styles.form_group}>
                                {/* <h3>Upload Background Picture</h3> */}
                                <div className={styles.search_con}>
                                    {/* <div className={styles.search_box}> */}
                                    {/* <p onClick={searchSuggested} className={styles.search_icon}>
                                    <SearchIcon className={styles.search_icon} />
                                </p> */}
                                    <Autocomplete
                                        id="tags-outlined"
                                        freeSolo
                                        // filterSelectedOptions
                                        options={relateds.map((option) => option.product_name + '/' + option._id)}
                                        // onChange={(ev,val)=>this.handleCategoryDropdownChange(ev,val)}
                                        onChange={(e, newValue) => addRelated(newValue)}
                                        // getOptionLabel={option => option}
                                        // renderTags={() => {}}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                onChange={(e) => searchRelated(e)}
                                                variant="outlined"
                                                placeholder="Search for related"
                                                fullWidth
                                            />
                                        )}
                                    />
                                    <div className={styles.search_button}>Search</div>
                                </div>
                                <div className={suggestion_form_image}>
                                    <div className={suggestion_form_image_col_1}>
                                        {suggestion.product_alternatives.map((images, index) => {
                                            <Image key={index} width={300} height={300} src={images} alt="background" />
                                        })}

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
            {openModal &&
                <Popup2 popupType='Meal Suggestion Preview' openModal={openModal} closeModal={closeModal}
                    name={suggestion.meal_name} description={suggestion.meal_name}
                    imageData={suggestion.meal_images[0]} image={suggestion.meal_images[0]}
                    // imagesData={suggestion.meal_images.slice(1)} categories={JSON.parse(suggestion.meal_categories).toString().split(',')}
                    prepTime={suggestion.prep_time} cookTime={suggestion.cook_time}
                    serves={suggestion.servings} chef={suggestion.chef}
                    ingredientsList={
                        suggestion.formatted_ingredients?.length
                            ? JSON.parse(suggestion.formatted_ingredients)?.toString()?.split(',')
                            : []}
                    utensilsList={suggestion.kitchen_utensils}
                    //   ingredientsList={suggestion.formatted_ingredients.map(ingredient => JSON.parse(ingredient).properIngredientStringSyntax)} utensilsList={suggestion.kitchen_utensils}
                    instructionChunk1={eval('(' + suggestion.instructions[0] + ')')} instructionChunk2={eval('(' + suggestion?.instructions[1] + ')')}
                    instructionChunk3={eval('(' + suggestion?.instructions[2] + ')')} instructionChunk4={eval('(' + suggestion?.instructions[3] + ')')}
                    instructionChunk5={[]} instructionChunk6={[]}
                    chunk1Content={suggestion.image_or_video_content_1[0]} chunk2Content={suggestion.image_or_video_content_2[0]}
                    chunk3Content={suggestion.image_or_video_content_3[0]} chunk4Content={suggestion.image_or_video_content_4[0]}
                    chunk5Content={suggestion.image_or_video_content_5[0]} chunk6Content={suggestion.image_or_video_content_6[0]}
                    instructionWordlength={suggestion.instructionWordlength}
                    tips={JSON.parse(suggestion.tips[0])} mealImageData={suggestion.meal_images[0]}
                    suggested={true} id={suggestion.id}
                    ingredientGroupList={suggestion.formatted_ingredients.map(ingredient => JSON.parse(ingredient))}
                />
            }

            {openModal2 &&
                <Popup1 popup='product' openModal={openModal2} closeModal={closeModal}
                    name={suggestion.product_name} description={suggestion.product_details}
                    imageData={suggestion.product_images[0]}
                    image={suggestion.product_images[0]}
                    imagesData={suggestion.product_images.slice(1)} categories={suggestion.product_categories}
                    sizesList={[]} ingredientList={suggestion.ingredients_in_product.map(ingredient => JSON.parse(ingredient).properIngredientStringSyntax)}
                    suggested={true} id={suggestion.id}
                    ingredientGroupList={suggestion.ingredients_in_product.map(ingredient => JSON.parse(ingredient))}
                />
            }

            {addPublicMeal &&
                <div className={styles.addpublicMeal_container}>
                    <div className={styles.addpublicMeal}>
                        <div className={styles.addpublicMeal_top}>
                            <h2>Add meal from the store</h2>
                            <div onClick={togglePublicMeal}>
                                <CloseFillIcon style={styles.addpublicMeal_top_close} />
                            </div>
                        </div>
                        <div className={styles.search_con2}>
                            <div className={styles.select_container}>
                                <div onClick={toggleSearchOption} className={styles.select_box}>
                                    <p>{searchType}</p>
                                    <ArrowDropDownIcon className={styles.select_box_icon} />
                                </div>
                                {searchOption &&
                                    <div className={styles.select_options}>
                                        <p onClick={() => handleSearchType('Meal')}>Meals</p>
                                        <p onClick={() => handleSearchType('Product')}>Products</p>
                                        <p onClick={() => handleSearchType('Kitchen Utensil')}>Kitchen Utensils</p>
                                        <p onClick={() => handleSearchType('Category')}>Category</p>
                                    </div>}
                            </div>
                            <div onClick={toggleSearch} className={styles.search_box}>
                                <p className={styles.search_icon}>
                                    <SearchIcon className={styles.search_icon} />
                                </p>
                                <input
                                    type="text"
                                    name="search"
                                    onChange={handleSearchPublicSuggestion}
                                    className={styles.search_input}
                                    placeholder="Search for products"
                                />
                                {search &&
                                    <div className={styles.search_container}>
                                        <div className={styles.search_container_col_1}>

                                            <div className={styles.search_suggestion}>
                                                <h3 className={styles.search_suggestion_h3}>Meals {searchType === 'Meal' && ("(" + (publicSuggestions.length) + ")")}</h3>
                                                {searchType === 'Meal' &&
                                                    <ul className={styles.search_help_lists}>
                                                        {publicSuggestions.map(suggestion => {
                                                            return (
                                                                <li onClick={() => addSuggestion(suggestion)} className={styles.search_help_list}>
                                                                    {suggestion.meal_name}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                }
                                            </div>

                                            <div className={styles.search_container_col_2}>
                                                <div className={styles.search_container_col_2_row_1}>
                                                    <h3 className={styles.search_products_h3}>Products {searchType === 'Product' && ("(" + (publicSuggestions.length) + ")")}</h3>
                                                </div>
                                                <div className={styles.search_container_col_2_row_2}>
                                                    <div className={styles.searched_products}>
                                                        <ul className={styles.search_help_lists}>
                                                            {searchType === 'Product' &&
                                                                <>
                                                                    {publicSuggestions.map(suggestion => {
                                                                        return (
                                                                            <li onClick={() => addSuggestion(suggestion)} className={styles.search_help_list}>
                                                                                {suggestion.product_name}
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </>
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.search_help}>
                                                <h3 className={styles.search_help_h3}>Kitchen Utensils {searchType === 'Kitchen Utensils' && ("(" + (publicSuggestions.length) + ")")}</h3>

                                            </div>
                                        </div>
                                    </div>}
                            </div>
                            <div className={styles.search_button}>Search</div>
                        </div>
                    </div>

                </div>}

            {transferToInventory &&
                <TransferToInventory type={searchType} meal={suggestion} toggleTransferToInventory={toggleTransferToInventory} />
            }

            {sent &&
                <Sent toggleSent={toggleSent} />
            }

        </div>
    )
}

// export default SuggestedMeals

function mapStateToProp(state) {
    return {
        auth: state.Auth
    };
}

export default connect(
    mapStateToProp,
)(SuggestedMeals);