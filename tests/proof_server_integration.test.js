import assert from 'node:assert';
import { test } from 'node:test';

test('Midnight Proof Server Orchestration Check', { timeout: 300000 }, async () => {
  const maxRetries = 60;
  const retryInterval = 5000; // 5 seconds (up to 5 mins total)

  for (let i = 0; i < maxRetries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetch('http://127.0.0.1:6300/', { signal: controller.signal });
      clearTimeout(timeoutId);
      // The proof server might return a 404 for root, but that proves it's accepting HTTP requests!
      assert.ok(response.status >= 200, `Proof server is running (HTTP ${response.status})`);
      return; // Test passes
    } catch (error) {
      clearTimeout(timeoutId);
      if (i === maxRetries - 1) {
        assert.fail(`Proof Server connection failed after ${maxRetries} attempts: ${error.message}`);
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryInterval));
    }
  }
});
