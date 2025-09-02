import React, { useState } from "react";
import { Upload, DollarSign, MessageCircle, Send } from "lucide-react";

export function DepositForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setScreenshot(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement Supabase deposit submission
    console.log("Submitting deposit:", { amount, message, screenshot });

    setTimeout(() => {
      setLoading(false);
      setAmount("");
      setMessage("");
      setScreenshot(null);
      // Reset file input
      const fileInput = document.getElementById(
        "screenshot"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Make a Deposit
        </h1>
        <p className="mt-1 text-gray-600">
          Submit your deposit request with payment proof
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Deposit Form */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Deposit Amount (৳)
                </label>
                <div className="relative">
                  <DollarSign className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount in Taka"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="screenshot"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Payment Screenshot
                </label>
                <div className="relative">
                  <input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-3 transition-all duration-200 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <Upload className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
                </div>
                {screenshot && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ {screenshot.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Message to Admin
                </label>
                <div className="relative">
                  <MessageCircle className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full py-3 pl-10 pr-4 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add any additional information or notes..."
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Deposit Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-2 space-y-4">
          <div className="p-6 border border-blue-400 bg-blue-50 rounded-xl">
            <h3 className="mb-3 text-lg font-semibold text-blue-800">
              Payment Instructions
            </h3>
            <div className="space-y-3 text-sm text-blue-700">
              <div className="flex items-start">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  1
                </span>
                <p>Transfer the amount to our designated account</p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  2
                </span>
                <p>Take a screenshot of the successful transaction</p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  3
                </span>
                <p>
                  Fill out this form with the amount and upload the screenshot
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  4
                </span>
                <p>Wait for admin approval (usually within 24 hours)</p>
              </div>
            </div>
          </div>

          <div className="p-6 mx-auto border border-yellow-400 bg-yellow-50 rounded-xl">
            <h3 className="mb-3 text-lg font-semibold text-yellow-700">
              Account Details
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-yellow-800 border-collapse">
                <tbody>
                  <tr className="border-b border-yellow-200">
                    <th className="py-2 font-medium">Bank</th>
                    <td className="py-2">ABC Bank Ltd.</td>
                  </tr>
                  <tr className="border-b border-yellow-200">
                    <th className="py-2 font-medium">Account Name</th>
                    <td className="py-2">DashBoard Ltd.</td>
                  </tr>
                  <tr className="border-b border-yellow-200">
                    <th className="py-2 font-medium">Account Number</th>
                    <td className="py-2">1234567890</td>
                  </tr>
                  <tr>
                    <th className="py-2 font-medium">Routing Number</th>
                    <td className="py-2">123456789</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
