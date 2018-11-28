var path = require('path');

var catalogjson = require('../data/catalog.json');

module.exports = function(app) {
	app.get('/api/catalogjson', function(req, res) {
		res.json(catalogjson);
  });
  app.get('/api/catalogjson-filtered', function(req, res) {
    res.json(catalogjsonfiltered);
  });
  app.get('/api/products-with-options', function(req, res) {
    res.json(newArr2);
  });
  app.get('/api/options-list', function(req, res) {
    res.json(uniqueOptions);
  });
  app.get('/api/extrafilteredjson', function(req, res) {
    res.json(newArr3);
  });
}

// **************************************************************************************

let newArr = [];

const entries = Object.entries(catalogjson.Catalog.Item).forEach(entry => {

  let newItem = {
    "id": entry[1]._ID,
    "options": entry[1].ItemFieldOptions
  }

  newArr.push(newItem);

});

var catalogjsonfiltered = newArr;

// **************************************************************************************

var newArr2 = [];
var htmlArr;

const entries2 = catalogjsonfiltered.forEach(entry2 => {

  var optionsArr = entry2.options.Option;

  if(optionsArr !== undefined) {
    let newItem2 = {
      "id": entry2.id,
      "options": optionsArr
    }

      newArr2.push(newItem2);
  }

});

// **************************************************************************************

var newArr3 = [];
var optionsArr = [];
var optionValuesArr = [];

const entries3 = newArr2.forEach(entry3 => {

  for (var i = 0; i < entry3.options.length; i++) {
    // console.log(entry3.options[i].OptionValue);
    var optionValues = entry3.options[i].OptionValue;
    var keys = entry3.options[i];
    for( var j = 0; j < optionValues.length; j++) {
      var lastFive = optionValues[j]._Value.substring(optionValues[j]._Value.length - 5);
      // console.log(lastFive);
      if (lastFive === '.html' ) {
        optionsArr.push(optionValues[j]._Value);
        optionValuesArr.push({
          "html": optionsArr[optionsArr.length -1],
          "key": keys._Key
        });
      }
      
    }

    var optionValues = {
      "option": optionValuesArr
    }
    

  }

  newItem3 = {
    "id": entry3.id,
    "optionValues": optionValues,
  }
  optionValuesArr = [];

  newArr3.push(newItem3);

});

// console.log(newArr3);



var uniqueOptions = optionsArr.filter(function(item, index){
	return optionsArr.indexOf(item) >= index;
});