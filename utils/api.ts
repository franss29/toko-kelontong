// ======================
// Interfaces
// ======================

export type Barang = {
  id: string;
  kode: string;
  nama: string;
  kategori: string;
  harga: string;
  stok: string;
  supplier: string;
  alamat: string;
  nomor_hp: string;
};

export interface Transaction {
  items: {
    id: string;
    kode: string;
    nama: string;
    harga: number;
    qty: number;
    total: number;
  }[];
  total: number;
  customer?: string;
  payment_method?: string;
  notes?: string;
}

// interface laporan supplier (langsung input manual)
export interface LaporanSupplier {
  id?: string;
  tanggal: string;
  supplier: string;
  nomor_hp: string;
  total_item: number;
  total_harga: number;
}

// ======================
// Konfigurasi API
// ======================

export const API_URL = "http://localhost/toko-kelontong-api/api";

// ======================
// Helper untuk response
// ======================

async function handleResponse<T = any>(
  response: Response
): Promise<T | { message: string }> {
  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let message = `HTTP Error: ${response.status} ${response.statusText}`;

    if (contentType?.includes("application/json")) {
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {}
    } else {
      try {
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
      } catch {}
    }
    return { message };
  }

  if (contentType?.includes("application/json")) {
    try {
      return await response.json();
    } catch (error) {
      console.error("JSON Parse Error:", error);
      return { message: "Invalid JSON response from server" };
    }
  } else {
    const textResponse = await response.text();
    console.error("Non-JSON response:", textResponse);
    return { message: "Server returned non-JSON response" };
  }
}

// ======================
// CRUD Barang
// ======================

export async function fetchBarang(): Promise<Barang[]> {
  try {
    const response = await fetch(`${API_URL}/barang/read.php`);
    const data: any = await handleResponse(response);

    if (data.records) return data.records;
    if (Array.isArray(data)) return data;
    console.error("Unexpected data format:", data);
    return [];
  } catch (error) {
    console.error("Gagal mengambil data barang:", error);
    return [];
  }
}

export async function createBarang(
  barang: Omit<Barang, "id">
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_URL}/barang/create.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(barang),
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      message:
        "Terjadi kesalahan saat membuat barang: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function updateBarang(
  barang: Barang
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_URL}/barang/update.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(barang),
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      message:
        "Terjadi kesalahan saat memperbarui barang: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function deleteBarang(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_URL}/barang/delete.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      message:
        "Terjadi kesalahan saat menghapus barang: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

// ======================
// Transaksi
// ======================

export async function saveTransaction(
  transaction: Transaction
): Promise<{ message: string; id?: number }> {
  try {
    const response = await fetch(`${API_URL}/transaksi/create.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      message:
        "Terjadi kesalahan saat menyimpan transaksi: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

// ================== LAPORAN SUPPLIER ==================

export interface Supplier {
  id: string;
  nama: string;
  alamat: string;
  nomor_hp: string;
}

export async function fetchLaporanSupplier() {
  const response = await fetch(`${API_URL}/laporan_supplier/read.php`);
  if (!response.ok) {
    throw new Error("Gagal fetch laporan supplier");
  }
  return response.json();
}

export async function getSuppliers(): Promise<Supplier[]> {
  try {
    const response = await fetch(`${API_URL}/laporan_supplier/read.php`);
    const data: any = await handleResponse(response);

    if (data.records) return data.records;
    if (Array.isArray(data)) return data;
    console.error("Unexpected supplier format:", data);
    return [];
  } catch (error) {
    console.error("Gagal mengambil data supplier:", error);
    return [];
  }
}

export async function getLaporanSupplier(): Promise<LaporanSupplier[]> {
  try {
    const response = await fetch(`${API_URL}/laporan_supplier/read.php`);
    const data: any = await handleResponse(response);

    if (data.records) return data.records;
    if (Array.isArray(data)) return data;

    console.error("Unexpected laporan supplier format:", data);
    return [];
  } catch (error) {
    console.error("Gagal mengambil data laporan supplier:", error);
    return [];
  }
}

export async function createLaporanSupplier(data: any) {
  console.log("Kirim data:", data);

  const res = await fetch(`${API_URL}/laporan_supplier/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("Response:", result);
  return result;
}

export async function updateLaporanSupplier(
  data: LaporanSupplier
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_URL}/laporan_supplier/update.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      message:
        "Terjadi kesalahan saat memperbarui laporan supplier: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function deleteLaporanSupplier(
  id: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_URL}/laporan_supplier/delete.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      message:
        "Terjadi kesalahan saat menghapus laporan supplier: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function getBarangKeluar() {
  const res = await fetch(`${API_URL}/barang_keluar/read.php`);
  return res.json();
}

export async function createBarangKeluar(data: any) {
  const res = await fetch(`${API_URL}/barang_keluar/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.text(); // ambil dulu sebagai text
  try {
    return JSON.parse(json); // parse JSON
  } catch {
    console.error("Response bukan JSON:", json);
    throw new Error("Response dari server bukan JSON");
  }
}

export async function deleteBarangKeluar(id: number) {
  const res = await fetch(`${API_URL}/barang_keluar/delete.php?id=${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function getBarangMasuk() {
  const res = await fetch(`${API_URL}/barang_masuk/read.php`);
  return res.json();
}

export async function createBarangMasuk(data: any) {
  const res = await fetch(`${API_URL}/barang_masuk/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBarangMasuk(id: number, data: any) {
  const res = await fetch(`${API_URL}/barang_masuk/update.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  });
  return res.json();
}

export async function deleteBarangMasuk(id: number) {
  const res = await fetch(`${API_URL}/barang_masuk/delete.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function createBarangKeluarSafe(data: any) {
  const res = await fetch(`${API_URL}/barang_keluar/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const text = await res.text();
  try {
    return text
      ? JSON.parse(text)
      : { success: false, message: "Response kosong" };
  } catch (err) {
    console.error("Gagal parsing JSON:", text);
    return { success: false, message: "Response bukan JSON valid" };
  }
}

export async function updateBarangKeluar(id: number, data: any) {
  const res = await fetch(`${API_URL}/barang_keluar/update.php?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
