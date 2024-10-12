"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [storedName, setStoredName] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setStoredName(storedName);
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const _name = name.toLowerCase().replace(/ /g, "-");
    localStorage.setItem("userName", _name);
    setStoredName(_name);
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        prompt: `${prompt}. And use the filename as the name of user which is ${name}`,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setPageUrl(data.message.url);
      setPrompt("");
      setName("");
    } else {
      alert("The prompt is invalid, please try again");
      console.error(response);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Landing Page Creator
        </h1>

        {!storedName ? (
          <form onSubmit={handleNameSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your name to get started"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Get Started
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <p className="text-lg text-center text-gray-700">
              Welcome, {name}!
            </p>

            {pageUrl ? (
              <div className="mt-8 space-y-6">
                <p className="text-lg text-center text-gray-700">
                  <a href={pageUrl} target="_blank" rel="noopener noreferrer">
                    Click here to view your landing page
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handlePromptSubmit} className="space-y-4">
                <div>
                  <label htmlFor="prompt" className="sr-only">
                    Enter your prompt
                  </label>
                  <textarea
                    id="prompt"
                    name="prompt"
                    rows="5"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter a prompt to create a landing page"
                    defaultValue={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Creating..." : "Create Landing Page"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
