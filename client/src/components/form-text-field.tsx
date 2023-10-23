import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";

import { HTMLInputTypeAttribute } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface FormTextFieldProps {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder?: string;
    description: string;
    isTextArea?: boolean;
    inputType?: HTMLInputTypeAttribute;
}

export default function FormTextField({
    form,
    name,
    label,
    placeholder = "",
    description,
    isTextArea,
    inputType = "text",
}: FormTextFieldProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {isTextArea ? (
                            <Textarea placeholder={placeholder} {...field} />
                        ) : (
                            <Input
                                placeholder={placeholder}
                                {...field}
                                type={inputType}
                            />
                        )}
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
