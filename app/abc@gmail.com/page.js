export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
      <header className="w-full p-4 bg-gray-200">
        <nav className="max-w-4xl mx-auto flex justify-between">
          <div className="flex space-x-4">
            <a href="#" className="text-lg font-semibold">Home</a>
            <a href="#" className="text-lg font-semibold">Contact Us</a>
            <a href="#" className="text-lg font-semibold">About Us</a>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Hello World</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">AI Best Practices</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">Understand your audience and their needs</li>
            <li className="mb-2">Ensure transparency and fairness</li>
            <li className="mb-2">Continuously monitor and improve AI models</li>
            <li className="mb-2">Stay updated with latest AI trends</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
