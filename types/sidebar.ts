import { Icons } from "@/components/icons"

export interface SidebarItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface SidebarItemWithChildren extends SidebarItem {
  items?: SidebarItem[]
}
