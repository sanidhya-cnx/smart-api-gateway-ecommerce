const internalOnly = (req, res, next) => {
    const internalKey = req.headers["x-internal-secret"];
    const expectedKey = process.env.INTERNAL_SERVICE_SECRET || "internal-secret-key-123";

    if (!internalKey || internalKey !== expectedKey) {
        return res.status(403).json({
            success: false,
            message: "Forbidden: Internal service access only"
        });
    }

    next();
};

module.exports = internalOnly;
