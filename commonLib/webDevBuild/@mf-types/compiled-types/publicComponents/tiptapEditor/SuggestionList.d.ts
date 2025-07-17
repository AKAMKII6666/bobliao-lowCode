import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import type { MentionSuggestion } from "./mentionSuggestionOptions";
export type SuggestionListRef = {
    onKeyDown: NonNullable<ReturnType<NonNullable<SuggestionOptions<MentionSuggestion>["render"]>>["onKeyDown"]>;
};
export type SuggestionListProps = SuggestionProps<MentionSuggestion>;
declare const SuggestionList: import("react").ForwardRefExoticComponent<SuggestionListProps & import("react").RefAttributes<SuggestionListRef>>;
export default SuggestionList;
//# sourceMappingURL=SuggestionList.d.ts.map