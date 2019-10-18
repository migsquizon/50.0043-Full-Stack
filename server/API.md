# Flask API

## **POST** /book/&lt;asin&gt;
Add a review by ASIN from the book\
Content-Type: application/json
```
{
    "overall": 5,
    "reviewText": "test",
    "reviewerName": "John",
    "reviewerID":"GHJKGMHHGFFGB",
    "summary": "book was awesome",
    "helpful": OPTIONAL,
    "reviewTime": OPTIONAL,
    "UnixReviewTime": OPTIONAL
}
```
```
fetch("http://localhost:5000/book/ASIN12345", {
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "overall": 5,
    "reviewText": "test",
    "reviewerName": "John",
    "reviewerID": "GHJKGMHHGFFGB",
    "summary": "book was awesome"
  }
})
```