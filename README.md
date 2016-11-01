#busyapi
A sample API server for use as an optimization subject.

##Setup
*  Clone this repository
*  Install dependencies `npm install`
*  Start the server `npm start`

##API
The API consists of a single endpoint which receives data when a patient uses their inhaler.

##Usage
*  method: POST
*  endpoint: /api/usages
*  data: JSON usage object
*  result: JSON object containing the usageId, HTTP Status 201, 200, 500

###Example

**Data**
````
{
    "patientId":100,
    "timestamp":"",
    "medication":"",
}
````

**Request**

     curl -X POST -H "Content-Type: application/json" --data '{"patientId":"100","timestamp":"","medication":"Albuterol"}' http://localhost:3000/api/usages

**Response**
````
{
    "id":22954
}
````
