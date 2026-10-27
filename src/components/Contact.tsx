import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  Linkedin,
  Download,
  Send,
  ArrowUpRight,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { profileData } from "@/data/portfolioData";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resumeUrl = `${import.meta.env.BASE_URL}${profileData.resumeFileName}`;

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: profileData.primaryEmail,
      subValue: `Also reachable at ${profileData.secondaryEmail}`,
      href: `mailto:${profileData.primaryEmail}`,
      external: false,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/sahil-vaghela-ba4822250",
      subValue: "Professional network & career updates",
      href: profileData.linkedinUrl,
      external: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profileData.phone,
      subValue: profileData.location,
      href: profileData.phoneHref,
      external: false,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        to_name: formData.name,
        from_name: formData.name,
        from_email: formData.email,
        to_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        "service_6gyry2l",
        "template_zom0ui8",
        templateParams,
        "mNnRMvyiWf4VgOiRy"
      );

      toast({
        title: "Message sent",
        description: "Thank you for reaching out. I will respond shortly.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Delivery failed",
        description: `Please reach out directly at ${profileData.primaryEmail}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#080B10]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10151D] border border-[#1E2736] mb-4">
              <Mail className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#A4ADBB]">
                CONNECT &amp; COLLABORATE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F6FA]">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-[#A4ADBB] text-base sm:text-lg mt-3 max-w-2xl">
              Available for software engineering, real-time 3D, Unreal Engine /
              Unity, and XR development opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Channels + Download Resume Card */}
            <div className="lg:col-span-5 space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="surface-card surface-card-interactive rounded-xl p-4 flex items-start justify-between gap-4 group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF]"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="p-2.5 rounded-lg bg-[#151C27] border border-[#1E2736] text-[#4D8DFF] group-hover:border-[#4D8DFF]/40 transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-mono uppercase tracking-wider text-[#778294]">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-[#F4F6FA] truncate mt-0.5 group-hover:text-[#4D8DFF] transition-colors">
                          {item.value}
                        </p>
                        {item.subValue && (
                          <p className="text-xs text-[#778294] mt-0.5">
                            {item.subValue}
                          </p>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#778294] group-hover:text-[#4D8DFF] flex-shrink-0 mt-1" />
                  </a>
                );
              })}

              {/* Dedicated Resume Download Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#151C27] to-[#10151D] border border-[#4D8DFF]/35 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#4D8DFF]">
                    UPDATED RESUME (PDF)
                  </span>
                  <span className="font-mono text-[11px] text-[#778294]">
                    3+ Yrs Exp
                  </span>
                </div>
                <p className="text-sm text-[#A4ADBB] leading-relaxed">
                  Download my latest Software Developer resume covering Unreal
                  Engine 5 (C++), Unity (C#), XR, procedural geometry, and
                  Three.js projects.
                </p>
                <a
                  href={resumeUrl}
                  download="Sahil_Vaghela_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#4D8DFF] text-[#080B10] hover:bg-[#4D8DFF]/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* Right Column: Preserved EmailJS Contact Form */}
            <div className="lg:col-span-7 surface-card rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#F4F6FA] mb-2">
                Send a Direct Message
              </h3>
              <p className="text-sm text-[#A4ADBB] mb-6">
                Fill out the form below to send an inquiry directly to my inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#A4ADBB] mb-2"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#080B10] border-[#1E2736] text-[#F4F6FA] placeholder:text-[#778294] focus-visible:ring-[#4D8DFF]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#A4ADBB] mb-2"
                    >
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#080B10] border-[#1E2736] text-[#F4F6FA] placeholder:text-[#778294] focus-visible:ring-[#4D8DFF]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#A4ADBB] mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about the role, project, or technical challenge..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#080B10] border-[#1E2736] text-[#F4F6FA] placeholder:text-[#778294] focus-visible:ring-[#4D8DFF]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#4D8DFF] text-[#080B10] hover:bg-[#4D8DFF]/90 disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D8DFF]"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
