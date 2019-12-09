import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import EachReview from './EachReview';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { withRouter } from 'react-router-dom';
import './Reviews.css';
import 'react-circular-progressbar/dist/styles.css';

const data = {
  "rating": 4.3,
  "reviews": [
    {
      "username": "kng",
      "rating": 4.0,
      "review_title": "A brilliant deep dive into the geopolitics of the fossil fuel companies - a wake up call to action!",
      "date": "October 1, 2019",
      "review": "This is for sure some of Bella Forrest's best work. And that's saying And that's saying something given her prior achievements in relationship to ‘deep-dive’ journalism. It should be required reading for anybody who wants to understand how we got on the near precipice of the staggering environmental catastrophe known as ‘global warming’ and now increasingly referred to with that other euphemism - ’climate change’. The book is riveting, charming, infuriating, and brilliant in its depiction of the co-option of many governments, particularly our own, in the breakneck sociopathic/utilitarian exploitation of natural resources, in the service of unlimited fossil fuels, long-term environmental consequences be damned. All skillfully rationalized (jobs, energy independence, 'progress,' etc.) And yet I have to say, despite my enormous respect for this book, it comes up short framing the bigger picture of how something this catastrophic might really have happened. Standing back a goodly distance, one has to say that one common denominator is that we find sociopaths or at least individuals with significant sociopathic features in leadership positions within both powerful global corporations and within many governments. Rachel's book is littered with them - they are the stars and cast of her story. They simply do not care about the consequences to others of their exploitation of the environment, do not care that they are sacrificing the long-term planetary health",
      "helpful": 20,
    },
    {
      "username": "noobkenneth",
      "rating": 3.7,
      "review_title": "The truth",
      "date": "October 1, 2019",
      "review": "Another fascinating and eye opening read by my favorite anchor/reporter/ hero. An important addition to her previous book this one focuses on the oil and gas industries. Russia, Tillerson Exon Mobil are all exposed and it’s a mouth gaping account of corporate greed, lies and how we need to act now, before it’s too late.",
      "helpful": 15,
    }
  ]
}



function goToReviewPage(event, props) {
  event.preventDefault();
  props.history.push("/add-review")
}

function Reviews(props) {
  const percentage = props.rating / 5 * 100;
  return (
    <div className="reviews-container">
      {/* <Row>
        <Col xs={2}> */}
      <div className="ratings-info-container">
        <div className="ratings-container">

          <CircularProgressbar
            value={percentage}
            text={props.rating}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: '#F8CF46',
              textSize: '40px',
              fontFamily: 'Lato',
              textColor: '#3B5260',
            })}
          />
        </div>
        <div className="write-review-container">
          <Button className="add-reading-list-button" onClick={(event) => goToReviewPage(event, props)}>Write a review</Button>

        </div>
        <div className="write-review-container">
          Categories:
        </div>

      </div>

      <div className="review-container">
        {props.data.map((review) => (
          <EachReview
            id={review.id}
            reviewerName={review.reviewerName}
            rating={review.overall}
            review_title={review.summary}
            date={review.reviewTime}
            review={review.reviewText}
            helpful={review.helpful[1]}
          />
        ))}
      </div>
      {/* </Col>
        <Col xs={10}> */}
      {/* </Col>
      </Row> */}
    </div>
  )
}

export default withRouter(Reviews);