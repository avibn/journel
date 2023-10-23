import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormTextField from "@/components/form-text-field";
import RichEditor from "@/components/rich-editor";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    title: z
        .string()
        .min(3, {
            message: "Title must be at least 3 characters.",
        })
        .max(30, {
            message: "Title can be at most 30 characters.",
        }),
    content: z
        .string()
        .min(50, {
            message: "Content must be at least 50 characters.",
        })
        .max(4000, {
            message: "Content can be at most 4000 characters.",
        }),
});

export type JournalFormInput = z.infer<typeof formSchema>;

interface AddJournalFormProps {
    onSubmit: (values: JournalFormInput) => void;
    existingJournal?: JournalFormInput;
    onCancel?: () => void;
}

export default function AddJournalForm({
    onSubmit,
    existingJournal,
    onCancel,
}: AddJournalFormProps) {
    const [editorContent, setEditorContent] = useState(
        existingJournal?.content || ""
    );

    const form = useForm<JournalFormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: existingJournal ?? {
            title: "",
            content: "",
        },
    });

    const {
        formState: { errors },
    } = form;

    const handleSubmit = (data: any) => {
        form.setValue("content", editorContent);
        onSubmit(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
            >
                <FormTextField
                    form={form}
                    name="title"
                    label="Title"
                    placeholder="Today was a good day..."
                    description="This is the journal title."
                />
                <div className="space-y-3">
                    <label className="block font-medium text-gray-700">
                        Content
                    </label>
                    <RichEditor
                        value={editorContent}
                        onChange={(value) => {
                            form.setValue("content", value);
                            setEditorContent(value);
                        }}
                    />
                    {errors.content && (
                        <p className="text-sm font-medium text-destructive">
                            {errors.content.message}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {existingJournal ? "Edit" : "Add"}
                    </Button>
                    {onCancel && (
                        <Button variant="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
