"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [storedEmail, setStoredEmail] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setStoredEmail(storedEmail);
    if (storedEmail) {
      setEmail(storedEmail);
      setName(storedEmail.split("@")[0]); // Simple way to get a name from email
    }
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userEmail", email);
    setStoredEmail(email);
    setName(email.split("@")[0]);
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        prompt: `${prompt}. And use the filename as the email of user which is ${email}`,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setPageUrl(data.message.url);
      setPrompt("");
      setEmail("");
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

        {!storedEmail ? (
          <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email to get started"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
