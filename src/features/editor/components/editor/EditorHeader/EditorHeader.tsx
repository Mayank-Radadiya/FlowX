import { EditorBreadcrumb } from "./EditorBreadcrumb";
import { EditorActions } from "./EditorActions";

interface EditorHeaderProps {
  workflowName: string;
  onRun?: () => void;
  onUpdateDetails?: () => void;
  workflowId: string;
}

export function EditorHeader({
  workflowName,
  onRun,
  workflowId,
}: EditorHeaderProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b bg-background/80 px-3">
      {/* Left - Back & Name */}
      <div className="flex items-center gap-2">
        <EditorBreadcrumb workflowName={workflowName} />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-1.5">
        <EditorActions workflowId={workflowId} onRun={onRun} />
      </div>
    </header>
  );
}

export default EditorHeader;
