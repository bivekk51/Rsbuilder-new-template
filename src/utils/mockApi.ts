// Mock API for testing
export const mockApi = {
  getData: () => 
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Data loaded successfully!',
          timestamp: new Date().toISOString(),
          items: [
            { id: 1, name: 'Item 1', value: 100 },
            { id: 2, name: 'Item 2', value: 200 },
            { id: 3, name: 'Item 3', value: 300 },
          ]
        });
      }, 10); // Simulate 1 second delay
    })
};
