export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Contact Us</h1>
        <p className="text-gray-600 mb-10">
          Have any questions or need help? Fill the form below and our team will
          reach out soon.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form Section */}
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-black focus:outline-none resize-none"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Get in Touch
              </h2>
              <p className="text-gray-600">
                You can also reach out to us directly through the following
                channels.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-full">📍</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Office Address
                </h3>
                <p className="text-gray-600">Model Town, Hisar, Haryana</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-full">📞</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-full">✉️</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@ewaste.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
