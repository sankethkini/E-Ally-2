const logger = (req, res, next) => {
    console.log(`Endpoint hit:\t${req.url}\t${req.method}`);
    next();
};

module.exports = logger;