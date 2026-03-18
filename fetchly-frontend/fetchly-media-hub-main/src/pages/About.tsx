import Layout from "@/components/Layout";

const About = () => (
  <Layout>
    <div className="container max-w-2xl py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">About Fetchly</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>Fetchly is a free online media downloader that lets you save videos, audio, and images from your favorite platforms — all from one place.</p>
        <p>We support YouTube, Instagram, TikTok, Twitter/X, and Pinterest. Our goal is to make downloading media as fast and simple as possible, with no signups, no ads, and no hassle.</p>
        <p>Built with simplicity in mind, Fetchly works beautifully on both desktop and mobile devices. Just paste a link, choose your format, and download.</p>
      </div>
    </div>
  </Layout>
);

export default About;
