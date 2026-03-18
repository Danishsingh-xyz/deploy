import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

const ToolCard = ({ tool }: { tool: Tool }) => {
  const Icon = tool.icon;
  return (
    <Link
      to={tool.path}
      className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 card-hover"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{tool.name}</h3>
        <p className="text-sm text-muted-foreground">{tool.description}</p>
      </div>
      <div className="mt-auto flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Try now <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
};

export default ToolCard;
