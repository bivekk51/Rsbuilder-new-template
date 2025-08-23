/**
 * API Schema for Fake Store API Product Response
 */
export interface ProductApiData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Type for array of products from API
 */
export type ProductsApiResponse = ProductApiData[];

/**
 * Type guard to validate if data is a valid ProductApiData
 */
export function isValidProductApiData(data: any): data is ProductApiData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    typeof data.title === 'string' &&
    typeof data.price === 'number' &&
    typeof data.description === 'string' &&
    typeof data.category === 'string' &&
    typeof data.image === 'string' &&
    typeof data.rating === 'object' &&
    data.rating !== null &&
    typeof data.rating.rate === 'number' &&
    typeof data.rating.count === 'number'
  );
}

/**
 * Type guard to validate if data is a valid array of products
 */
export function isValidProductsApiResponse(data: any): data is ProductsApiResponse {
  return Array.isArray(data) && data.every(isValidProductApiData);
}
