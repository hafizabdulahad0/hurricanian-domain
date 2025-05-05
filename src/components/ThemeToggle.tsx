
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

type Theme = 'dark' | 'light' | 'system'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement
    
    if (newTheme === 'dark' || 
        (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return (
    <Toggle onClick={toggleTheme} aria-label="Toggle theme" className="border border-input">
      {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Toggle>
  )
}
