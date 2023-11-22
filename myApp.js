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
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
      done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, deletedDoc) => {
    if(err) console.log(err);
      done(null, deletedDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove}, (err, deleteStatus) => {
    if(err) return console.log(err);
      done(null, deleteStatus);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const findQuery = Person.findOne({favoriteFoods: foodToSearch});
  findQuery.sort({name: 1})
  .limit(5)
  .select({name: 1, age:0});
  findQuery.exec((err, docs) => {
    if(err) return console.log(err);
    done(null, docs)
  });
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
