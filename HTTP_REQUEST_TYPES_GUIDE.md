# HTTP Request Types in Redux Saga Architecture

## **Where to Define Request Types: Complete Guide**

### **1. API Service Level** (`src/services/api.ts`) ✅ Already Done
**Purpose:** Define the HTTP client methods  
**You DON'T modify this usually - it's already set up**

```typescript
// Your apiClient already supports all HTTP methods:
apiClient.get(url, options)      // GET requests
apiClient.post(url, data)        // POST requests  
apiClient.put(url, data)         // PUT requests
apiClient.delete(url, options)   // DELETE requests
apiClient.request(url, options)  // Generic method (any HTTP verb)
```

### **2. API Constants Level** (`src/services/apiConstants.ts`) 
**Purpose:** Define endpoints and their expected request types

```typescript
export const APIEndPoints = {
  products: {
    GET_ALL_PRODUCTS: `${FAKE_STORE_API}/products`,     // GET
    CREATE_PRODUCT: `${FAKE_STORE_API}/products`,       // POST
    UPDATE_PRODUCT: `${FAKE_STORE_API}/products`,       // PUT + ID
    DELETE_PRODUCT: `${FAKE_STORE_API}/products`,       // DELETE + ID
  },
};

// Optional: Request configurations
export const APIRequestConfigs = {
  products: {
    GET_ALL_PRODUCTS: {
      method: 'GET' as const,
      requiresAuth: false,
      timeout: 10000,
    },
    CREATE_PRODUCT: {
      method: 'POST' as const,
      requiresAuth: true,
      timeout: 15000,
    },
  },
};
```

### **3. Saga Level** (`src/containers/*/saga.ts`) ⭐ **MAIN PLACE**
**Purpose:** THIS IS WHERE YOU ACTUALLY SPECIFY THE REQUEST TYPE

#### **A. GET Requests**
```typescript
function* fetchProductsSaga(): Generator<any, void, any> {
  try {
    // Method 1: Using specific GET method (recommended)
    const response = yield call(
      apiClient.get,  // ← REQUEST TYPE HERE
      APIEndPoints.products.GET_ALL_PRODUCTS
    );

    // Method 2: Using generic request method
    const response = yield call(
      apiClient.request,
      APIEndPoints.products.GET_ALL_PRODUCTS,
      { method: 'GET' }  // ← REQUEST TYPE HERE
    );
  } catch (error) {
    // handle error
  }
}
```

#### **B. POST Requests**
```typescript
function* createProductSaga(action: any): Generator<any, void, any> {
  try {
    const { productData } = action.payload;
    
    // Method 1: Using POST method (recommended)
    const response = yield call(
      apiClient.post,  // ← REQUEST TYPE HERE
      APIEndPoints.products.CREATE_PRODUCT,
      productData  // ← REQUEST BODY
    );

    // Method 2: Using generic request method
    const response = yield call(
      apiClient.request,
      APIEndPoints.products.CREATE_PRODUCT,
      {
        method: 'POST',  // ← REQUEST TYPE HERE
        body: JSON.stringify(productData),
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    // handle error
  }
}
```

#### **C. PUT Requests (Update)**
```typescript
function* updateProductSaga(action: any): Generator<any, void, any> {
  try {
    const { productId, updateData } = action.payload;
    
    const response = yield call(
      apiClient.put,  // ← REQUEST TYPE HERE
      `${APIEndPoints.products.UPDATE_PRODUCT}/${productId}`,
      updateData  // ← REQUEST BODY
    );
  } catch (error) {
    // handle error
  }
}
```

#### **D. DELETE Requests**
```typescript
function* deleteProductSaga(action: any): Generator<any, void, any> {
  try {
    const { productId } = action.payload;
    
    yield call(
      apiClient.delete,  // ← REQUEST TYPE HERE
      `${APIEndPoints.products.DELETE_PRODUCT}/${productId}`
    );
  } catch (error) {
    // handle error
  }
}
```

#### **E. Requests with Authentication**
```typescript
function* authenticatedRequestSaga(): Generator<any, void, any> {
  try {
    const token = yield select(getAuthToken); // Get token from state
    
    const response = yield call(
      apiClient.request,
      APIEndPoints.products.CREATE_PRODUCT,
      {
        method: 'POST',  // ← REQUEST TYPE
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // ← AUTH HEADER
        }
      }
    );
  } catch (error) {
    // handle error
  }
}
```

#### **F. Requests with Query Parameters**
```typescript
function* searchProductsSaga(action: any): Generator<any, void, any> {
  try {
    const { searchTerm, category, limit } = action.payload;
    
    // Build URL with query parameters
    const url = `${APIEndPoints.products.GET_ALL_PRODUCTS}?` +
      `search=${encodeURIComponent(searchTerm)}&` +
      `category=${encodeURIComponent(category)}&` +
      `limit=${limit}`;
    
    const response = yield call(
      apiClient.get,  // ← REQUEST TYPE
      url
    );
  } catch (error) {
    // handle error
  }
}
```

## **Complete Flow Example: Adding a New PATCH Request**

### Step 1: Add to Constants
```typescript
// src/services/apiConstants.ts
export const APIEndPoints = {
  products: {
    // ... existing endpoints
    PATCH_PRODUCT: `${FAKE_STORE_API}/products`,  // PATCH + ID
  },
};
```

### Step 2: Add to API Client (if needed)
```typescript
// src/services/api.ts - Usually not needed, but if you want a specific method:
patch<T>(
  url: string,
  data: any,
  options: RequestInit = {},
  timeout?: number
): Promise<T> {
  return this.request<T>(
    url,
    {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    },
    timeout
  );
}
```

### Step 3: Add Constants
```typescript
// src/containers/Home/constants.ts
const homeConstants = {
  // ... existing constants
  PATCH_PRODUCT: `${constantKey}/PATCH_PRODUCT`,
  PATCH_PRODUCT_SUCCESS: `${constantKey}/PATCH_PRODUCT_SUCCESS`,
  PATCH_PRODUCT_ERROR: `${constantKey}/PATCH_PRODUCT_ERROR`,
};
```

### Step 4: Add Actions
```typescript
// src/containers/Home/actions.ts
export const patchProduct = createAction(
  homeConstants.PATCH_PRODUCT,
  function prepare(productId: number, patchData: any) {
    return { payload: { productId, patchData } };
  }
);
```

### Step 5: Add Saga
```typescript
// src/containers/Home/saga.ts
function* patchProductSaga(action: any): Generator<any, void, any> {
  try {
    const { productId, patchData } = action.payload;
    
    const response = yield call(
      apiClient.patch,  // ← REQUEST TYPE HERE (or use apiClient.request with method: 'PATCH')
      `${APIEndPoints.products.PATCH_PRODUCT}/${productId}`,
      patchData
    );
    
    yield put(patchProductSuccess(response));
  } catch (error) {
    yield put(patchProductError(error.message));
  }
}

// Add watcher
export default function* homeSaga() {
  // ... existing watchers
  yield takeLatest(homeConstants.PATCH_PRODUCT, patchProductSaga);
}
```

## **Key Points:**

1. **Main Location:** The **Saga** is where you specify `method: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'`
2. **API Client:** Provides the HTTP methods - you rarely modify this
3. **Constants:** Document what type each endpoint expects
4. **Flexibility:** You can use either specific methods (`apiClient.get`) or generic (`apiClient.request` with method)
5. **Headers:** Add authentication, content-type, etc. in the saga
6. **Body:** POST/PUT/PATCH requests need data in the request body
7. **URL Parameters:** GET/DELETE often use ID in the URL path

The **saga** is your control center for HTTP requests! 🎯
