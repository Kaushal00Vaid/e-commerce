import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Calendar, User, MessageSquare } from "lucide-react";

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contacts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setMessages(res.data.contacts);
      } catch (err) {
        console.error("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-[#2E1A47] text-[#F3E5AB] p-6 pt-24 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 border-b border-[#D4AF37]/20 pb-6">
          <div className="p-3 bg-[#3D2459] rounded-lg border border-[#D4AF37]/20 shadow-lg">
            <Mail className="text-[#D4AF37]" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#F3E5AB]">
              Client Inquiries
            </h1>
            <p className="text-[#CAB8D9] text-sm mt-1">
              Review correspondence from the contact form
            </p>
          </div>
        </div>

        {/* Loading / Empty States */}
        {loading && (
          <div className="text-[#D4AF37] animate-pulse">
            Loading inquiries...
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="text-center py-20 bg-[#3D2459]/50 rounded-xl border border-dashed border-[#D4AF37]/30">
            <MessageSquare
              size={48}
              className="mx-auto text-[#D4AF37]/50 mb-4"
            />
            <p className="text-[#CAB8D9]">No new inquiries received.</p>
          </div>
        )}

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-[#3D2459] border border-[#D4AF37]/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition shadow-lg flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4 border-b border-[#D4AF37]/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2E1A47] rounded-full flex items-center justify-center text-[#D4AF37]">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F3E5AB]">{msg.name}</h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-[#D4AF37] hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#CAB8D9]/60 text-xs">
                  <Calendar size={12} />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1">
                <p className="text-[#CAB8D9] text-sm leading-relaxed whitespace-pre-wrap">
                  "{msg.message}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
