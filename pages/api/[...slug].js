import httpProxyMiddleware from "next-http-proxy-middleware";
import Cors from "cors";
import httpProxy from "http-proxy";
import NextCors from "nextjs-cors";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const proxy = httpProxy.createProxyServer();
export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  console.log(req.query);
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  return new Promise((resolve, reject) => {
    req.url = req.url.replace("/api", "/");

    proxy.web(
      req,
      res,
      {
        target: "https://api.wh.geniussports.com/v1",
        changeOrigin: true,
        headers: {
          "Content-Type": "application/json",
          "Referrer-Policy": "no-referrer-when-downgrade",
          Accept: "application/json",
        },
      },
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};
