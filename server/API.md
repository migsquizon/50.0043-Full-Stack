# Flask API

## **POST** /book/&lt;asin&gt;
Add a review by ASIN from the book\
Content-Type: application/json
### Input
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
Expected Response: 200
## **GET** /book/&lt;asin&gt;
All query parameters are optional\

**GET** book/B000F83SZQ?verbose=3&also_bought=1&buy_after_viewing=1

Verbose (default=2)
* 1: returns summary only
* 2: returns metadata
* 3: return metadata and summary of suggested books 

Only when verbose = 3 will also_bought and buyafterviewing be used. \
Show number of summaries in also_bought and buyafterviewing \
also_bought and buyafterviewing default = 1

### Sample response
**GET** http://localhost:5000/book/B000F83SZQ?verbose=1
```
{
  "_id": {
    "$oid": "5d9c8812617c740c174bc7fe"
  },
  "asin": "B000F83SZQ",
  "imUrl": "http://ecx.images-amazon.com/images/I/51yLqHe%2BFqL._BO2,204,203,200_PIsitb-sticker-v3-big,TopRight,0,-55_SX278_SY278_PIkin4,BottomRight,1,22_AA300_SH20_OU01_.jpg"
}
```
**GET** http://localhost:5000/book/B000F83SZQ?verbose=2
```
{
  "_id": {
    "$oid": "5d9c8812617c740c174bc7fe"
  },
  "asin": "B000F83SZQ",
  "price": 0.0,
  "imUrl": "http://ecx.images-amazon.com/images/I/51yLqHe%2BFqL._BO2,204,203,200_PIsitb-sticker-v3-big,TopRight,0,-55_SX278_SY278_PIkin4,BottomRight,1,22_AA300_SH20_OU01_.jpg",
  "related": {
    "also_bought": [
      "B0080H1C0W",
      "B00LK4ZKOG",
      "B00JZD2PU6"
    ],
    "buy_after_viewing": [
      "B006HCTWVS",
      "B009FZPMFO",
      "B00F1I0C40",
      "B00IVC9IQG"
    ]
  },
  "categories": [
    [
      "Books",
      "Literature & Fiction"
    ],
    [
      "Books",
      "Mystery, Thriller & Suspense",
      "Thrillers & Suspense",
      "Suspense"
    ],
    [
      "Kindle Store",
      "Kindle eBooks",
      "Mystery, Thriller & Suspense",
      "Suspense"
    ]
  ]
}
```
**GET** http://localhost:5000/book/B000F83SZQ?verbose=3
```
{
  "_id": {
    "$oid": "5d9c8812617c740c174bc7fe"
  },
  "asin": "B000F83SZQ",
  "price": 0.0,
  "imUrl": "http://ecx.images-amazon.com/images/I/51yLqHe%2BFqL._BO2,204,203,200_PIsitb-sticker-v3-big,TopRight,0,-55_SX278_SY278_PIkin4,BottomRight,1,22_AA300_SH20_OU01_.jpg",
  "related": {
    "also_bought": [
      {
        "_id": {
          "$oid": "5d9c8822617c740c174e12aa"
        },
        "asin": "B0080H1C0W",
        "imUrl": "http://ecx.images-amazon.com/images/I/51dUSTPE-2L._BO2,204,203,200_PIsitb-sticker-v3-big,TopRight,0,-55_SX278_SY278_PIkin4,BottomRight,1,22_AA300_SH20_OU01_.jpg"
      }
    ],
    "buy_after_viewing": [
      {
        "_id": {
          "$oid": "5d9c881d617c740c174d6045"
        },
        "asin": "B006HCTWVS",
        "description": "InFrosted ShadowNancy Warren delivers a rollicking, fun mystery ride filled with murder, mayhem and makeup! -- Wendy Roberts, author of the Ghost Dusters mystery seriesUltimate Concealer, Toni Diamond Mysteries, Book 2:A touch of romance. A large dose of mystery. An even larger dose of fashion sense. And at least one character that you just want to hit on the head in hopes it would knock some sense into him. I've enjoyed both of these books and look forward to more.Jutzie, Top 1000 Amazon Reviewer",
        "imUrl": "http://ecx.images-amazon.com/images/I/51eKXbQwsgL._BO2,204,203,200_PIsitb-sticker-v3-big,TopRight,0,-55_SX278_SY278_PIkin4,BottomRight,1,22_AA300_SH20_OU01_.jpg"
      }
    ]
  },
  "categories": [
    [
      "Books",
      "Literature & Fiction"
    ],
    [
      "Books",
      "Mystery, Thriller & Suspense",
      "Thrillers & Suspense",
      "Suspense"
    ],
    [
      "Kindle Store",
      "Kindle eBooks",
      "Mystery, Thriller & Suspense",
      "Suspense"
    ]
  ]
}
```
