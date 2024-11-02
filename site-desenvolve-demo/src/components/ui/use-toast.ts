"use client"

import * as React from "react"

type ToastProps = {
  id?: string | number
  title?: string
  description?: string
  action?: React.ReactNode
}

type ToastContextType = {
  toasts: ToastProps[]
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = React.useCallback((props: ToastProps) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { ...props, id }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const toast = (props: ToastProps) => {
  const context = React.useContext(ToastContext)
  if (!context) {
    console.warn("toast() called outside provider")
    return
  }
  context.toast(props)
}