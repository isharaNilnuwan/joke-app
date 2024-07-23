import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "@/utils/getAuthorizationHeader";

class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (email: string, password: string) => {
    return this.instance
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        return {
          email: res.data.username,
          id: res.data.userId,
          accessToken: res.data.accessToken,
          expiredAt: res.data.expiresIn,
        };
      });
  };

  getMe = (userId: string) => {
    return this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };

  uploadAvatar = (userId: string, newAvatar: File) => {
    const formData = new FormData();
    formData.append("file", newAvatar);
    return this.instance
      .post(`/users/${userId}/upload`, formData, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return {
          newAvatar: res.data.data.url,
        };
      });
  };
}

export const authService = new AuthService(
  process.env.MODERATE_API_URL || "http://localhost:1008"
);
