import { createContext } from 'react'

export const HtmlContext = createContext<{
  onPreview: (url: string) => void
}>({ onPreview: () => {} })
