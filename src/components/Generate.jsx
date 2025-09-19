import React, { useState, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";

const Generate = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset.length === 0) {
      toast.error("Please select at least one character type.");
      setPassword("");
      return;
    }

    let generatedPass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPass += charset[randomIndex];
    }
    setPassword(generatedPass);
    toast.success("Password generated!");
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  const copyToClipboard = useCallback(() => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!");
    } else {
      toast.error("No password to copy!");
    }
  }, [password]);

  return (
    <section className="text-gray-600 dark:bg-gray-800 body-font min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto flex flex-col px-5 py-12 lg:py-24 items-center justify-center">
        <div className="shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3),inset_0px_-2px_6px_0px_rgba(10,37,64,0.35)] bg-white dark:bg-gray-900 rounded-lg  p-8 flex flex-col w-full md:w-3/4 lg:w-1/2 mt-10 md:mt-0 relative z-10">
          <h2 className="text-gray-900 dark:text-white text-lg font-medium title-font mb-5 text-center">
            Generate a Secure Password
          </h2>

          <div className="relative mb-4">
            <input
              type="text"
              readOnly
              value={password}
              className="w-full bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-800 text-base outline-none text-gray-700 dark:text-gray-200 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Your new password will appear here"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-0 top-0 h-full px-4 text-white bg-yellow-500 rounded-r-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-yellow-400"
            >
              Copy
            </button>
          </div>

          <div className="mb-4">
            <label
              htmlFor="length"
              className="leading-7 text-sm text-gray-600 dark:text-gray-300"
            >
              Password Length: <span className="font-bold">{length}</span>
            </label>
            <input
              type="range"
              id="length"
              min="6"
              max="30"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-yellow-500"
            />
          </div>

          <div className="flex flex-wrap justify-between mb-6">
            <div className="w-1/2 sm:w-1/4 mb-2 flex items-center">
              <input
                type="checkbox"
                id="uppercase"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2"
              />
              <label
                htmlFor="uppercase"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Uppercase
              </label>
            </div>
            <div className="w-1/2 sm:w-1/4 mb-2 flex items-center">
              <input
                type="checkbox"
                id="lowercase"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2"
              />
              <label
                htmlFor="lowercase"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Lowercase
              </label>
            </div>
            <div className="w-1/2 sm:w-1/4 mb-2 flex items-center">
              <input
                type="checkbox"
                id="numbers"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2"
              />
              <label
                htmlFor="numbers"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Numbers
              </label>
            </div>
            <div className="w-1/2 sm:w-1/4 mb-2 flex items-center">
              <input
                type="checkbox"
                id="symbols"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-yellow-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2"
              />
              <label
                htmlFor="symbols"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Symbols
              </label>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg transition-colors duration-200"
          >
            Generate Password
          </button>
        </div>

        <div className="text-center w-full lg:w-3/4 mt-16">
          <h2 className="text-3xl font-medium title-font text-gray-900 dark:text-white mb-4">
            Your First Line of Digital Defense
          </h2>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500 dark:text-gray-400">
            In the digital age, a strong password is not just a suggestion—it's
            essential. Here's why using a unique, complex password for every
            account is crucial for your online security.
          </p>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 mt-8">
            {/* Card 1 */}
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 dark:bg-gray-900 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium text-gray-900 dark:text-white">
                  Prevent Credential Stuffing
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 dark:bg-gray-900 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium text-gray-900 dark:text-white">
                  Stop Brute-Force Attacks
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 dark:bg-gray-900 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium text-gray-900 dark:text-white">
                  Safeguard Personal Information
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 dark:bg-gray-900 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium text-gray-900 dark:text-white">
                  Protect Your Digital Identity
                </span>
              </div>
            </div>
          </div>
          <p className="mt-8 text-lg text-gray-700 dark:text-gray-300">
            Use this tool to generate strong, random passwords and take a simple
            but powerful step towards better online security.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Generate;
