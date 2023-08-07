import { ArrowDown2Icon, ArrowUp2Icon, ChatIcon, ShareIcon, StarIcon } from '../icons';
import styles from './reviews.module.css'
import axios from '../../util/Api';
import { useEffect, useState } from 'react';

function Reviews({ itemId }) {

    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1)
    const [message, setMessage] = useState('')

    useEffect(() => {
        getAllComments()
    }, [])

    const getAllComments = async () => {
        try {
            const allComment = await axios.get(`/comment/get-all/${page}?item=${itemId}`)
            setComments(allComment.data.data.comments)
        } catch (e) {

        }
    }


    const postNewComment = async () => {
        try {
            if (message) {
                const user = JSON.parse(localStorage.getItem('user'))
                const created_by = user?.first_name.concat(' ', user.last_name)
                const payload = { message, item: itemId, created_by, item_type: 'Item' };
                const resp = await axios.post(`/comment/create`, payload)
                setMessage('')
                getAllComments()
            } else {
                alert('Enter a comment to proceed')
            }
        }
        catch (e) {
            console.log('error', e)
        }
    }


    return (
        <div id="reviews" className={styles.products_reviews_container}>
            <div className={styles.products_reviews_summary}>
                <div className={styles.product_review_col_1}>
                    <div className={styles.product_review_col_1_row}>
                        <div className={styles.product_review_name_ab}>e</div>
                    </div>
                    <div className={styles.review_details}>
                        <div className={styles.review_details_top}>
                            <div className={styles.review_details_top1}>
                                <h3 className={styles.product_review_name}>wetew.</h3>
                                <div className={styles.product_review_rating_icons}>
                                    {
                                        Array.from({ length: 5 }).map((i, j) => {
                                            var rate = 4;
                                            if ((j + 1) <= rate) {
                                                return (
                                                    <StarIcon key={j} style={styles.product_review_rating_icon} />
                                                )
                                            } else {
                                                return (
                                                    <StarIcon key={j} style={styles.product_review_rating_icon2} />
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <div className={styles.review_input_container}>
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: '100%', background: 'none', paddingLeft: '2rem', paddingTop: '1rem', border: 'none', outline: 'none' }}
                                        placeholder='Write Review'
                                    />
                                </div>
                                <div style={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button onClickCapture={postNewComment} className={styles.profile_button}>Add Review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                comments.map((comment, idx) => (
                    <div key={comment._id} className={styles.product_reviews}>
                <div className={styles.product_review}>
                    <div className={styles.product_review_col_1}>
                        <div className={styles.product_review_col_1_row}>
                            <div className={styles.product_review_name_ab}>{comment.created_by.username.charAt(0)}</div>
                        </div>
                        <div className={styles.review_details}>
                            <div className={styles.review_details_top}>
                                <div className={styles.review_details_top1}>
                                    <h3 className={styles.product_review_name}>{comment.created_by.username}</h3>
                                    <div className={styles.product_review_rating_icons}>
                                        {
                                            Array.from({ length: 5 }).map((i, j) => {
                                                var rate = 4;
                                                if ((j + 1) <= rate) {
                                                    return (
                                                        <StarIcon key={j} style={styles.product_review_rating_icon} />
                                                    )
                                                } else {
                                                    return (
                                                        <StarIcon key={j} style={styles.product_review_rating_icon2} />
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={styles.review_details_top2}>
                                    <div className={styles.review_votes}>
                                        <div className={styles.review_vote}>
                                            <ArrowUp2Icon style={styles.review_vote_up} />
                                            <p>0</p>
                                        </div>
                                        <div className={styles.review_vote}>
                                            <ArrowDown2Icon style={styles.review_vote_down} />
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <h4><ChatIcon /> 0</h4>
                                    <h5><ShareIcon /> Share Comment</h5>
                                </div>
                            </div>
                            <p className={styles.product_review_sub_message}>{comment.message}</p>
                        </div>
                    </div>
                </div>
                {/* <div className={styles.product_review}>
                    <div className={styles.product_review_col_1}>
                        <div className={styles.product_review_col_1_row}>

                        </div>
                        <div className={styles.review_details}>
                            <div className={styles.product_review_col_1}>
                                <div className={styles.product_review_col_1_row}>
                                    <div className={styles.product_review_name_ab}>e</div>
                                </div>
                                <div className={styles.review_details}>
                                    <div className={styles.review_details_top}>
                                        <div className={styles.review_details_top1}>
                                            <h3 className={styles.product_review_name}>wetew.</h3>
                                        </div>
                                    </div>
                                    <p className={styles.product_review_sub_message}>Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to combat diseases…and it was a Roaring success (as in Roaring Drunk) I mean we had Long lines of prisoners fist fighting to use them.</p>
                                    <div className={styles.review_votes}>
                                        <div className={styles.review_vote}>
                                            <ArrowUp2Icon style={styles.review_vote_up} />
                                            <p>0</p>
                                        </div>
                                        <div className={styles.review_vote}>
                                            <ArrowDown2Icon style={styles.review_vote_down} />
                                            <p>0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
                ))
            }
        </div>
    )
}

export default Reviews;