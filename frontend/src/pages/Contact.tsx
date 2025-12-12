import { MapPin, Phone, Mail, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] flex items-center justify-center p-6 pt-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#D4AF37] rounded-full blur-[150px] opacity-5"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-[#3D2459]/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-[#D4AF37]/20 overflow-hidden flex flex-col md:flex-row">
        {/* LEFT: Contact Information (Darker/Gold Side) */}
        <div className="w-full md:w-2/5 bg-[#24123a] p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D4AF37]/20">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-6">
              Get in Touch
            </h2>
            <p className="text-[#CAB8D9] font-light leading-relaxed mb-10">
              We would love to hear from you. Whether it is a custom commission
              inquiry, support for an order, or just to say hello to our
              artisans.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-[#2E1A47] transition duration-300 text-[#D4AF37]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#F3E5AB]">
                    Address
                  </h3>
                  <p className="text-[#CAB8D9] text-sm mt-1">
                    Gujarati Building, Ghoda Chowk Jugsalai, Jamshedpur - 831006
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-[#2E1A47] transition duration-300 text-[#D4AF37]">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#F3E5AB]">
                    Phone
                  </h3>
                  <p className="text-[#CAB8D9] text-sm mt-1">+91 83404 80224</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-[#2E1A47] transition duration-300 text-[#D4AF37]">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#F3E5AB]">
                    Email
                  </h3>
                  <p className="text-[#CAB8D9] text-sm mt-1">
                    support@hindcrafts.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div className="mt-12 md:mt-0">
            <div className="h-[1px] w-full bg-gradient-to-r from-[#D4AF37]/50 to-transparent mb-4"></div>
            <p className="text-[#CAB8D9] text-xs uppercase tracking-widest">
              Monday - Saturday, 9am - 7pm
            </p>
          </div>
        </div>

        {/* RIGHT: Form Section */}
        <div className="w-full md:w-3/5 p-10">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="text-[#D4AF37]" size={24} />
            <h1 className="text-2xl font-bold text-[#F3E5AB]">
              Send a Message
            </h1>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#D4AF37] text-xs font-bold uppercase tracking-wide mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#2E1A47] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F3E5AB] placeholder-[#CAB8D9]/30 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[#D4AF37] text-xs font-bold uppercase tracking-wide mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#2E1A47] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F3E5AB] placeholder-[#CAB8D9]/30 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#D4AF37] text-xs font-bold uppercase tracking-wide mb-2">
                Message
              </label>
              <textarea
                className="w-full bg-[#2E1A47] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F3E5AB] placeholder-[#CAB8D9]/30 h-40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition resize-none scrollbar-thin scrollbar-thumb-[#D4AF37]/30"
                placeholder="How can we assist you today?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-[#2E1A47] py-4 rounded-lg font-bold text-lg hover:bg-[#C5A065] transition shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 group"
            >
              <Send
                size={18}
                className="group-hover:translate-x-1 transition"
              />{" "}
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
