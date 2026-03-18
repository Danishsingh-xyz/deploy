import Layout from "@/components/Layout";
import UrlInput from "@/components/UrlInput";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";
import { ClipboardPaste, Search, Download } from "lucide-react";

const steps = [
  { icon: ClipboardPaste, title: "Paste the Link", desc: "Copy the media URL from any supported platform and paste it into the input box." },
  { icon: Search, title: "Detect the Media", desc: "Fetchly automatically detects the platform and fetches available download options." },
  { icon: Download, title: "Download Instantly", desc: "Choose your preferred quality or format and download the media in seconds." },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="container py-20 md:py-32 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 animate-fade-in">
        Download Media From Any
        <br />
        <span className="text-gradient">Platform Instantly</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        Paste a link and download videos, audio, or thumbnails in seconds.
      </p>
      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <UrlInput />
      </div>
    </section>

    {/* Tools Grid */}
    <section className="container pb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">All Tools</h2>
      <p className="text-center text-muted-foreground mb-10">Choose a platform to get started</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>

    {/* How It Works */}
    <section className="container pb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center rounded-xl border border-border bg-card p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
              <step.icon className="h-7 w-7 text-primary" />
            </div>
            <div className="text-xs font-semibold text-primary mb-2">Step {i + 1}</div>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Index;
