import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] flex items-center justify-center p-6 pt-24">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#D4AF37] rounded-full blur-[150px] opacity-5"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-[#3D2459]/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-[#D4AF37]/20 overflow-hidden flex flex-col md:flex-row">
        {/* LEFT: Info Panel */}
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
                <div className="p-3 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]">
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
                <div className="p-3 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]">
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
                <div className="p-3 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#F3E5AB]">
                    Email
                  </h3>
                  <p className="text-[#CAB8D9] text-sm mt-1">
                    hindculturalcrafts@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Form Section */}
        <div className="w-full md:w-3/5 p-10 relative">
          {/* Success Overlay */}
          {status === "success" && (
            <div className="absolute inset-0 bg-[#3D2459] z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
              <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-[#D4AF37] w-10 h-10" />
              </div>
              <h2 className="text-3xl font-serif text-[#F3E5AB] mb-2">
                Message Sent
              </h2>
              <p className="text-[#CAB8D9]">
                Our concierge team will respond shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-[#D4AF37] underline underline-offset-4 hover:text-white"
              >
                Send another message
              </button>
            </div>
          )}

          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="text-[#D4AF37]" size={24} />
            <h1 className="text-2xl font-bold text-[#F3E5AB]">
              Send a Message
            </h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#D4AF37] text-xs font-bold uppercase tracking-wide mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-[#2E1A47] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F3E5AB] placeholder-[#CAB8D9]/30 h-40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition resize-none"
                placeholder="How can we assist you today?"
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                Failed to send message. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#D4AF37] text-[#2E1A47] py-4 rounded-lg font-bold text-lg hover:bg-[#C5A065] transition shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  {" "}
                  <Loader2 className="animate-spin" /> Sending...{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Send size={18} /> Send Message{" "}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
