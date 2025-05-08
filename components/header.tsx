"use client"

import Link from "next/link"
import { Bell, Menu, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6" />
              <span className="font-bold">Toko ATK Sejahtera</span>
            </Link>
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Link href="/barang" className="hover:text-primary">
              Data Barang
            </Link>
            <Link href="/transaksi" className="hover:text-primary">
              Transaksi Penjualan
            </Link>
            <Link href="/laporan" className="hover:text-primary">
              Laporan
            </Link>
            <Link href="/pengaturan" className="hover:text-primary">
              Pengaturan
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2 font-semibold lg:hidden">
        <Package className="h-6 w-6" />
        <span>Toko ATK</span>
      </Link>
      <div className="flex-1" />
      <Button variant="outline" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifikasi</span>
      </Button>
    </header>
  )
}
