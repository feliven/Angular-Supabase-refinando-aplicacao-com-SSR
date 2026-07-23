import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { vi } from 'vitest';
import { supabaseClient } from './supabase.client';
import type { CartItem, Product } from '../types/types';

describe('CartService', () => {
  let service: CartService;
  let fromSpy: any;

  const product: Product = {
    id: 123,
    title: 'Test Product',
    price: 10,
    image: 'test.png',
    ingredients: 'Test Ingredients',
    category: 'Test Category',
    imageDetails: 'Test Details',
  };

  const mockSelect = vi.fn();
  const mockDelete = vi.fn();
  const mockEq = vi.fn();
  const mockUpsert = vi.fn();
  const mockOverrideTypes = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockSelect.mockReturnValue({
      overrideTypes: mockOverrideTypes.mockReturnValue(
        Promise.resolve({ data: [], error: null })
      ),
    });

    mockDelete.mockReturnValue({
      eq: mockEq.mockReturnValue(
        Promise.resolve({ error: null })
      ),
    });

    mockUpsert.mockReturnValue(
      Promise.resolve({ error: null })
    );

    // Spy on the real supabaseClient.from method
    fromSpy = vi.spyOn(supabaseClient, 'from').mockImplementation((table: string): any => {
      return {
        select: mockSelect,
        delete: mockDelete,
        eq: mockEq,
        upsert: mockUpsert,
      };
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    if (fromSpy) {
      fromSpy.mockRestore();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove item from cart when DB deletion succeeds', async () => {
    const cartItem: CartItem = { product, quantity: 2 };

    await service.addCartItem(product, 2);
    expect(service.cartItems()).toEqual([cartItem]);

    mockEq.mockReturnValue(Promise.resolve({ error: null }));

    await service.removeCartItem(product.id);

    expect(service.cartItems()).toEqual([]);
  });

  it('should not remove item from cart when DB deletion fails', async () => {
    const cartItem: CartItem = { product, quantity: 2 };

    await service.addCartItem(product, 2);
    expect(service.cartItems()).toEqual([cartItem]);

    const dbError = { message: 'Database delete failed' };
    mockEq.mockReturnValue(Promise.resolve({ error: dbError }));

    await service.removeCartItem(product.id);

    expect(service.cartItems()).toEqual([cartItem]);
  });

  it('should not add or update item in cart when DB save fails', async () => {
    const dbError = { message: 'Database save failed' };
    mockUpsert.mockReturnValue(Promise.resolve({ error: dbError }));

    await service.addCartItem(product, 2);

    expect(service.cartItems()).toEqual([]);
  });
});
