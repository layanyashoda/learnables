"use server";

import {
  or,
  desc,
  asc,
  eq,
  count,
  ilike,
  and,
  getTableColumns,
} from "drizzle-orm";

import { db } from "@/database/drizzle";
import { products, orders, customers } from "@/database/schema";

const ITEMS_PER_PAGE = 20;

export async function createProduct(params: ProductParams) {
  try {
    const newProduct = await db
      .insert(products)
      .values({
        ...params,
        availableStock: params.totalStock,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newProduct[0])),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Error creating product",
    };
  }
}

export async function getProducts({
  query,
  sort = "available",
  page = 1,
  limit = ITEMS_PER_PAGE,
}: QueryParams) {
  try {
    const searchConditions = query
      ? or(
          ilike(products.name, `%${query}%`),
          ilike(products.category, `%${query}%`),
          ilike(products.brand, `%${query}%`)
        )
      : undefined;

    const sortOptions: Record<string, any> = {
      newest: desc(products.createdAt),
      oldest: asc(products.createdAt),
      highestRated: desc(products.rating),
      available: desc(products.availableStock),
    };

    const sortingCondition = sortOptions[sort] || desc(products.createdAt);

    const productsData = await db
      .select()
      .from(products)
      .where(searchConditions)
      .orderBy(sortingCondition)
      .limit(limit)
      .offset((page - 1) * limit);

    const totalItems = await db
      .select({
        count: count(products.id),
      })
      .from(products)
      .where(searchConditions);

    const totalPages = Math.ceil(totalItems[0].count / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPages;

    return {
      success: true,
      data: productsData,
      metadata: {
        totalPages,
        hasNextPage,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      error: "An error occurred while fetching products",
    };
  }
}

export async function getOrderRecords({
  query,
  sort = "available",
  page = 1,
  limit = ITEMS_PER_PAGE,
}: QueryParams) {
  try {
    const offset = (page - 1) * limit;

    const searchConditions = query
      ? or(
          ilike(products.name, `%${query}%`),
          ilike(products.category, `%${query}%`),
          ilike(customers.name, `%${query}%`)
        )
      : undefined;

    const sortOptions = {
      newest: desc(products.createdAt),
      oldest: asc(products.createdAt),
      highestRated: desc(products.rating),
      available: desc(products.availableStock),
    };

    const sortingCondition =
      sortOptions[sort as keyof typeof sortOptions] || sortOptions.available;

    const [orderRecordsData, totalItems] = await Promise.all([
      db
        .select({
          ...getTableColumns(products),
          order: {
            ...getTableColumns(orders),
          },
          customer: {
            ...getTableColumns(customers),
          },
        })
        .from(orders)
        .innerJoin(products, eq(orders.productId, products.id))
        .innerJoin(customers, eq(orders.customerId, customers.id))
        .where(searchConditions ? and(searchConditions) : undefined)
        .orderBy(sortingCondition)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: count() })
        .from(orders)
        .innerJoin(products, eq(orders.productId, products.id))
        .innerJoin(customers, eq(orders.customerId, customers.id))
        .where(searchConditions ? and(searchConditions) : undefined),
    ]);

    const totalCount = Number(totalItems[0]?.count) || 0;
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;

    return {
      success: true,
      data: orderRecordsData,
      metadata: {
        totalPages,
        hasNextPage,
        totalCount,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error fetching order records:", error);
    return {
      success: false,
      error: "Something went wrong while fetching order records.",
    };
  }
}

export async function editProduct(params: UpdateProductParams) {
  try {
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, params.productId))
      .limit(1);

    if (existingProduct.length === 0) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    const availableStock =
      params.totalStock -
      (params.totalStock - existingProduct[0].availableStock);

    const updatedProduct = await db
      .update(products)
      .set({
        ...params,
        availableStock,
      })
      .where(eq(products.id, params.productId))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedProduct[0])),
    };
  } catch (error) {
    console.error("Error editing product:", error);
    return {
      success: false,
      error: "Error editing product",
    };
  }
}

export async function getProduct({ id }: { id: string }) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(product[0])),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Error getting product",
    };
  }
}
