"use client";
import React, { useState, useEffect, useTransition } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../../components/ui/button";
import { writeToDB } from "@/server/actions/write-to-db";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Spinner } from "@/components/spinner";

export default function RichTextEditor() {
  // States
  const [content, setContent] = useState<string>("");
  // Transition
  const [isPending, startTransition] = useTransition();
  // Effect
  useEffect(() => {
    // ! We have an error for loading the editor in Nextjs  (first waiting to window be load)
    // ! Using useRef not works => onInit={(_evt, editor) => editorRef.current = editor}
    // ! Maybe we need our react version be less than 19 ⬇️
    // !@tinymce/tinymce-react 6.0.0
    // ! ├── ✕ unmet peer react@"^18.0.0 || ^17.0.1 || ^16.7.0": found 19.0.0
    if (!window) return;
  }, [window]);
  // functions
  const saveContent = () => {
    startTransition(async () => {
      await writeToDB({
        uuid: nanoid(),
        content,
        datetime: Date.now().toString(),
      }).then((res) => {
        if (res?.data?.success) {
          return toast("متن با موفقیت ذخیره شد", {
            position: "top-right",
          });
        }
        toast("مشکل در ذخیره سازی متن", {
          position: "top-right",
        });
      });
    });
  };
  return (
    <div className='flex flex-col justify-center items-start gap-3 p-3'>
      <Editor
        // ! free plan API key this have AI no need it anyway
        apiKey='oqytw46gnf1866kx9hwtxb594v5q0xxc0icgqt38wz89h3xu'
        init={{
          height: 630,
          content_css: "tinymce-5-dark",
          plugins: [
            // Core editing features
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Mar 8, 2025:
            "checklist",
            "mediaembed",
            "casechange",
            "export",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "advtemplate",
            // "ai",
            "mentions",
            "tinycomments",
            "tableofcontents",
            "footnotes",
            "mergetags",
            "autocorrect",
            "typography",
            "inlinecss",
            "markdown",
            "importword",
            "exportword",
            "exportpdf",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          // ai_request: (_: any, respondWith: any) =>
          //   respondWith.string(() =>
          //     Promise.reject("See docs to implement AI Assistant"),
          //   ),
        }}
        initialValue=''
        onChange={(e) => setContent(e.target.getContent())}
      />
      <Button
        type='button'
        disabled={isPending}
        className='flex justify-center items-center gap-1 text-xl'
        onClick={saveContent}>
        <Spinner
          size='large'
          className='text-blue-600 dark:text-blue-300'
          show={isPending}
        />
        ذخیره کردن متن
        <Save className='scale-150' />{" "}
      </Button>
    </div>
  );
}
