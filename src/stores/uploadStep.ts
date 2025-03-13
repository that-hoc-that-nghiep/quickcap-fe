import { create } from 'zustand'
import { useEffect } from 'react'

interface UploadStepStore {
    step: number
    min: number
    max: number
    handlers: {
        increment: () => void
        decrement: () => void
        set: (value: number) => void
    }
}

const useUploadStepStore = create<UploadStepStore>((set) => ({
    step: 0,
    min: 0,
    max: 3,
    handlers: {
        increment: () =>
            set((state) => {
                if (state.step < state.max) {
                    return { step: state.step + 1 }
                }
                return state
            }),
        decrement: () =>
            set((state) => {
                if (state.step > state.min) {
                    return { step: state.step - 1 }
                }
                return state
            }),
        set: (value) => set({ step: value })
    }
}))

export const useUploadStep = (initialValue?: number, options?: Partial<{ min: number; max: number }> | undefined) => {
    // Use the store as a hook to subscribe to changes
    const step = useUploadStepStore((state) => state.step)
    const handlers = useUploadStepStore((state) => state.handlers)

    // Initialize values using useEffect to avoid redundant updates
    useEffect(() => {
        if (initialValue !== undefined) {
            handlers.set(initialValue)
        }
    }, [initialValue, handlers])

    useEffect(() => {
        if (options?.min !== undefined) {
            useUploadStepStore.setState({ min: options.min })
        }
        if (options?.max !== undefined) {
            useUploadStepStore.setState({ max: options.max })
        }
    }, [options])

    return [step, handlers] as const
}
