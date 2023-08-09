
const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '64ccbd9b8849d2f0b8fd30a3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in mi in nulla tempor aliquet eu ut felis. Aenean id egestas nibh. Integer volutpat neque id malesuada rutrum. Vestibulum a.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dotytixjw/image/upload/v1691419227/YelpCamp/phcdok9k9bsaf4uzejug.jpg',
                    filename: 'YelpCamp/phcdok9k9bsaf4uzejug'
                },
                {
                    url: 'https://res.cloudinary.com/dotytixjw/image/upload/v1691419225/YelpCamp/gpyzsdtqexr6ijvmomkf.jpg',
                    filename: 'YelpCamp/gpyzsdtqexr6ijvmomkf'
                }
            ]
        })
        await camp.save();
    }
}
   
seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database Closed');
});