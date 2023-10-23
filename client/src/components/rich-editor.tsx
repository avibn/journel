"use client";

import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to prevent SSR errors
const ReactQuillComponent = dynamic(() => import("react-quill"), {
    ssr: false,
});

interface RichEditorProps {
    value: ReactQuill.ReactQuillProps["value"];
    onChange?: ReactQuill.ReactQuillProps["onChange"];
    theme?: "snow" | "bubble";
    isDisabled?: boolean;
}

export default function RichEditor({
    value,
    onChange = () => {},
    theme = "snow",
    isDisabled = false,
}: RichEditorProps) {
    return (
        <ReactQuillComponent
            theme={theme}
            value={value}
            onChange={onChange}
            readOnly={isDisabled}
        />
    );
}
