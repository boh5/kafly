"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      {!!theme && theme === "dark" ? (
        <Button className="rounded-full" onClick={() => setTheme("light")}>
          <Icons.sun className="size-4" />
        </Button>
      ) : (
        <Button className="rounded-full" onClick={() => setTheme("dark")}>
          <Icons.moon className="size-4" />
        </Button>
      )}
    </>
  )
}
