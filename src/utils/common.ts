import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const parseMarkdownToHTML = (note: string): string => {
    const result = marked.parse(note)
    return DOMPurify.sanitize(result as string)
}
