import React from "react";

const About = () => {
  return (
    <section className="text-gray-600 dark:bg-gray-800 body-font">
      <div className="container px-5 py-[89.5px] mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 dark:text-white mb-4">
            About SecureGen
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500 dark:text-gray-400">
            At SecureGen, we believe that robust online security should be
            accessible and effortless for everyone.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-yellow-500 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-5 flex-shrink-0">
              <i className="fa-solid fa-shield-halved fa-3x"></i>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium mb-3">
                Our Mission
              </h2>
              <p className="leading-relaxed text-base dark:text-gray-300">
                To empower individuals and businesses with advanced,
                user-friendly tools to protect their digital identities. We
                strive to eliminate password-related vulnerabilities and
                simplify security for all.
              </p>
            </div>
          </div>

          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-5 flex-shrink-0">
              <i className="fa-solid fa-screwdriver-wrench fa-3x"></i>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium mb-3">
                What We Offer
              </h2>
              <p className="leading-relaxed text-base dark:text-gray-300">
                SecureGen provides a robust password generator to create
                unbreakable passwords and a secure password manager to store and
                organize them. Our intuitive interface ensures a seamless
                experience for every user.
              </p>
            </div>
          </div>

          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-5 flex-shrink-0">
              <i className="fa-solid fa-globe fa-3x"></i>
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium mb-3">
                Our Vision
              </h2>
              <p className="leading-relaxed text-base dark:text-gray-300">
                To be the leading solution for personal and professional
                password management, fostering a world where data breaches due
                to weak passwords are a thing of the past.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
