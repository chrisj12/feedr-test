Name: Chris Job
 
Email: chrisjob012@yahoo.com 

Time to complete: 2hrs

Notes:

Assumptions
- 
- Credits to not expire
- Any db can be used

Examples
-
- User A is allowed a 3 credit subsidy to spend every Monday and can only order food on Mondays.
- User B is allowed a 15 credit subsidy to spend every week, a 10 credit subsidy to spend every Friday, and can order food Monday-Friday.
- User C has no subsidy and can order food Monday-Friday
- User D is allowed 10 every month and 10 mid month and can spend only Wednesday-Friday.

DB Design
-

*User Table*

| id | name   | email              | companyID | Active | createdDate | etc... |
|----|--------|--------------------|-----------|--------|-------------|--------|
| 1  | User A | usera@google.com   | 1         | 1      | 22/02/2018  |        |
| 2  | User B | userb@facebook.com | 2         | 1      | 12/04/2018  |        |
| 3  | User C | userc@feedr.com    | 3         | 1      | 02/06/2018  |        |
| 4  | User D | userc@google.com   | 1         | 1      | 22/06/2018  |        |
| 3  | User E | userc@bbc.co.uk    | 4         | 1      | 19/09/2018  |        |


*SubsidiesPerWeek Table*

| id | userID | amount | dayOfWeek | createdDate |
|----|--------|--------|-----------|-------------|
| 1  | 1      | 3      | Monday    | 23/02/2018  |
| 2  | 2      | 15     | Monday    | 13/04/2018  |
| 3  | 2      | 10     | Friday    | 03/06/2018  |

*SubsidiesPerMonth Table*

| id | userID | amount | dayOfMonth | createdDate |
|----|--------|--------|------------|-------------|
| 1  | 4      | 10     | 1          | 23/06/2018  |
| 2  | 4      | 10     | 15         | 23/06/2018  |


*UserCreditStatus Table*

| id | userID | remainingSubsidyCredits | remainingPurchasedCredits | createdDate |
|----|--------|-------------------------|---------------------------|-------------|
| 1  | 2      | 10                      | 1                         | 03/06/2018  |
| 2  | 2      | 10                      | 15                        | 03/06/2018  |

*UserPermittedDays Table*

| id | userID | allowedDays | createdDate |
|----|--------|-------------|-------------|
| 1  | 1      | 1,0,0,0,0   | 03/06/2018  |
| 2  | 2      | 1,1,1,1,1   | 03/06/2018  |
| 3  | 3      | 1,1,1,1,1   | 10/06/2018  |
| 4  | 4      | 0,0,1,1,1   | 12/12/2018  |

*Items Table*

| id | itemName | price | availableQuantity | etc.. |
|----|----------|-------|-------------------|-------|
| 1  | Chicken  | 5     | 200               |       |
| 2  | Salad    | 5     | 200               |       |
| 3  | Ramen    | 5     | 200               |       |
| 4  | Burger   | 5     | 200               |       |

*Order Table*

| id | userID | usedSubsidy | usedPurchased | orderDate |
|----|--------|-------------|---------------|-----------|
| 1  |        |             |               |           |
| 2  |        |             |               |           |
| 3  |        |             |               |           |
| 4  |        |             |               |           |

*OrderItems Table*

| id | itemId | quantity | comments |
|----|--------|----------|----------|
| 1  |        |          |          |
| 2  |        |          |          |
| 3  |        |          |          |
| 4  |        |          |          |

*AuditTrail Table*

| id | userID | usedSubsidy | usedPurchased | activityDate | transactionNumber | comments |
|----|--------|-------------|---------------|--------------|-------------------|----------|
| 1  |        |             |               |              |                   |          |
| 2  |        |             |               |              |                   |          |
| 3  |        |             |               |              |                   |          |
| 4  |        |             |               |              |                   |          |


API
-

`GET /api/v1/admin/days-permitted/:user-id/`
and
`GET /api/v1/user/days-permitted/`

returns
```
{
    "1": true,
    "2": true,
    "3": false,
    "4": false,
    "5": true
}
```

`PUT /api/v1/admin/days-permitted/:user-id/`
with with data
```
{
    "1": true,
    "2": true,
    "3": false,
    "4": false,
    "5": true
}
```
returns
```
{
    success:true
}
```




`GET /api/v1/admin/subs-by-week/:user-id`

returns
```
[
    {
        "id":2
        "dayOfWeek":Monday,
        "creditAmount": 15
    },
    {
        "id":2
        "dayOfWeek":Friday,
        "creditAmount": 10
    }
]
```

`POST /api/v1/admin/subs-by-week/:user-id` updates 
with data
```
[
    {
        "dayOfWeek":Wednesday,
        "creditAmount": 15
    }
]
```
returns
```
{
    success:true
}
```

`PUT /api/v1/admin/subs-by-week/:row-id` updates one row in `SubsidiesPerWeek` table
with data
```
{
        "dayOfWeek":Monday,
        "creditAmount": 25
},
```
returns
```
{
    success:true
}
```

`DELETE /api/v1/admin/subs-by-week/:row-id` deletes one row in `SubsidiesPerWeek` table
returns
```
{
    success:true
}
```

`GET /api/v1/admin/subs-by-month/:id`

returns
```
[
    {
        "id":2
        "dateOfMonth":1,
        "creditAmount": 15
    },
    {
        "id":2
        "dateOfMonth":15,
        "creditAmount": 10
    }
]
```

`POST /api/v1/admin/subs-by-month/:user-id` updates 
with data
```
[
    {
        "dateOfMonth":1,
        "creditAmount": 15
    }
]
```
returns
```
{
    success:true
}
```

`PUT /api/v1/admin/subs-by-month/:row-id` updates one row in `SubsidiesPerMonth` table
with data
```
{
        "dateOfMonth":1,
        "creditAmount": 25
},
```
returns
```
{
    success:true
}
```

`DELETE /api/v1/admin/subs-by-month/:row-id` deletes one row in `SubsidiesPerMonth` table
returns
```
{
    success:true
}
```

`GET /api/v1/admin/credits/:id/`
and
`GET /api/v1/user/credits/`

returns
```
{
    "subsidyCredits": 15,
    "purchasedCredits": 10
}
```

`PUT /api/v1/admin/credits/purchase/:user-id/`
and
`PUT /api/v1/user/credits/purchase`

with data
```
{
        "purchasedCredits":10
},
```
returns
```
{
    success:true
}
```

There will also be REST methods for user management, order management, item management etc.
