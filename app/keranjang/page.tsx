"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Barcode, Minus, Plus, Printer, Save, Search, ShoppingCart, Trash } from "lucide-react"
import { fetchBarang } from "@/utils/api"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
}

export default function KeranjangPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [barangList, setBarangList] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadBarang()
  }, [])

  const loadBarang = async () => {
    try {
      const data = await fetchBarang()
      setBarangList(data)
    } catch (error) {
      console.error("Gagal memuat barang:", error)
    }
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const addToCart = (id: string) => {
    const product = barangList.find((item) => item.id === id)
    if (!product) return

    const price = parseInt(product.harga)
    const existingItem = cart.find((item) => item.id === id)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item,
        ),
      )
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.nama,
          price: price,
          quantity: 1,
          total: price,
        },
      ])
    }
  }

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: qty, total: qty * item.price } : item,
      ),
    )
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0)
  }

  const filteredProducts = barangList.filter((product) =>
    product.nama.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold mb-6">Transaksi Penjualan</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        
        {/* === TABEL BARANG === */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              Daftar Barang
            </CardTitle>
          </CardHeader>
          <CardContent>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari barang..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="rounded-md border max-h-[380px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.nama}</TableCell>
                      <TableCell className="text-right">
                        {formatRupiah(parseInt(product.harga))}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" onClick={() => addToCart(product.id)}>
                          + Tambah
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4">
                        Tidak ada barang ditemukan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* === KERANJANG === */}
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle>Detail Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center py-6 text-muted-foreground">
                <ShoppingCart className="h-10 w-10 mb-2" />
                Keranjang kosong
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barang</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-center">Jumlah</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{formatRupiah(item.price)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatRupiah(item.total)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="text-red-500 h-6 w-6" onClick={() => removeFromCart(item.id)}>
                          <Trash className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="flex justify-between w-full text-lg font-bold">
              <span>Total</span>
              <span>{formatRupiah(calculateTotal())}</span>
            </div>
            <div className="flex gap-4 w-full">
              <Button className="flex-1 h-12"> <Save className="mr-2 h-5 w-5" /> Simpan Transaksi </Button>
              <Button variant="outline" className="h-12"> <Printer className="mr-2 h-5 w-5" /> Cetak Struk </Button>
            </div>
          </CardFooter>
        </Card>

      </div>
    </div>
  )
}
