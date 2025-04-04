import {
  integer,
  text,
  pgTable,
  varchar,
  pgEnum,
  date,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "OVERDUE",
  "BORROWED",
  "RETURNED",
]);
export const ORDER_STATUS_ENUM = pgEnum("order_status", [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullname: varchar("fullname", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: text("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(),
  coverUrl: text("cover_url").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  description: text("description").notNull(),
  totalCopies: integer("total_copies").notNull().default(0),
  availableCopies: integer("available_copies").notNull().default(0),
  videoUrl: text("video_url").notNull(),
  summary: varchar("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  bookId: uuid("book_id")
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Customers Table
export const customers = pgTable("customers", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 15 }).notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Products Table
export const products = pgTable("products", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating").default(0), // Optional field for product ratings
  totalStock: integer("total_stock").notNull().default(0),
  availableStock: integer("available_stock").notNull().default(0),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Orders Table
export const orders = pgTable("orders", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  customerId: uuid("customer_id")
    .references(() => customers.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  totalAmount: integer("total_amount").notNull(),
  status: ORDER_STATUS_ENUM("status").default("PENDING").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});