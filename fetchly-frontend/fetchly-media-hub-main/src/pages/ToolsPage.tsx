import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

const ToolsPage = () => (
  <Layout>
    <div className="container py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-3">All Tools</h1>
      <p className="text-center text-muted-foreground mb-10">Choose a platform to get started</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
      </div>
    </div>
  </Layout>
);

export default ToolsPage;
