import type { EditorOptions } from "@tiptap/core";
export type UseExtensionsOptions = {
    /** Placeholder hint to show in the text input area before a user types a message. */
    placeholder?: string;
};
/**
 * A hook for providing a default set of useful extensions for the MUI-Tiptap
 * editor.
 */
export default function useExtensions({ placeholder }?: UseExtensionsOptions): EditorOptions["extensions"];
//# sourceMappingURL=useExtensions.d.ts.map