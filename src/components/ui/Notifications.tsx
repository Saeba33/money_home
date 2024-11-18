import { toast, Toaster } from "sonner";

const toastOptions = {
  position: "bottom-right" as const,
  richColors: true,
};

export const showSuccessNotification = (message: string) => {
  toast.success(message, toastOptions);
};

export const showWarningNotification = (message: string) => {
  toast.warning(message, toastOptions);
};

export const showDeleteNotification = (message: string) => {
  toast(message, {
    ...toastOptions,
    icon: "🗑️",
  });
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <Toaster position="bottom-right" richColors />
    </>
  );
};
