'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000, // <== distance value was missing in subject, I  edited it to be 1000
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];


function TimeDifference(start, end)
{
  var date1 = new Date(start);
  var date2 = new Date(end);

  // Time difference between dates 
  var DifferenceInTime = date2 - date1;

  // Converted to days 
  //+ 1 because even if pick up and return are the same date
  // it still counts as 1 day of rental
  var DifferenceInDays =1+ DifferenceInTime / (1000 * 3600 * 24); 

return DifferenceInDays;
}

function NumberOfDays(rental)
{
var TimeDiff= TimeDifference(rental.pickupDate, rental.returnDate);
return TimeDiff;
}

function AdditionalCharge(rental)
{
  var additionalCharge=0;
  if (rental.options.deductibleReduction==true)
      {
        var rentalDays= NumberOfDays(rental);
        additionalCharge= 4*rentalDays;
      }
  return additionalCharge;
}

function SetCarsAndRentals()
{
  for(const rental of rentals)
  {
    var rentalDays;
    var PricePerDay;
    var Time_component;

    var Distance;
    var PricePerDistance;
    var Distance_component;


    console.log("\n\nReturn date: "+rental.returnDate);
    console.log("Pick up date: "+rental.pickupDate);

    rentalDays= NumberOfDays(rental);
    console.log( "Nb of days: "+rentalDays );

    Distance = rental.distance;

    for(const car of cars)
    {
      if (rental.carId=== car.id)
      {
        PricePerDay = car.pricePerDay;
        console.log("Price of car per day: "+ PricePerDay)

        Time_component=  rentalDays*PricePerDay;
        console.log("Time Component: "+ Time_component);

        PricePerDistance=car.pricePerKm;
        console.log("Price per distance: "+ PricePerDistance)

       Distance_component = PricePerDistance*Distance;
        console.log("Distance component: "+Distance_component);

        rental.price = Time_component + Distance_component;
        console.log("Rental Price without discount: "+rental.price);
      
        // Price reduction according to rental days
        if( rentalDays>10)
        {
        rental.price*=0.5;
        }
        else if( rentalDays>4)
        {
        rental.price*=0.7;
        }
        else if(rentalDays>1)
        {
        rental.price *= 0.9;        
        }
      
        console.log("Rental Price after discount: "+ rental.price);

        var Commission = Number ( ( rental.price * 0.3).toFixed(2) );
      
        console.log( "Commission: " + Commission );

        rental.commission.insurance= Number ( (0.5*Commission).toFixed(2) );
        console.log("\tInsurance: "+ rental.commission.insurance);

        rental.commission.treasury = rentalDays;
        console.log("\tTreasury: "+ rental.commission.treasury);

        rental.commission.virtuo= Number ( (Commission- rental.commission.insurance - rental.commission.treasury).toFixed(2) );
        console.log("\tVirtuo:" + rental.commission.virtuo);

        var additionalCharge = AdditionalCharge(rental);
        if (additionalCharge>0)
        {
         console.log("Additional charge (deductible): "+ additionalCharge);
         rental.price+= additionalCharge;
         console.log("New rental price with deductible option included: "+ rental.price); 
        }

      }
    }

  console.log("\n--------------------------\n");
  }
}


function SetActorsAmounts()
{
  for(const actor of actors)
  {
    var rental = rentals.find(rental => rental.id == actor.rentalId);

    var additionalCharge= AdditionalCharge(rental);

    actor.payment[0].amount=rental.price;

    var commission = rental.commission.virtuo + rental.commission.treasury+ rental.commission.insurance;

    actor.payment[1].amount= rental.price - additionalCharge- commission;

    actor.payment[2].amount= rental.commission.insurance;

    actor.payment[3].amount= rental.commission.treasury;

    actor.payment[4].amount= rental.commission.virtuo + additionalCharge;

  }
  ReadActorsAmounts();
}

function ReadActorsAmounts()
{
  
  for(const actor of actors)
  {
    console.log("\n--------------------------\n")
    for(var i=0; i<5; i++)
    {
     console.log("\tWho: "+actor.payment[i].who); 
     console.log("\t\t=> type & amount: "+actor.payment[i].type +" of "+actor.payment[i].amount+"\n");
    }
    
  }
}


SetCarsAndRentals();
SetActorsAmounts();

console.log(cars);
console.log(rentals);
console.log(actors);
