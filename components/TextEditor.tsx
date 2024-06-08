"use client"
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import React from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor, Editor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

const content = `
  <h2 style="text-align: center;">Welcome to Mantine rich text editor</h2>
  <p>
    <code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. 
    <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:
  </p>
  <ul>
    <li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s></li>
    <li>Headings (h1-h6)</li>
    <li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li>
    <li>Ordered and bullet lists</li>
    <li>Text align</li>
    <li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li>
  </ul>
`;

const Demo: React.FC = () => {
  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Rich Text Editor</h2>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar className="flex flex-wrap items-center space-x-2 mb-4">
          <div className="flex space-x-1">
            <RichTextEditor.Bold className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Italic className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Underline className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Strikethrough className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.ClearFormatting className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Highlight className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Code className="p-2 rounded hover:bg-gray-200" />
          </div>
          <div className="flex space-x-1">
            <RichTextEditor.H1 className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.H2 className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.H3 className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.H4 className="p-2 rounded hover:bg-gray-200" />
          </div>
          <div className="flex space-x-1">
            <RichTextEditor.Blockquote className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Hr className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.BulletList className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.OrderedList className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Subscript className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Superscript className="p-2 rounded hover:bg-gray-200" />
          </div>
          <div className="flex space-x-1">
            <RichTextEditor.Link className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Unlink className="p-2 rounded hover:bg-gray-200" />
          </div>
          <div className="flex space-x-1">
            <RichTextEditor.AlignLeft className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.AlignCenter className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.AlignJustify className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.AlignRight className="p-2 rounded hover:bg-gray-200" />
          </div>
          <div className="flex space-x-1">
            <RichTextEditor.Undo className="p-2 rounded hover:bg-gray-200" />
            <RichTextEditor.Redo className="p-2 rounded hover:bg-gray-200" />
          </div>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content className="border rounded p-4 min-h-64"/>
      </RichTextEditor>
    </div>
  );
};

export default () => <MantineProvider><Demo /></MantineProvider>;
