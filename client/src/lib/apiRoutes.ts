import { axiosPublic } from "../config/axiosClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  code: string;
}

export interface AuthResponse {
  _id: string;
  avatar: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  message?: string;
}

export interface Property {
  _id?: string;
  userId?: string;
  images: string[];
  title: string;
  description: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  utilities: string;
  pets: boolean;
  incomePolicy: string;
  size: number;
  nearestSchool: number;
  nearestBusStop: number;
  nearestRestrauant: number;
  longitude: number;
  latitude: number;
}

export interface Bookmark {
  _id: string;
  property: Property & {
    userId: AuthResponse;
  };
  user: AuthResponse;
  createdAt: Date;
}

export interface ChatHead {
  _id: string;
  sender: AuthResponse;
  receiver: AuthResponse;
  createdAt: Date;
}

export const register = async (data: RegisterData) =>
  axiosPublic.post<AuthResponse>("/auth/register", data);

export const login = async (data: LoginData) =>
  axiosPublic.post<AuthResponse>("/auth/login", data);

export const logout = async () =>
  axiosPublic.get<{ message: string }>("/auth/logout");

export const verifyEmail = async (code: string) =>
  axiosPublic.get<AuthResponse>(`/auth/verify-email/${code}`);

export const forgotPassword = async (email: string) =>
  axiosPublic.post<{ message: string }>(`/auth/forgot-password`, { email });

export const resetPassword = async (data: ResetPasswordData) =>
  axiosPublic.put<AuthResponse>(`/auth/reset-password`, data);

export const getUser = async (): Promise<AuthResponse> => {
  const response = await axiosPublic.get("/user");
  return response.data;
};
export const getProperties = async (url: string): Promise<Property[]> => {
  const response = await axiosPublic.get(url);
  return response.data;
};

export const getProperty = async (propertyId: string): Promise<Property> => {
  const response = await axiosPublic.get(`/property/${propertyId}`);
  return response.data;
};

export const getUserProperties = async (): Promise<Property[]> => {
  const response = await axiosPublic.get(`/user/properties`);
  return response.data;
};

export const getBookmarks = async (): Promise<Bookmark[]> => {
  const response = await axiosPublic.get("/user/bookmarks");
  return response.data; // Stelle sicher, dass du auf .data zugreifst
};

export const bookmarkProperty = async (
  propertyId: string
): Promise<{ message: string }> =>
  axiosPublic.put("/property/bookmark", { propertyId });

export const createProperty = async (
  data: Property
): Promise<{ message: string }> =>
  axiosPublic.post("/property/create-property", data);

export const getChatHeads = async (): Promise<ChatHead[]> => {
  const response = await axiosPublic.get("/message/chat-heads");
  return response.data; // Stelle sicher, dass du auf .data zugreifst
};
