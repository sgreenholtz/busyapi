module.exports = function(app){
    app.post('/api/usages', function(req, res){

        console.log('got POST /api/usages');
        console.log('usage JSON: ' + JSON.stringify(req.body));

        app.usages.push(req.body);

        var usageId = app.usages.length;
        console.log('Stored usage count: ' + usageId);

        res.status(201).json({'id':usageId});
    });
}
