import axios from "axios";
import {
  LoginData,
  LoginRefreshResponse,
  ProductsResponse,
} from "../types/global.type";

const API_URL = "https://dummyjson.com";

const customAxios = axios.create({
  baseURL: API_URL,
});

export const login = async (data: LoginData): Promise<LoginRefreshResponse> => {
  try {
    const response = await customAxios.post<LoginRefreshResponse>(
      `/auth/login`,
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to login. Please check your credentials and try again.",
    );
  }
};
export const refresh = async (): Promise<LoginRefreshResponse> => {
  try {
    const response = await customAxios.post<LoginRefreshResponse>(
      `auth/refresh`,
      {
        body: JSON.stringify({
          expiresInMins: 30,
        }),
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to login. Please check your credentials and try again.",
    );
  }
};

export const getAllProducts = async (
  page: number,
  resultsPerPage: number,
): Promise<ProductsResponse> => {
  try {
    const response = await customAxios.get<ProductsResponse>(
      `/products?limit=${resultsPerPage}&skip=${page * resultsPerPage - resultsPerPage}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products. Please try again later.");
  }
};

export const getProductsWithQuery = async (
  query: string,
): Promise<ProductsResponse> => {
  try {
    const response = await customAxios.get<ProductsResponse>(
      `/products/search?q=${query}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products. Please try again later.");
  }
};
export const getCategoryProducts = async (
  category: string,
  page: number,
  resultsPerPage: number,
): Promise<ProductsResponse> => {
  try {
    const response = await customAxios.get<ProductsResponse>(
      `/products/category/${category}?limit=${resultsPerPage}&skip=${page * resultsPerPage - resultsPerPage}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Failed to fetch category products. Please try again later.",
    );
  }
};

customAxios.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;

    if (!fullUrl.includes(`${API_URL}/auth`)) {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await refresh();

        const { token } = refreshResponse;
        localStorage.setItem("token", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return customAxios(originalRequest);
      } catch (refreshError) {
        window.location.href = `${window.location.origin}/login`;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
