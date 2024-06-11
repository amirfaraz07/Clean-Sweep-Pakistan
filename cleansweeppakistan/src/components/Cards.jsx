import React from 'react';
import c1 from '../images/c1.jpg';
import c2 from '../images/c2.jpg';
import c3 from '../images/c3.jpg';

const cardData = [
  {
    image: c1,
    title: "Roadside Waste Disposal",
    description: "Sweeper's only pay visit in early morning or no visit for several days which leads to dispose garbage on road sides."
  },
  {
    image: c2,
    title: "Garbage Collection Delay",
    description: "Delays in garbage collection disrupt the cleanliness of neighborhoods, contributing to health hazards and community dissatisfaction."
  },
  {
    image: c3,
    title: "Sweeper Frequent Visits",
    description: "Frequent visits by sweepers has delayed garbage collection due to which some people dispose waste on the road side. "
  }
];

const Card = ({ image, title, description }) => (
  <div className="w-80 p-4 rounded-lg border-y shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
    <img className="w-full h-40 object-cover rounded-t-lg" alt="Card Image" src={image} />
    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Cards = () => {
  return (
  <div className='py-5 px-20'>
    <h2 className="text-4xl font-semibold text-center mb-5">Reason</h2>
    <div className='flex justify-center space-x-[8%]'>
      {cardData.map((card, index) => (
        <Card 
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  </div>
)};

export default Cards;