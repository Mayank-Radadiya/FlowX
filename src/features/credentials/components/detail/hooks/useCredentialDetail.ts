/**
 * useCredentialDetail Hook
 * Consolidates all state and logic for the credential detail page.
 * Reduces re-renders by grouping related state together.
 */

import { useCallback, useReducer } from "react";
import {
  useSuspenseCredentialById,
  useUpdateCredential,
  useRemoveCredential,
} from "@/features/credentials/hooks/use-credential";
import {
  getCredentialIcon,
  getCredentialLabel,
} from "../../lib/credential-utils";
import { PROVIDER_THEMES } from "../constants";

type DialogType = "edit" | "delete" | "reveal" | null;

interface State {
  activeDialog: DialogType;
  editName: string;
  editValue: string;
  showEditValue: boolean;
}

type Action =
  | { type: "OPEN_DIALOG"; dialog: DialogType; name?: string }
  | { type: "CLOSE_DIALOG" }
  | { type: "SET_EDIT_NAME"; value: string }
  | { type: "SET_EDIT_VALUE"; value: string }
  | { type: "TOGGLE_EDIT_VALUE" }
  | { type: "RESET_EDIT" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_DIALOG":
      return {
        ...state,
        activeDialog: action.dialog,
        ...(action.name && {
          editName: action.name,
          editValue: "",
          showEditValue: false,
        }),
      };
    case "CLOSE_DIALOG":
      return { ...state, activeDialog: null };
    case "SET_EDIT_NAME":
      return { ...state, editName: action.value };
    case "SET_EDIT_VALUE":
      return { ...state, editValue: action.value };
    case "TOGGLE_EDIT_VALUE":
      return { ...state, showEditValue: !state.showEditValue };
    case "RESET_EDIT":
      return { ...state, editName: "", editValue: "", showEditValue: false };
    default:
      return state;
  }
}

export function useCredentialDetail(credentialId: string) {
  const { data: credential } = useSuspenseCredentialById(credentialId);
  const { mutate: updateCredential, isPending: isUpdating } =
    useUpdateCredential();
  const { mutate: removeCredential, isPending: isRemoving } =
    useRemoveCredential();

  const [state, dispatch] = useReducer(reducer, {
    activeDialog: null,
    editName: credential.name,
    editValue: "",
    showEditValue: false,
  });

  // Derived values (no state, no re-renders)
  const Icon = getCredentialIcon(credential.type);
  const label = getCredentialLabel(credential.type);
  const theme = PROVIDER_THEMES[credential.type];

  // Actions
  const openEditDialog = useCallback(() => {
    dispatch({ type: "OPEN_DIALOG", dialog: "edit", name: credential.name });
  }, [credential.name]);

  const openDeleteDialog = useCallback(() => {
    dispatch({ type: "OPEN_DIALOG", dialog: "delete" });
  }, []);

  const openRevealDialog = useCallback(() => {
    dispatch({ type: "OPEN_DIALOG", dialog: "reveal" });
  }, []);

  const closeDialog = useCallback(() => {
    dispatch({ type: "CLOSE_DIALOG" });
  }, []);

  const setEditName = useCallback((value: string) => {
    dispatch({ type: "SET_EDIT_NAME", value });
  }, []);

  const setEditValue = useCallback((value: string) => {
    dispatch({ type: "SET_EDIT_VALUE", value });
  }, []);

  const toggleEditValue = useCallback(() => {
    dispatch({ type: "TOGGLE_EDIT_VALUE" });
  }, []);

  const handleSave = useCallback(() => {
    updateCredential(
      {
        id: credentialId,
        name: state.editName.trim() || credential.name,
        ...(state.editValue.trim() && { value: state.editValue.trim() }),
      },
      {
        onSuccess: () => {
          dispatch({ type: "CLOSE_DIALOG" });
          dispatch({ type: "RESET_EDIT" });
        },
      }
    );
  }, [
    credentialId,
    credential.name,
    state.editName,
    state.editValue,
    updateCredential,
  ]);

  const handleDelete = useCallback(() => {
    removeCredential({ id: credentialId });
  }, [credentialId, removeCredential]);

  return {
    // Data
    credential,
    Icon,
    label,
    theme,

    // State
    activeDialog: state.activeDialog,
    editName: state.editName,
    editValue: state.editValue,
    showEditValue: state.showEditValue,
    isUpdating,
    isRemoving,

    // Actions
    openEditDialog,
    openDeleteDialog,
    openRevealDialog,
    closeDialog,
    setEditName,
    setEditValue,
    toggleEditValue,
    handleSave,
    handleDelete,
  };
}
