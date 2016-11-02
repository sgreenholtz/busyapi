#### Start Up
- Installed Node.js and NPM for Linux command line. Built a quick Hello World app using [Tutorialspoint](https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm) to get a feel for Node.js
- Got the busyapi running. Ran the sample curl call, received successful response

#### Planning
##### Thoughts
- How can I load test this api and see where breakdowns are happening?
- What are common areas where performance breaks down in other applications? Recursion, too much kept in memory, etc

#### Dev Route
##### Issue:
Keeping usages in memory using an array will get enormous

##### Possible solution: 
Keep an archive file and periodically dump the array into the file, while keeping a single var to store the usage id to return

- Program will still store the data, but the in-memory array won't get unmanageble, but you don't have to do a read/write on every call

- Ideally, this would be stored in a database rather than on the file system server. With MongoDB, inserting a usage document into the collection without needing code to map entities to a standard SQL database

#### Tasks
- Modified code to write out usage to a file. To test, installed [loadtest](https://https://www.npmjs.com/package/loadtest) for nodejs
- Tried to run this on command line to simulate 1M calls per min
```
> loadtest --rps 16666 -P '{"patientId":"100","timestamp":"Tue Nov 01 2016 09:11:51 GMT-0500 (CDT)","medication":"Albuterol"}' http://localhost:3000/api/usages 
```

And got error:
```
net.js:854
  return +port === (port >>> 0) && port >= 0 && port <= 0xFFFF;
         ^

RangeError: Maximum call stack size exceeded
    at isLegalPort (net.js:854:10)
    at lookupAndConnect (net.js:928:10)
    at Socket.connect (net.js:906:5)
    at Agent.exports.connect.exports.createConnection (net.js:63:35)
    at Agent.createSocket (_http_agent.js:172:16)
    at Agent.addRequest (_http_agent.js:141:23)
    at new ClientRequest (_http_client.js:132:16)
    at Object.exports.request (http.js:31:10)
    at HttpClient.self.makeRequest (/usr/local/lib/node_modules/loadtest/lib/httpClient.js:207:18)
    at delayed (/usr/local/lib/node_modules/loadtest/lib/timing.js:453:3)
```

- Tried using curl to simulate calls
```
> curl -X POST -H "Content-Type: application/json" --data '{"patientId":"100","timestamp":"Tue Nov 01 2016 09:11:51 GMT-0500 (CDT)","medication":"Albuterol"}' http://localhost:3000/api/usages?[1-1000000]
```

- Handled about 20,000 calls in one minute, but this could be a limitation of my machine and not the server

- Trying [Apache ab](http://httpd.apache.org/docs/current/programs/ab.html), which according to the loadtest site can handle a call of 16,666 calls per second
```
> ab -c 1000 -n 1000000 -p /home/sebastian/data.json -T "Content-Type: application/json" http://localhost:3000/api/usages 
```
Result:
```
Benchmarking localhost (be patient)
apr_socket_recv: Connection timed out (110)
Total of 66396 requests completed

```

#### Other Thoughts
- A server with more processing memory than my local machine would certainly improve the number of concurrent requests that the application could handle

- Operating in a node cluster would allow for concurrent processing, which would help with the large number of requests
