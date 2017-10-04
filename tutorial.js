var redis = require('redis');
var client = redis.createClient();	//port, host

//client.select(3);

//start redis-server first
client.on('connect', function(err){
	if(err) throw err;
	console.log('Connected');

	//Key-value
	/*client.set('framework', 'Node');
	client.get('framework', function(err, reply){
		if(err) throw err;
		console.log(reply);
	});
	
	--REDIS--
	SET framework 'Node'
	GET framework
	*/



	//Objects (hashes)
	/*client.hmset('frameworks', {
		'Javascript': 'AngularJS', 
		'CSS': 'Bootstrap', 
		'Node': JSON.stringify({ //as nested objects not supported
			'Express': '4', 
			'Socket.io': '5'
		}), 
	});
	client.hgetall('frameworks', function(err, obj){
		console.log(JSON.parse(obj['Node']));
	})

	--REDIS--
	HSET frameworks CSS Bootstrap //for only 1 field
	HSET frameworks JS 'Angular' Express '4' Socket.io '5' //multiple
	HGET frameworks JS
	HGETALL frameworks
	HSET users visits 10
	HINCRBY users visits 1
	HDEL users visits
	*/



	//Lists
	/*client.rpush(['frameworksList', 'AngularJS', 'Backbone', 'Ajax']); //lpush also available
	client.lrange('frameworksList', 0, -1, function(err, reply){
		//0 = start, -1 = end, rrange not available
		if(err) throw err;
		console.log(reply);
	});

	--REDIS--
	RPUSH friends "Alice"
	LRANGE: friends 0 -1
	LLEN, LPOP, RPOP
	*/



	//Sets - similar to lists, but not duplicates allowed and unsorted
	/*client.sadd(['tags', 'angularjs2', 'backbonejs', 'emberjs']);
	client.smembers('tags',function(err, reply){
		if(err) throw err;
		console.log(reply);
	});
	--REDIS--
	SADD tags 'nodejs'
	SREM tags 'angularjs2'
	SISMEMBER (0 or 1), SMEMBERS, SUNION a b
	*/



	/*Sorted sets
	--REDIS--
	ZADD hackers 1912 'Alan Turing' //1912 is a number which is used to sort these
	ZRANGE hackers 2 4
	*/

	//All callbacks in setting are optional

	//Checking for keys
	/*client.exists('key', function(err, reply){
		if(err) throw err;
		if(reply == 1){
			//key exists
			console.log('Key exists');
		}else{ //reply = 0
			//key does not exist
			console.log('Key does not exist');
		}
	});*/

	//Delete keys
	/*client.del('frameworks');  //destroys key instantly
	client.expire('key', 30); //destroys key in 30 seconds

	--REDIS--
	EXPIRE key
	*/

	/*TTL - time till lives

	--REDIS--
	TTL key
	// >=0 => The correct time
	// -1 => It will never expire
	// -2 => It does not exist anymore
	*/



	//incrementing
	/*client.incr('key'); //increments by 1
	//preferred over key = key+1 and all because if 2 people access it.
	client.incrby('key', 5);
	//also decr() and decrby()

	--REDIS--
	INCR key
	DECR key
	INCRBY key 5
	DECRBY key 5
	*/

});
