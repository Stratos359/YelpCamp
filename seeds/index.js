const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6044a6fec0b724300c7e6450',
            location: ''+cities[random1000].city+', '+cities[random1000].state+'',
            title: ''+sample(descriptors)+' '+sample(places)+'',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit,Reiciendis maiores excepturi placeat perspiciatis provident quisquam, natus totam delectus, nihil accusantium neque eius odit atque nisi. Reiciendis veritatis enim temporibus consequatur.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dvyewdj6e/image/upload/v1615217226/YelpCamp/h85ybrmcnv3tz28wvk4d.jpg',
                  filename: 'YelpCamp/h85ybrmcnv3tz28wvk4d'
                },
                {
                  url: 'https://res.cloudinary.com/dvyewdj6e/image/upload/v1615217226/YelpCamp/n41m2erkzgyjfhz8th1c.jpg',
                  filename: 'YelpCamp/n41m2erkzgyjfhz8th1c'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
})