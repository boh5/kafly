import Link from "next/link"

import { ConnectionCombobox } from "@/components/connection-combobox"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export async function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 p-2">
      <Link href="/" className="flex flex-row items-center">
        <Icons.logo />
        <span>Kafly</span>
      </Link>
      <div className="flex items-center space-x-2">
        <ConnectionCombobox />
        <ModeToggle />
      </div>
    </header>
  )
}
