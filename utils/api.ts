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

// Tambahkan kode berikut di akhir file utils/api.ts

// Deklarasikan API_URL di sini atau impor dari file konfigurasi
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost/toko-kelontong-api/api/";

// Fungsi helper untuk handle response
async function handleResponse(response: Response) {
  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    console.error(`HTTP Error: ${response.status} ${response.statusText}`);

    if (contentType && contentType.includes("application/json")) {
      try {
        const errorData = await response.json();
        return {
          message: errorData.message || `HTTP Error: ${response.status}`,
        };
      } catch {
        return {
          message: `HTTP Error: ${response.status} ${response.statusText}`,
        };
      }
    } else {
      const textResponse = await response.text();
      console.error("Non-JSON response:", textResponse);
      return { message: `Server Error: ${response.status}` };
    }
  }

  if (contentType && contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (error) {
      console.error("JSON Parse Error:", error);
      const textResponse = await response.text();
      console.error("Raw response:", textResponse);
      return { message: "Invalid JSON response from server" };
    }
  } else {
    const textResponse = await response.text();
    console.error("Non-JSON response:", textResponse);
    return { message: "Server returned non-JSON response" };
  }
}

// Fungsi untuk mengambil data barang
export async function fetchBarang(): Promise<Barang[]> {
  try {
    console.log("Fetching barang from:", `${API_URL}/barang/read.php`);

    const response = await fetch(`${API_URL}/barang/read.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await handleResponse(response);

    if (data.records) {
      return data.records;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Unexpected data format:", data);
      return [];
    }
  } catch (error) {
    console.error("Gagal mengambil data barang:", error);
    return [];
  }
}

// Fungsi untuk membuat barang baru
export async function createBarang(
  barang: Omit<Barang, "id">
): Promise<{ message: string }> {
  try {
    console.log("Creating barang:", barang);
    console.log("API URL:", `${API_URL}/barang/create.php`);

    const response = await fetch(`${API_URL}/barang/create.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(barang),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    return await handleResponse(response);
  } catch (error) {
    console.error("Gagal membuat barang:", error);
    return {
      message:
        "Terjadi kesalahan saat membuat barang: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

// Fungsi untuk memperbarui data barang
export async function updateBarang(
  barang: Barang
): Promise<{ message: string }> {
  try {
    console.log("Updating barang:", barang);

    const response = await fetch(`${API_URL}/barang/update.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(barang),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Gagal memperbarui barang:", error);
    return {
      message:
        "Terjadi kesalahan saat memperbarui barang: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

// Fungsi untuk menghapus barang
export async function deleteBarang(id: string): Promise<{ message: string }> {
  try {
    console.log("Deleting barang ID:", id);

    const response = await fetch(`${API_URL}/barang/delete.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Gagal menghapus barang:", error);
    return {
      message:
        "Terjadi kesalahan saat menghapus barang: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

// Fungsi untuk mencari barang
export async function searchBarang(searchTerm: string): Promise<Barang[]> {
  try {
    console.log("Searching barang:", searchTerm);

    const response = await fetch(
      `${API_URL}/barang/search.php?s=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await handleResponse(response);

    if (data.records) {
      return data.records;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Unexpected search data format:", data);
      return [];
    }
  } catch (error) {
    console.error("Gagal mencari barang:", error);
    return [];
  }
}

// Tambahkan interface untuk transaksi
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

// Tambahkan fungsi saveTransaction yang hilang
export async function saveTransaction(
  transaction: Transaction
): Promise<{ message: string; id?: number }> {
  try {
    console.log("Saving transaction:", transaction);

    const response = await fetch(`${API_URL}/transaksi/create.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Gagal menyimpan transaksi:", error);
    return {
      message:
        "Terjadi kesalahan saat menyimpan transaksi: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

// Interface untuk Supplier
export interface Supplier {
  id?: string;
  nama: string;
  email: string;
  nomor_hp: string;
  minimal_stok: string;
}

// Fungsi untuk membuat supplier baru
export async function createSupplier(
  supplier: Omit<Supplier, "id">
): Promise<{ message: string }> {
  try {
    console.log("Creating supplier:", supplier);

    const response = await fetch(`${API_URL}/supplier/create.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Gagal membuat supplier:", error);
    return {
      message:
        "Terjadi kesalahan saat membuat supplier: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}
