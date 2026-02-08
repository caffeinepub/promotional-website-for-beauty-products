import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    content: string;
    author: string;
    rating: bigint;
}
export type Time = bigint;
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    image: string;
    price: bigint;
}
export interface NewsletterSignup {
    email: string;
    timestamp: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(id: bigint, name: string, description: string, price: bigint, image: string): Promise<void>;
    addTestimonial(author: string, content: string, rating: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createInquiry(name: string, email: string, message: string): Promise<boolean>;
    deleteProduct(id: bigint): Promise<void>;
    deleteTestimonial(author: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProductById(id: bigint): Promise<Product | null>;
    getTestimonialByAuthor(author: string): Promise<Testimonial | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listInquiries(): Promise<Array<Inquiry>>;
    listNewsletterSignups(): Promise<Array<NewsletterSignup>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    subscribeToNewsletter(email: string): Promise<boolean>;
    updateProduct(id: bigint, name: string, description: string, price: bigint, image: string): Promise<void>;
    updateTestimonial(author: string, content: string, rating: bigint): Promise<void>;
}
