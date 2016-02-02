# Metrics Collector Aggregation Microservice

This is a microservice that subscribes to a queue or pubsub channel hosted on 

* Redis 
* RabbitMQ
* Apache Kafka 

and aggregates the data using one of the built-in functions:

* count - count incoming data messages
* sum - sum a single element of the message
* stats - calculate stats on a single element of the message
* countdistinct - count numbers of distinct values of a single element of the message

This service is designed to be paired with the *Metrics Collector Microservice* which sends web traffic data to a Redis, RabbitMQ or Kafka queue or pubsub channel. Other Microservices can listen to the data arriving on those channels, services such as the *Metrics Collector Storage Microservice* which can store data in Cloudant, MongoDB or ElasticSearch. 

## Running Locally

Clone this repository and then run

```
npm install
```

Set your environment variables and start up the app e.g.

```
export QUEUE_TYPE=redis_pubsub
node app.js
```

## API

This Microservice is controlled by a simple API

### GET /configure

Allows the choice of aggregator to be defined together with a choice of which part of the incoming JSON is to be analysed.

Parameters

* mode - one of `count`, `sum`, `stats` or `null`
* selector - choose which part of the incoming Javascript object to aggregate (`sum` and `stats` only)

e.g. 

* `GET /configure?mode=count`
* `GET /configure?mode=sum&selector=a`
* `GET /configure?mode=stats&selector=c`
* `GET /configure?mode=countdistinct&selector=d`

Reply:

```js
{
	"ok": true,
	"mode": "stats",
	"selector": "c"
}
```

### GET /query

Returns the current state of the aggregator

Parameters: None

e.g. `GET /query`

Reply:

```js
// stats
{
	"ok": true,
	"err": null,
	"data": {
		"sum": 3769312,
		"count": 220,
		"min": 70,
		"max": 32735,
		"sumsqr": 140920641
	}
}
```

or

```js
// countdistinct
{
	"ok": true,
	"err": null,
	"data": {
		"rat": 75,
		"gerbil": 58,
		"dog": 65,
		"robin": 61,
		"squirrel": 70,
		"donkey": 54,
		"cat": 74,
		"wolf": 65,
		"crab": 55,
		"cow": 64,
		"ant": 67,
		"fox": 68,
		"chicken": 51
	}
}

```

### GET /reset

Rest the aggregator's data.

Parameters: none

e.g. `GET /reset`

Reply:

Reply:

```js
{
	"ok": true
}
```

## Environment variables

### QUEUE_TYPE

One of 

* redis_queue - A Redis list data structure
* redis_pubsub - A Redis PubSub channel
* rabbit_queue - A RabbitMQ PUSH/WORKER queue
* rabbit_pubsub - A RabbitMQ PUBLISH/SUBSCRIBE channel
* kafka - An Apache Kafka topic
* null - default (does nothing)

### QUEUE_NAME

The name of the queue/channel that is subscribed to. If omitted, it takes the following values for each of the queue types:

1. stdout - n/a
2. redis_queue - mcqueue
3. redis_pubsub - mcpubsub
4. rabbit_queue - mcqueue
5. rabbit_pubsub - mcpubsub
6. kafka - mcqueue

### VCAP_SERVICES

`VCAP_SERVICES` is created for you by the Bluemix Cloud Foundry service. It defines the credentials of the attached services that this app can connect to. 



