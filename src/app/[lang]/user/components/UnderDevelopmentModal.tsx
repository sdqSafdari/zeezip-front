"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Bell, Code, Construction, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface UnderDevelopmentModalProps {
    featureName?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function UnderDevelopmentModal({
                                          featureName = "This feature",
                                          open,
                                          onOpenChange,
                                      }: UnderDevelopmentModalProps) {
    const [email, setEmail] = useState("")
    const [notifyMe, setNotifyMe] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = () => {
        if (notifyMe && email) {
            // Here you would typically send this to your backend
            console.log("Notification request for:", email)
            setIsSubmitted(true)
        }
    }

    const controlledProps = open !== undefined ? { open, onOpenChange } : {}

    return (
        <Dialog {...controlledProps}>
            <DialogContent className="sm:max-w-md">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white shadow-lg">
                    <Construction className="h-6 w-6" />
                </div>
                <DialogHeader className="pt-8">
                    <DialogTitle className="text-center text-xl">Under Development</DialogTitle>
                    <DialogDescription className="text-center">
                        {featureName} is currently under development and will be available soon.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 rounded-full bg-blue-100 p-1">
                                <Code className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium">Development in Progress</h4>
                                <p className="text-sm text-muted-foreground">
                                    Our team is actively working on this feature. We're excited to bring it to you soon!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-6 rounded-lg border p-4">
                        <div className="flex flex-col items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                                <AlertCircle className="h-5 w-5 text-yellow-600" />
                            </div>
                            <p className="mt-2 text-xs text-center">In Development</p>
                        </div>
                        <div className="h-0.5 w-8 bg-gradient-to-r from-yellow-300 to-green-300"></div>
                        <div className="flex flex-col items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <Rocket className="h-5 w-5 text-green-600" />
                            </div>
                            <p className="mt-2 text-xs text-center">Coming Soon</p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                    {!isSubmitted && notifyMe ? (
                        <Button type="button" variant="outline" onClick={() => onOpenChange?.(false)}>
                            Cancel
                        </Button>
                    ) : (
                        <div></div>
                    )}

                    <Button
                        type="button"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                        onClick={() => {
                            if (notifyMe && !isSubmitted) {
                                handleSubmit()
                            } else {
                                onOpenChange?.(false)
                            }
                        }}
                    >
                        {notifyMe && !isSubmitted ? "Notify Me" : "Got it"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
