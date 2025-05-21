import { ResearchPaperCard } from "./ResearchPaperCard";

export default function ResearchPapersList({ papers }: { papers: any[] }) {
  return (
    <div className="space-y-4">
      {papers.map((paper, index) => (
        <ResearchPaperCard key={index} paper={paper} />
      ))}
    </div>
  );
}
