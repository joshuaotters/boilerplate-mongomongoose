require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//connect to remote db instance::mongodb atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Creating the Person model
//let Person;
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: Number,
  favoriteFoods: [String]

});
const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  //Creating student document
  let student = new Person({name: "Joshua", age: 23, favoriteFoods: ['posho', 'rice', 'matooke']})
  //Saving document to database
  student.save(function(err, data){
    if(err) return console.error(err);
    done(null, data)
  });
};
//Create an array of many people
const arrayOfPeople = [
  {name: "Phionah", age: 34, favoriteFoods: ["Rice", "Matooke", "Chicken"]},
  {name: "Hiram", age: 45, favoriteFoods: ["Cheese", "Ginger", "Corn"]},
  {name: "Sam", age: 30, favoriteFoods: ["Fish", "Bread", "Yams"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) =>{
    if(err) return console.error(err);
    done(null, people)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound)=> {
    if(err) return console.error(err)
    done(null, personFound)
  })
};
const food = "Rice";
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if(err) return console.error(err)
    done(null, foodFound)
  })
};
const personId = "";
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, personFound) => {
    if(err) return console.error(err)
    done(null, personFound)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
