import Layout from "@/components/Layout";
import { Mail } from "lucide-react";

const Contact = () => (
  <Layout>
    <div className="container max-w-2xl py-16 md:py-24">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Contact Us</h1>
      <div className="rounded-xl border border-border bg-card p-8">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-muted-foreground">hello@fetchly.app</span>
        </div>
        <p className="text-sm text-muted-foreground">Have a question or suggestion? Drop us a line and we'll get back to you as soon as possible.</p>
      </div>
    </div>
  </Layout>
);

export default Contact;
