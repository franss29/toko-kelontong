"use client"

import { useState } from "react"
import { Minus, Plus, Printer, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TransaksiPage() {
  const [cart, setCart] = useState([
    { id: "001", nama: "Buku Tulis", harga: 5000, qty: 2, total: 10000 },
    { id: "003", nama: "Penghapus", harga: 2000, qty: 1, total: 2000 },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 2) {
      // Simulasi hasil pencarian
      setSearchResults([
        { id: "001", nama: "Buku Tulis", harga: 5000, stok: 120 },
        { id: "002", nama: "Pensil 2B", harga: 3500, stok: 8 },
        { id: "004", nama: "Penggaris 30cm", harga: 4000, stok: 15 },
      ])
    } else {
      setSearchResults([])
    }
  }

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1, total: (cartItem.qty + 1) * cartItem.harga }
            : cartItem,
        ),
      )
    } else {
      setCart([...cart, { ...item, qty: 1, total: item.harga }])
    }

    setSearchQuery("")
    setSearchResults([])
  }

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return

    setCart(cart.map((item) => (item.id === id ? { ...item, qty: newQty, total: newQty * item.harga } : item)))
  }

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transaksi Penjualan</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Tambah Barang</CardTitle>
            <CardDescription>Cari dan tambahkan barang ke keranjang</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari barang (nama/kode)..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            {searchResults.length > 0 && (
              <div className="border rounded-md mt-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Stok</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.nama}</TableCell>
                        <TableCell>Rp {item.harga.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={item.stok < 10 ? "text-red-500 border-red-500" : ""}>
                            {item.stok}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => addToCart(item)} disabled={item.stok < 1}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Keranjang Belanja</CardTitle>
            <CardDescription>Daftar barang yang akan dibeli</CardDescription>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Keranjang belanja kosong</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barang</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>Rp {item.harga.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.qty}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">Rp {item.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>Rp {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button variant="outline" disabled={cart.length === 0}>
                <Printer className="mr-2 h-4 w-4" />
                Cetak Struk
              </Button>
              <Button disabled={cart.length === 0}>Simpan Transaksi</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
