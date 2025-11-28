"use client"

import { useEffect, useState } from "react"
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
import { createBarangKeluar, updateBarangKeluar } from "@/utils/api"

interface InputBarangKeluarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  editData?: any | null
  barangMasukData?: any[]
}

export function InputBarangKeluarDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
  barangMasukData = [],
}: InputBarangKeluarDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nama_barang: "",
    tanggal: new Date().toISOString().split("T")[0],
    total_item: "",
    harga_jual: "",
  })

  // Isi otomatis jika edit
  useEffect(() => {
    if (editData) {
      setFormData({
        nama_barang: editData.nama_barang || "",
        tanggal: editData.tanggal
          ? new Date(editData.tanggal).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        total_item: String(editData.total_item || ""),
        harga_jual: String(editData.harga_jual || ""),
      })
    } else {
      setFormData({
        nama_barang: "",
        tanggal: new Date().toISOString().split("T")[0],
        total_item: "",
        harga_jual: "",
      })
    }
  }, [editData, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!formData.nama_barang.trim()) {
        toast.error("Nama barang wajib diisi")
        return
      }
      if (!formData.total_item || Number.parseInt(formData.total_item) <= 0) {
        toast.error("Total item harus lebih dari 0")
        return
      }
      if (!formData.harga_jual || Number.parseFloat(formData.harga_jual) <= 0) {
        toast.error("Harga jual harus lebih dari 0")
        return
      }

      // Cari barang yang dipilih dari dropdown
      const selectedBarang = barangMasukData.find(b => b.nama_barang === formData.nama_barang)
      if (!selectedBarang) {
        toast.error("Barang tidak ditemukan")
        return
      }

      const payload = {
        nama_barang: selectedBarang.nama_barang,
        total_item: Number(formData.total_item),
        harga_jual: Number(formData.harga_jual),
        tanggal: formData.tanggal,
        barang_masuk_id: selectedBarang.id,
      }

      let result
      if (editData?.id) {
        result = await updateBarangKeluar(editData.id, payload)
      } else {
        result = await createBarangKeluar(payload)
      }

      if (result.success) {
        toast.success(result.message || (editData ? "Barang keluar berhasil diperbarui" : "Barang keluar berhasil ditambahkan"))
        onSuccess?.()
        onOpenChange(false)
        setFormData({
          nama_barang: "",
          tanggal: new Date().toISOString().split("T")[0],
          total_item: "",
          harga_jual: "",
        })
      } else {
        toast.error(result.message || "Gagal menyimpan barang keluar")
      }
    } catch (error) {
      console.error("Error saving barang keluar:", error)
      toast.error("Terjadi kesalahan saat menyimpan barang keluar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Barang Keluar" : "Input Barang Keluar"}</DialogTitle>
          <DialogDescription>
            {editData ? "Ubah informasi barang keluar." : "Masukkan informasi barang keluar. ID transaksi akan dibuat otomatis."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal" className="text-right">Tanggal *</Label>
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama_barang" className="text-right">Nama Barang *</Label>
              <div className="col-span-3 flex items-center gap-2">
                <select
                  id="nama_barang"
                  name="nama_barang"
                  value={formData.nama_barang}
                  onChange={handleChange}
                  className="flex-1 border rounded px-2 py-1"
                  required
                >
                  <option value="">-- Pilih Barang --</option>
                  {barangMasukData.map(item => (
                    <option key={item.id} value={item.nama_barang}>
                      {item.nama_barang}
                    </option>
                  ))}
                </select>

                {/* Badge stok */}
                {formData.nama_barang && (
                  <span className="px-2 py-1 text-sm rounded bg-gray-100 border">
                    Stok: {
                      barangMasukData.find(b => b.nama_barang === formData.nama_barang)?.total_item ?? 0
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total_item" className="text-right">Total Item *</Label>
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="harga_jual" className="text-right">Harga Jual *</Label>
              <Input
                id="harga_jual"
                name="harga_jual"
                type="number"
                min="0"
                value={formData.harga_jual}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : editData ? "Update" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
