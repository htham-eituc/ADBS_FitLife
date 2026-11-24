import type { ReactNode } from "react";
import { Toast } from "@base-ui/react/toast";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "@/icons/x";

function ToastViewport() {
  const { toasts } = Toast.useToastManager();
  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed top-5 right-4 z-[100] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-3 outline-none">
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            render={<Card size="sm" />}
            className="relative gap-1 pr-12 shadow-lg transition-opacity duration-500 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[limited]:hidden motion-reduce:transition-none"
          >
            <Toast.Title
              render={
                <CardTitle className="mb-0 text-sm font-semibold text-brand-600 dark:text-brand-400" />
              }
            />
            <Toast.Description render={<CardDescription />} />
            <Toast.Close
              aria-label="Đóng thông báo"
              render={
                <Button
                  size="icon-xs"
                  variant="ghost"
                  className="absolute top-3 right-3"
                  aria-label="Đóng thông báo"
                />
              }
            >
              <XIcon />
            </Toast.Close>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider timeout={3000} limit={3}>
      {children}
      <ToastViewport />
    </Toast.Provider>
  );
}

export { ToastProvider };
