import httpProxyMiddleware from "next-http-proxy-middleware";
import Cors from "cors";
import httpProxy from "http-proxy";

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
export default (req, res) => {
  console.log(req.query);

  return new Promise((resolve, reject) => {
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
