import { fetchWithTokenRenewal } from "@/utils/function/fetchWithTokenRenewal";
import {
  Purchase,
  Review,
  ReviewLabel,
  Sale,
  StatusEn
} from "@/utils/types/user/mypage";
import { UserProfile } from "@/utils/types/user/users";

export const purchaseList = async (status?: StatusEn): Promise<Purchase> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/buys`;
  const url = status ? `${baseUrl}?auctionStatus=${status}` : baseUrl;

  const res = await fetchWithTokenRenewal(url);

  if (!res.ok) throw new Error("Fail!");

  return res.json();
};

export const saleList = async (
  userId: number,
  status?: StatusEn
): Promise<Sale> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/sales`;
  const url = status ? `${baseUrl}?auctionStatus=${status}` : baseUrl;

  const res = await fetchWithTokenRenewal(url);

  if (!res.ok) throw new Error("Fail!");

  return res.json();
};

export const reviewLabelList = async (userId: number): Promise<ReviewLabel> => {
  const res = await fetchWithTokenRenewal(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/reviews/labels`
  );

  if (!res.ok) throw new Error("Fail");

  return res.json();
};

export const reviewList = async (userId: number): Promise<Review> => {
  const res = await fetchWithTokenRenewal(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/reviews`
  );

  if (!res.ok) throw new Error("Fail");

  return res.json();
};

export const userProfile = async (userId: number): Promise<UserProfile> => {
  const res = await fetchWithTokenRenewal(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/profiles`
  );

  if (!res.ok) {
    console.log(res);
  }

  return res.json();
};
