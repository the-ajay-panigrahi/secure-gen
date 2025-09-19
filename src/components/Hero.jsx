import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[84.5vh] text-gray-600 dark:bg-slate-950 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-md lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded-xl overflow-hidden"
            alt="hero"
            src="/hero-img.png"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
            SecureGen - Your Ultimate Password Generator & Manager
          </h1>
          <p className="mb-8 leading-relaxed dark:text-gray-300">
            SecureGen is a cutting-edge password generator and manager designed
            to enhance your online security. With SecureGen, you can
            effortlessly create strong, unique passwords for all your accounts
            and store them securely in one place. Say goodbye to password
            fatigue and hello to peace of mind with SecureGen.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              <Link to="/signup">Get Started</Link>
            </button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 rounded text-lg">
              <Link to="/about">Learn More</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
