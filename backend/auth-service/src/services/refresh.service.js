const RefreshToken = require("../models/refreshToken.model");

const {
    generateAccessToken,
    generateRefreshToken,
    hashRefreshToken
} = require("../utils/token");

const UnauthorizedError =
    require("../../../user-service/src/errors/UnauthorizedError");

const REFRESH_TOKEN_TTL_MS =
    7 * 24 * 60 * 60 * 1000;

const rotateRefreshToken = async (rawToken, userClient) => {
    console.log(rawToken);
    if (!rawToken) {
        throw new UnauthorizedError(
            "Refresh token required"
        );
    }

    const oldHash = hashRefreshToken(rawToken);

    const currentToken = await RefreshToken.findOne({
        tokenHash: oldHash
    });

    if (!currentToken) {
        throw new UnauthorizedError(
            "Invalid refresh token"
        );
    }

    if (
        currentToken.revokedAt ||
        currentToken.expiresAt <= new Date()
    ) {
        throw new UnauthorizedError(
            "Refresh token expired or revoked"
        );
    }

    const user = await userClient.getUserById(
        currentToken.userId
    );

    if (!user) {
        throw new UnauthorizedError(
            "Invalid refresh token"
        );
    }

    const newRawToken = generateRefreshToken();

    const newHash = hashRefreshToken(newRawToken);

    const newExpiresAt = new Date(
        Date.now() + REFRESH_TOKEN_TTL_MS
    );

    // Atomically claim the old token.
    const claimedToken = await RefreshToken.findOneAndUpdate(
        {
            _id: currentToken._id,
            revokedAt: null,
            expiresAt: { $gt: new Date() }
        },
        {
            $set: {
                revokedAt: new Date(),
                replacedByTokenHash: newHash
            }
        },
        {
            new: false
        }
    );

    if (!claimedToken) {
        throw new UnauthorizedError(
            "Refresh token has already been used"
        );
    }

    try {
        await RefreshToken.create({
            userId: currentToken.userId,
            tokenHash: newHash,
            familyId: currentToken.familyId,
            expiresAt: newExpiresAt
        });
    } catch (error) {
        // The old token is already revoked. Fail closed.
        throw error;
    }

    const accessToken = generateAccessToken(user);

    return {
        accessToken,
        refreshToken: newRawToken
    };
};

module.exports = {
    rotateRefreshToken
};