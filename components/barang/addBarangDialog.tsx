"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createBarang } from "@/utils/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddBarangDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddBarangDialog({ open, onOpenChange, onSuccess }: AddBarangDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
    supplier: "",
    alamat: "",
    nomor_hp: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await createBarang(formData)

      if (result.message && result.message.includes("berhasil")) {
        toast.success("Barang berhasil ditambahkan")
        onSuccess && onSuccess()
        onOpenChange(false)
        // Reset form
        setFormData({
          kode: "",
          nama: "",
          kategori: "",
          harga: "",
          stok: "",
          supplier: "",
          alamat: "",
          nomor_hp: "",
        })
      } else {
        toast.error(result.message || "Gagal menambahkan barang")
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan barang")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Barang Baru</DialogTitle>
          <DialogDescription>Masukkan informasi barang baru di bawah ini.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Kode */}
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="kode" className="col-span-4 text-right">
                Kode
              </Label>
              <Input
                id="kode"
                name="kode"
                value={formData.kode}
                onChange={handleChange}
                className="col-span-8"
                required
              />
            </div>
            {/* Nama Barang */}
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="nama" className="col-span-4 text-right">
                Nama Barang
              </Label>
              <Input
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="col-span-8"
                required
              />
            </div>
            {/* Kategori */}
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="kategori" className="col-span-4 text-right">
                Kategori
              </Label>
              <Select
                value={formData.kategori}
                onValueChange={(value) => handleSelectChange("kategori", value)}
              >
                <SelectTrigger className="col-span-8">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATK">ATK</SelectItem>
                  <SelectItem value="Alat Tulis">Alat Tulis</SelectItem>
                  <SelectItem value="Buku">Buku</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Harga */}
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="harga" className="col-span-4 text-right">
                Harga
              </Label>
              <Input
                id="harga"
                name="harga"
                type="number"
                value={formData.harga}
                onChange={handleChange}
                className="col-span-8"
                required
              />
            </div>
            {/* Stok */}
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="stok" className="col-span-4 text-right">
                Stok
              </Label>
              <Input
                id="stok"
                name="stok"
                type="number"
                value={formData.stok}
                onChange={handleChange}
                className="col-span-8"
                required
              />
            </div>
            {/* Nama Supplier */}
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="supplier" className="col-span-4 text-right">
                Nama Supplier
              </Label>
              <Input
                id="supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="col-span-8"
                required
              />
            </div>
            {/* Alamat */}
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="alamat" className="col-span-4 text-right">
                Alamat
              </Label>
              <Input
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="col-span-8"
                required
              />
            </div>
            {/* Nomor HP */}
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="nomor_hp" className="col-span-4 text-right">
                Nomor HP
              </Label>
              <Input
                id="nomor_hp"
                name="nomor_hp"
                type="tel"
                value={formData.nomor_hp}
                onChange={handleChange}
                className="col-span-8"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
