const express = require("express");
const next = require("next");
const routes = require("../routes");
const multer = require("multer");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const db = require('./database');
db.connect();

app.prepare().then(() => {
    const server = express();

    require('./middlewares').init(server, db);

    const apolloServer = require('./graphql').createApolloServer();
    apolloServer.applyMiddleware({ app: server })

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'static/images/portfolios');
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });
    
    const upload = multer({ storage: storage}).single('file');
    
    server.post('/upload', function(req, res) {
        console.log('upload')
        upload(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                res.status(500).json(err)
            }
            return res.status(200).send(req.file);
        });
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});