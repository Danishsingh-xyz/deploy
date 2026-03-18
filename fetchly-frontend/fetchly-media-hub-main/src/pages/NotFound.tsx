import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => (
  <Layout>
    <div className="container flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:brightness-110">
        Go Home
      </Link>
    </div>
  </Layout>
);

export default NotFound;
