import { ArrowDown2Icon, ArrowUp2Icon, ChatIcon, ShareIcon, StarIcon } from '../icons';
import styles from './reviews.module.css'

function Reviews(){

    return(
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
                                        Array.from({ length: 5 }).map((i,j) => {
                                            var rate = 4;
                                            if((j+1) <= rate){
                                                return(
                                                    <StarIcon key={j} style={styles.product_review_rating_icon} />
                                                )
                                            }else{
                                                return(
                                                    <StarIcon key={j} style={styles.product_review_rating_icon2} />
                                                )}
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.product_reviews}>
                <div className={styles.product_review}>
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
                                            Array.from({ length: 5 }).map((i,j) => {
                                                var rate = 4;
                                                if((j+1) <= rate){
                                                    return(
                                                        <StarIcon key={j} style={styles.product_review_rating_icon} />
                                                    )
                                                }else{
                                                    return(
                                                        <StarIcon key={j} style={styles.product_review_rating_icon2} />
                                                    )}
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={styles.review_details_top2}>
                                    <div className={styles.review_votes}>
                                        <div className={styles.review_vote}>
                                            <ArrowUp2Icon style={styles.review_vote_up} />
                                            <p>323</p>
                                        </div>
                                        <div className={styles.review_vote}>
                                            <ArrowDown2Icon style={styles.review_vote_down} />
                                            <p>323</p>
                                        </div>
                                    </div>
                                    <h4><ChatIcon /> 12</h4>
                                    <h5><ShareIcon /> Share Comment</h5>
                                </div>
                            </div>
                            <p className={styles.product_review_sub_message}>Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to combat diseases…and it was a Roaring success (as in Roaring Drunk) I mean we had Long lines of prisoners fist fighting to use them.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.product_review}>
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
                                            <p>323</p>
                                        </div>
                                        <div className={styles.review_vote}>
                                            <ArrowDown2Icon style={styles.review_vote_down} />
                                            <p>323</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews;