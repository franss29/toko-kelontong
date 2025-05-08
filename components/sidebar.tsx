"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, FileText, Home, Package, Search, Settings, ShoppingCart, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 lg:block lg:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>Toko ATK Sejahtera</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <div className="px-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari..."
                className="w-full bg-background pl-8 shadow-none appearance-none"
              />
            </div>
          </div>
          <nav className="grid items-start px-2 text-sm font-medium mt-4">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/barang"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/barang" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Package className="h-4 w-4" />
              Data Barang
            </Link>
            <Link
              href="/transaksi"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/transaksi" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Transaksi Penjualan
            </Link>
            <Link
              href="/laporan"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/laporan" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <FileText className="h-4 w-4" />
              Laporan
            </Link>
            <Link
              href="/pengaturan"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === "/pengaturan" ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Settings className="h-4 w-4" />
              Pengaturan
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="flex items-center gap-2 rounded-lg border p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="font-medium">Admin</div>
              <div className="text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                admin@example.com
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Keluar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
