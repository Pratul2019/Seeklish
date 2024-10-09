"use server"

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function login(provider: string) {
  try {
    await signIn(provider, { redirectTo: "/" });
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw to handle in the client if needed
  } finally {
    revalidatePath("/");
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    console.error("Logout error:", error);
    throw error; // Re-throw to handle in the client if needed
  } finally {
    revalidatePath("/");
  }
}