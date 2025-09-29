"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import {
  Zap,
  CheckCircle,
  Mail,
  ArrowRight,
  X,
  LucideIcon,
  Bell,
  DollarSign,
  Users,
} from "lucide-react";
import { WaitlistForm } from "./Waitlist";
import { Button } from "./Waitlist";

{
  /*
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <App/>
    </div>
  );
}
  */
}

interface SubmissionState {
  state: "idle" | "submitting" | "success" | "error";
  message: string;
}
interface FeatureItem {
  icon?: any;
  title: string;
  description: string;
  color: string;
}

type FAQItem = {
  question: string;
  answer: string;
};

const App: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionState>({
    state: "idle",
    message: "",
  });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // State for FAQ accordion

  const handleSuccess = (email: string) => {
    setSubmissionStatus({
      state: "success",
      message: `Success! ${email} has been added to our exclusive list. We'll be in touch soon.`,
    });
  };

  const handleError = (errorMsg: string) => {
    setSubmissionStatus({
      state: "error",
      message: `Oops! Submission failed: ${errorMsg}. Please try again.`,
    });
  };

  const Features: FeatureItem[] = [
    {
      icon: Users,
      title: "Secure campus exchange",
      description:
        " Buy and sell anything from furniture electonics and concert tickets connecting buyer and sellers",
      color: "text-amber-400",
    },
    {
      icon: CheckCircle,
      title: "Transaction payment",
      description:
        "Recieves payments and trasaction in real time , building the bridge between a buyer and seller",
      color: "text-emerald-400",
    },
    {
      icon: Mail,
      title: "Priority Access",
      description: "Get notified on orders , payment and transactions in real time.",
      color: "text-blue-400",
    },
  ];

  const FAQs: FAQItem[] = [
    {
      question: "What is the timeline for the full launch?",
      answer:
        "We are targeting a full public release in Q3 of this year. Waitlist members will receive early access invitations starting next month.",
    },
    {
      question: "What kind of items can i list in the marketplace?",
      answer:
        "You can list almost anything student-relevant: furniture, textbooks , tickets",
    },
    {
      question: "How is this different from existing solutions?",
      answer:
        "Our platform leverages generative AI for personalized listing products, something no other current solution offers at scale. It's built for speed and integration, allowing buyers and seller to meet strictly for university students",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-3 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Effect: Radial Gradient (Subtle) */}

      {/* Main Content Card (Unique & Modern Design with Glow and Expanded Padding) */}
      <main
        className="relative z-10 w-full max-w-4xl lg:max-w-6xl pt-3 p-6 sm:p-12 lg:p-20 xl:p-20 bg-zinc-900/90  backdrop-blur-xl border border-zinc-800/50 rounded-3xl 
        space-y-12 animate-in fade-in duration-700"
      >
        {/* Header */}
        <header className="flex justify-between items-center pb-5 border-b border-zinc-800">
          <div className="flex items-center text-2xl font-bold tracking-tight text-sky-400">
            <Zap className="h-6 w-6 mr-2 text-purple-400" />
            Trovo
          </div>
          <Button
            variant="secondary"
            size="default"
            onClick={() => console.log("Learn More clicked")}
            className="hidden sm:flex"
          >
            <span className="text-white">Learn More</span>
          </Button>
        </header>

        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400">
            Unleash the Future of Digital Experience
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Get exclusive, priority access to our upcoming platform. This isn't
            just an update—it's a revolution.
          </p>
        </section>

        {/* Waitlist Form Section */}
        <section className="max-w-xl mx-auto pt-6">
          {submissionStatus.state === "idle" && (
            <WaitlistForm onSuccess={handleSuccess} onError={handleError} />
          )}

          {/* Submission Status Message */}
          {submissionStatus.state !== "idle" && (
            <div
              className={`p-4 rounded-xl flex items-start space-x-3 transition-all duration-300 ${
                submissionStatus.state === "success"
                  ? "bg-emerald-900/50 border border-emerald-500 text-emerald-300"
                  : "bg-red-900/50 border border-red-500 text-red-300"
              }`}
              role="alert"
            >
              {submissionStatus.state === "success" ? (
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
              ) : (
                <X className="h-6 w-6 flex-shrink-0" />
              )}
              <p className="text-sm font-medium flex-grow">
                {submissionStatus.message}
              </p>
              <button
                onClick={() =>
                  setSubmissionStatus({ state: "idle", message: "" })
                }
              >
                <X className="h-4 w-4 opacity-70 hover:opacity-100 transition-opacity" />
              </button>
            </div>
          )}

          <p className="text-center text-sm text-zinc-500 mt-4">
            Join 1,200+ early adopters already on the list.
          </p>
        </section>

        {/* --- Gradient Separator --- */}
        <div className="relative h-12 my-8">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-sky-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
        </div>
        {/* --------------------------- */}

        {/* Feature Grid (Centered, Colorful Icons with Glow) */}
        <section className="grid md:grid-cols-3 gap-8 pt-8">
          {Features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl shadow-xl transition-transform duration-300 hover:shadow-sky-500/20 hover:-translate-y-1 text-center"
            >
              {/* Icon Container with individual color and glow */}
              <div
                className={`mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full ${feature.color} shadow-lg shadow-current/0`}
              >
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{feature.title} </h3>
              <p className="text-zinc-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* --- FAQ Section --- */}
        <section className="pt-12 space-y-6">
          <h2 className="text-3xl font-bold text-center text-white pb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQs.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-700 bg-zinc-800/50 overflow-hidden shadow-md"
              >
                {/* Question Header (Button) */}
                <button
                  className="w-full text-left p-4 flex justify-between items-center text-lg font-medium text-white hover:bg-zinc-700/50 transition-colors duration-200"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span>{item.question}</span>
                  <ArrowRight
                    className={`h-5 w-5 transform transition-transform duration-300 ${
                      openFAQ === index
                        ? "rotate-90 text-sky-400"
                        : "rotate-0 text-zinc-400"
                    }`}
                  />
                </button>

                {/* Answer Content (Accordion) */}
                {openFAQ === index && (
                  <div className="p-4 pt-0 text-zinc-400 text-sm animate-in fade-in slide-in-from-top-1 duration-300">
                    <p className="border-t border-zinc-700 pt-3">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer/Legal */}
        <footer className="pt-6 border-t border-zinc-800 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} The Trovo Project. All rights reserved. |
          Privacy Policy
        </footer>
      </main>
    </div>
  );
};

export default App;
