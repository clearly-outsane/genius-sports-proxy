import httpProxy from "http-proxy";

export const proxy = httpProxy.createProxyServer({
  /**
   * Get the actual back-end service url from env variables.
   * We shouldn't prefix the env variable with NEXT_PUBLIC_* to avoid exposing it to the client.
   */
  target: process.env.SERVICE_URL,
  autoRewrite: false,
  changeOrigin: true,
});
