import { useToast } from "@/components/ui/use-toast";

export default function useErrorToast() {
    const { toast, dismiss, toasts } = useToast();
    return {
        toastError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
            });
        },
        dismiss,
        toasts,
    };
}
