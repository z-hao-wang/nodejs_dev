var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'test');
 db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // yay!
});;
var kittySchema = new mongoose.Schema({
    name: String,
	type:String
});
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
  return greeting;
}

var Kitten = db.model('Kitten', kittySchema)
var silence = new Kitten({ name: 'Silence' })
console.log(typeof(silence.speak)) // 'Silence

var Kitten = db.model('Kitten', kittySchema)
var fluffy = new Kitten({ name: 'fluffy' });

console.log(typeof(fluffy.speak));
//fluffy.speak() // "Meow name is fluffy"
fluffy.save(function (err) {
  if (err) // TODO handle the error
  console.log('meow')
});
Kitten.find(function (err, kittens) {
  if (err) // TODO handle err
  console.log(kittens)
});
//Kitten.find({ name: /fluff/i }, callback)
/*

var animalSchema = new mongoose.Schema({ name: String, type: String });

animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
}
var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });
console.log(typeof(dog.findSimilarTypes));
dog.findSimilarTypes(function (err, dogs) {
  console.log(dogs); // woof
});*/