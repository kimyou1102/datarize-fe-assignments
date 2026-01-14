import { useEffect } from 'react'

export interface UseModalCloseParams {
  isOpen: boolean
  onClose: () => void
}

function useModalClose({ isOpen, onClose }: UseModalCloseParams) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return { handleBackdropMouseDown }
}

export default useModalClose
