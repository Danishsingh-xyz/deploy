import Layout from "@/components/Layout";

const Terms = () => (
  <Layout>
    <div className="container max-w-2xl py-16 md:py-24">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Terms of Service</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
        <p>By using Fetchly, you agree to the following terms.</p>
        <p>Fetchly is provided as-is for personal use. You are responsible for ensuring you have the right to download any content.</p>
        <p>We do not host any media files. All downloads are fetched directly from the original platform.</p>
        <p>We reserve the right to modify or discontinue the service at any time without notice.</p>
      </div>
    </div>
  </Layout>
);

export default Terms;
