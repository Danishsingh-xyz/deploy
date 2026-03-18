import Layout from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <div className="container max-w-2xl py-16 md:py-24">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
        <p>Your privacy is important to us. Fetchly does not collect, store, or share any personal data.</p>
        <p>We do not require account creation or login. No cookies are used for tracking purposes.</p>
        <p>URLs you paste are processed in real-time and are not stored on our servers.</p>
        <p>This policy may be updated from time to time. Last updated: March 2026.</p>
      </div>
    </div>
  </Layout>
);

export default Privacy;
