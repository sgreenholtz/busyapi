module.exports = function(app){
    app.post('/api/usages', function(req, res){

        // Store the supplied usage data
        app.usages.push(req.body);
        // increment the count
        app.count++;
        console.log('Stored usage count: ' + app.count);

        res.status(201).json({'id':app.count});
    });
}
