"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createLaporanSupplier } from "@/utils/api"

interface InputLaporanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function InputLaporanDialog({ open, onOpenChange, onSuccess }: InputLaporanDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    supplier: "",
    alamat_supplier: "",
    nomor_hp: "",
    tanggal: new Date().toISOString().split("T")[0],
    total_item: "",
    total_harga: "",
    
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!formData.supplier.trim()) {
        toast.error("Nama supplier wajib diisi")
        return
      }
      if (!formData.total_item || Number.parseInt(formData.total_item) <= 0) {
        toast.error("Total item harus lebih dari 0")
        return
      }
      if (!formData.total_harga || Number.parseFloat(formData.total_harga) <= 0) {
        toast.error("Total harga harus lebih dari 0")
        return
      }

      const payload = {
        ...formData,
        total_item: Number.parseInt(formData.total_item),
        total_harga: Number.parseFloat(formData.total_harga),
      }

      const result = await createLaporanSupplier(payload)

      if (result.success) {
        toast.success(result.message || "Laporan supplier berhasil ditambahkan")
        onSuccess?.()
        onOpenChange(false)
        // reset form
        setFormData({
          supplier: "",
          alamat_supplier: "",
          nomor_hp: "",
          total_item: "",
          total_harga: "",
          tanggal: new Date().toISOString().split("T")[0],
        })
      } else {
        toast.error(result.message || "Gagal menambahkan laporan supplier")
      }
    } catch (error) {
      console.error("Error creating laporan supplier:", error)
      toast.error("Terjadi kesalahan saat menambahkan laporan supplier")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Input Laporan Supplier</DialogTitle>
          <DialogDescription>
            Masukkan informasi laporan supplier baru. ID transaksi akan dibuat otomatis.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Tanggal */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal" className="text-right">
                Tanggal *
              </Label>
              <Input
                id="tanggal"
                name="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Nama Supplier */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">
                Nama Supplier *
              </Label>
              <Input
                id="supplier"
                name="supplier"
                type="text"
                value={formData.supplier}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Alamat Supplier */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alamat_supplier" className="text-right">
                Alamat
              </Label>
              <Input
                id="alamat_supplier"
                name="alamat_supplier"
                type="text"
                value={formData.alamat_supplier}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Nomor HP */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nomor_hp" className="text-right">
                Nomor HP
              </Label>
              <Input
                id="nomor_hp"
                name="nomor_hp"
                type="text"
                value={formData.nomor_hp}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Total Item */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total_item" className="text-right">
                Total Item *
              </Label>
              <Input
                id="total_item"
                name="total_item"
                type="number"
                min="1"
                value={formData.total_item}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            {/* Total Harga */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total_harga" className="text-right">
                Total Harga *
              </Label>
              <Input
                id="total_harga"
                name="total_harga"
                type="number"
                min="0"
                value={formData.total_harga}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
