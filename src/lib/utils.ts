import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatter = new Intl.ListFormat('id', {
  style: 'long',
  type: 'conjunction'
})

export function conjunction(param) {
  if (param) return formatter.format(param)
}
