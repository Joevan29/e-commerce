"use client"

export function SceneLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        Loading 3D Experience...
      </div>
    </div>
  )
}