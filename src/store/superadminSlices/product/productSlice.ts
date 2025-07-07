import {
  changeStatusAction,
  getAdminProductCategories,
  getAdminProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/superadmin/product.service";
import { IProduct } from "@/types/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IData {
  content: IProduct[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

interface ICategory {
  name: string;
  slug: string;
  url: string;
}

interface ProductState {
  data: IData;
  loading: boolean;
  loadingCategories?: boolean;
  loadingSearch?: boolean;
  loadingChangeStatus?: boolean;
  error: string | null;
  categories: ICategory[];
  selectedCategory: string;
  searchTerm: string;
  success: boolean;
}

const initialState: ProductState = {
  data: {
    content: [],
    page: {
      number: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
  },
  loading: true,
  error: null,
  categories: [],
  selectedCategory: "all",
  searchTerm: "",
  success: false,
};

interface FetchProductsParams {
  page: number;
  size: number;
}
interface ChangeStatusParams {
  productId: string;
  status: boolean;
}

export const fetchProducts = createAsyncThunk<IData, FetchProductsParams>(
  "products/fetchProducts",
  async (params, thunkAPI) => {
    console.log("fetch çalıştı")
    try {
      const data = await getAdminProducts(params.page, params.size); // bu fonksiyon parametreleri almalı
      console.log("data", data)
      return data;
    } catch (error: any) {
      console.log("Fetch error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeStatus = createAsyncThunk<
  { productId: string; status: boolean }, // fulfilled dönüş tipi
  ChangeStatusParams
>(
  "products/changeStatus",
  async (params, thunkAPI) => {
    try {
      await changeStatusAction(params.productId, params.status); // backend api çağrısı
      return { productId: params.productId, status: params.status };  // geri productId ve yeni status dön
    } catch (error: any) {
      console.log("Fetch error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk<
  ICategory[],
  FetchProductsParams
>("products/fetchCategories", async (params, thunkAPI) => {
  try {
    const data = await getAdminProductCategories(params.page, params.size); // bu fonksiyon parametreleri almalı
    return data;
  } catch (error: any) {
    console.log("Fetch error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchProductsByCategory = createAsyncThunk<
  IData,
  { catSlug: string }
>("products/fetchProductsByCategory", async (params, thunkAPI) => {
  try {
    const data = await getProductsByCategory(params.catSlug); // bu fonksiyon parametreleri almalı
    return data; // Assuming the API returns an array and we need the first item
  } catch (error: any) {
    console.log("Fetch error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const searchProduct = createAsyncThunk<IData, { query: string }>(
  "products/searchProducts",
  async (params, thunkAPI) => {
    try {
      const data = await searchProducts(params.query); // bu fonksiyon parametreleri almalı
      return data; // Assuming the API returns an array and we need the first item
    } catch (error: any) {
      console.log("Fetch error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.selectedCategory = "all";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      })

      //fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        state.selectedCategory = action.meta.arg.catSlug;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload as string;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      })

      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      })

      // Search Products
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.selectedCategory = "all";
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.error = action.payload.content.length
          ? null
          : "Aradığınız kriterlere uygun ürün Bulunamadı.";
        state.data = action.payload.content.length
          ? action.payload
          : state.data;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      })
      // CHANGE ProducT STATUS
      .addCase(changeStatus.pending, (state) => {
        state.loadingChangeStatus = true;
        state.error = null;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        const { productId, status } = action.payload;

        const product = state.data.content.find((p) => p.id === productId);
        if (product) {
          product.isActive = status;
        }
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.loadingChangeStatus = false;
        state.error = (action.payload as string) || "Bir hata oluştu.";
      });
  },
});

export const { setError, setSearchTerm } = adminProductSlice.actions;

export default adminProductSlice.reducer;
