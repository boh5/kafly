import { SidebarItemWithChildren } from "@/types/sidebar"

export const sidebarConfig: SidebarItemWithChildren[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        href: "/",
      },
      {
        title: "Connections",
        href: "/connections",
      },
    ],
  },
  {
    title: "Kafka",
    items: [
      {
        title: "Brokers",
        href: "/brokers",
      },
      {
        title: "Topics",
        href: "/topics",
      },
      {
        title: "Consumers",
        href: "/consumers",
      },
    ],
  },
]
