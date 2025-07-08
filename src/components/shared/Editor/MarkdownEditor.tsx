"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import TextEditorToolBar from "./Toolbar";

const MarkdownEditor = ({
  defaultValue,
  onChange,
  id,
}: {
  defaultValue?: string;
  onChange: (value: string) => void;
  id?: string;
}) => {
  const extensions = [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
      orderedList: {
        HTMLAttributes: { class: "list-decimal ml-3" },
      },
      bulletList: {
        HTMLAttributes: { class: "list-disc ml-10" },
      },
    }),
    Markdown,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),

    Highlight.configure({
      HTMLAttributes: {
        class: "highlighted-text",
      },
    }),
    ImageResize,

    Link.configure({
      // 🔗 Link extension'ı burada aktif hale getirildi
      openOnClick: true,
      autolink: true,
      linkOnPaste: true,
      HTMLAttributes: {
        class: "text-blue-600 underline",
      },
    }),
  ];

  const content = defaultValue || "";
  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.storage.markdown.getMarkdown());
    },
  });
                                                               
  return (
    <div className="border border-gray-200 rounded-md editor-wrapper">
      <TextEditorToolBar editor={editor} />
      <EditorContent id={id} editor={editor} className="cursor-text" />
    </div>
  );
};

export default MarkdownEditor;
