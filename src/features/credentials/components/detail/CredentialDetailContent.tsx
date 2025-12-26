/**
 * CredentialDetailContent Component
 * Main content component that composes all parts.
 * Uses custom hooks for optimized state management.
 */

"use client";

import { useCredentialDetail } from "./hooks/useCredentialDetail";
import { CredentialHeader } from "./ui/CredentialHeader";
import { CredentialProfileCard } from "./ui/CredentialProfileCard";
import { EditCredentialDialog } from "./dialogs/EditCredentialDialog";
import { DeleteCredentialDialog } from "./dialogs/DeleteCredentialDialog";
import { RevealKeyDialog } from "./dialogs/RevealKeyDialog";

interface CredentialDetailContentProps {
  credentialId: string;
}

export function CredentialDetailContent({
  credentialId,
}: CredentialDetailContentProps) {
  const {
    credential,
    Icon,
    label,
    theme,
    activeDialog,
    editName,
    editValue,
    showEditValue,
    isUpdating,
    isRemoving,
    openEditDialog,
    openDeleteDialog,
    openRevealDialog,
    closeDialog,
    setEditName,
    setEditValue,
    toggleEditValue,
    handleSave,
    handleDelete,
  } = useCredentialDetail(credentialId);

  return (
    <div className="w-[500px] mx-auto space-y-6">
      <CredentialHeader onEdit={openEditDialog} onDelete={openDeleteDialog} />

      <CredentialProfileCard
        credential={credential}
        Icon={Icon}
        label={label}
        theme={theme}
        onRequestReveal={openRevealDialog}
      />

      {/* Dialogs */}
      <RevealKeyDialog
        credentialId={credentialId}
        open={activeDialog === "reveal"}
        onOpenChange={(open) => !open && closeDialog()}
      />

      <EditCredentialDialog
        open={activeDialog === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        editName={editName}
        editValue={editValue}
        showValue={showEditValue}
        isUpdating={isUpdating}
        onNameChange={setEditName}
        onValueChange={setEditValue}
        onToggleValue={toggleEditValue}
        onSave={handleSave}
      />

      <DeleteCredentialDialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        credentialName={credential.name}
        isDeleting={isRemoving}
        onDelete={handleDelete}
      />
    </div>
  );
}
