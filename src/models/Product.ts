import { ProductApiData } from '../apischema/products';

/**
 * Product class/model for handling Fake Store API product data
 */
export class Product {
  public readonly id: number;
  public readonly title: string;
  public readonly displayName: string;
  public readonly price: number;
  public readonly originalPrice: number;
  public readonly description: string;
  public readonly shortDescription: string;
  public readonly category: string;
  public readonly categoryDisplayName: string;
  public readonly image: string;
  public readonly rating: number;
  public readonly ratingCount: number;
  public readonly isOnSale: boolean;

  constructor(apiData: ProductApiData) {
    this.id = apiData.id;
    this.title = apiData.title;
    this.displayName = this.formatDisplayName(apiData.title);
    this.price = Math.round(apiData.price * 100) / 100; // Round to 2 decimal places
    this.originalPrice = this.calculateOriginalPrice(apiData.price);
    this.description = apiData.description;
    this.shortDescription = this.createShortDescription(apiData.description);
    this.category = apiData.category;
    this.categoryDisplayName = this.formatCategoryName(apiData.category);
    this.image = apiData.image;
    this.rating = Math.round(apiData.rating.rate * 10) / 10; // Round to 1 decimal place
    this.ratingCount = apiData.rating.count;
    this.isOnSale = this.calculateIsOnSale();
  }

  /**
   * Format title for better display
   */
  private formatDisplayName(title: string): string {
    if (title.length > 50) {
      return title.substring(0, 47) + '...';
    }
    return title;
  }

  /**
   * Calculate original price (simulate discount)
   */
  private calculateOriginalPrice(currentPrice: number): number {
    // Simulate 10-20% discount for some products
    const discountFactor = Math.random() > 0.5 ? 1 + (Math.random() * 0.1 + 0.1) : 1;
    return Math.round(currentPrice * discountFactor * 100) / 100;
  }

  /**
   * Create short description
   */
  private createShortDescription(description: string): string {
    if (description.length > 100) {
      return description.substring(0, 97) + '...';
    }
    return description;
  }

  /**
   * Format category name for display
   */
  private formatCategoryName(category: string): string {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Determine if product is on sale
   */
  private calculateIsOnSale(): boolean {
    return this.originalPrice > this.price;
  }

  /**
   * Convert to format expected by ProductCard component
   */
  toProductCardData() {
    return {
      id: this.id.toString(),
      name: this.displayName,
      price: this.price,
      originalPrice: this.isOnSale ? this.originalPrice : undefined,
      image: this.image,
      rating: this.rating,
      ratingCount: this.ratingCount,
      category: this.categoryDisplayName,
      isOnSale: this.isOnSale,
    };
  }

  /**
   * Convert to format expected by ProductList component
   */
  toProductListFormat() {
    return {
      id: this.id,
      title: this.displayName,
      price: this.getFormattedPrice(),
      originalPrice: this.isOnSale ? this.getFormattedOriginalPrice() : '',
      description: this.shortDescription,
      category: this.categoryDisplayName,
      image: this.image,
      rating: `${this.rating} (${this.ratingCount} reviews)`,
      isOnSale: this.isOnSale,
    };
  }

  /**
   * Get formatted price string
   */
  getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  /**
   * Get formatted original price string
   */
  getFormattedOriginalPrice(): string {
    return `$${this.originalPrice.toFixed(2)}`;
  }

  /**
   * Get discount percentage
   */
  getDiscountPercentage(): number {
    if (this.isOnSale) {
      return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
    }
    return 0;
  }

  /**
   * Get discount amount
   */
  getDiscountAmount(): number {
    if (this.isOnSale) {
      return Math.round((this.originalPrice - this.price) * 100) / 100;
    }
    return 0;
  }

  /**
   * Check if product has high rating (>= 4.0)
   */
  hasHighRating(): boolean {
    return this.rating >= 4.0;
  }

  /**
   * Get star rating display string
   */
  getStarRating(): string {
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
  }
}

/**
 * Product Category definitions for Fake Store API
 */
export const PRODUCT_CATEGORIES = [
  { id: 'electronics', name: 'Electronics', displayName: 'Electronics' },
  { id: 'jewelery', name: 'Jewelery', displayName: 'Jewelry' },
  { id: "men's clothing", name: "Men's Clothing", displayName: "Men's Fashion" },
  { id: "women's clothing", name: "Women's Clothing", displayName: "Women's Fashion" },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

/**
 * Helper function to get category display name
 */
export function getCategoryDisplayName(categoryId: string): string {
  const category = PRODUCT_CATEGORIES.find(cat => cat.id === categoryId);
  return category?.displayName || categoryId;
}

/**
 * Helper function to create Product instances from API response
 */
export function createProductsFromApiData(apiData: ProductApiData[]): Product[] {
  return apiData
    .filter(data => data && typeof data === 'object')
    .map(data => new Product(data));
}
