var http = require('http');
var redis = require('redis');
var client = redis.createClient(6379, 'localhost');	//port, host

//client.select(3);

var x;

client.on('error', function(err){
	console.log(err);
});

client.on('connect', function(){
	console.log('Connected to Redis');
});

var server = http.createServer(function(req, res){
	if(req.url == '/'){
		client.get('framework', function(err, reply){
			if(err){
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.write('Error');
				res.end();
				throw err;
			}
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('Value you asked for: '+reply);
			client.get('foo', function(err, reply){
				if(err){
					res.writeHead(404, {'Content-Type': 'text/plain'});
					res.write('Error');
					res.end();
					throw err;
				}
				x = reply;
				res.write('\nfoo: '+reply+', x: '+x);
				client.incr('foo');
				client.get('foo', function(err, reply){
					if(err){
						res.writeHead(404, {'Content-Type': 'text/plain'});
						res.write('Error');
						res.end();
						throw err;
					}
					res.write('\nNew foo: '+reply+', x: '+x);
					res.end();
				});
			});
		});
	}
});
server.listen(3000);

server.on('connect', function(){
	console.log('Connected to HTTP');
});
