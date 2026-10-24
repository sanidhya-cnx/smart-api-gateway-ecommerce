const crypto = require("crypto");

const RefreshToken = require("../models/refreshToken.model");
const {
    generateRefreshToken,
    hashRefreshToken
} = require("../utils/token");

const REFRESH_TOKEN_TTL_MS =
    7 * 24 * 60 * 60 * 1000;

const createRefreshToken = async (userId) => {
    const rawToken = generateRefreshToken();
    const tokenHash = hashRefreshToken(rawToken);
    const familyId = crypto.randomUUID();
    const expiresAt = new Date(
        Date.now() + REFRESH_TOKEN_TTL_MS
    );

    await RefreshToken.create({
        userId: String(userId),
        tokenHash,
        familyId,
        expiresAt
    });

    return rawToken;
};


const revokeRefreshToken = async (rawToken) => {
  if (!rawToken) {
    return;
  }
  const tokenHash = hashRefreshToken(rawToken);
  await RefreshToken.findOneAndUpdate(
    {
      tokenHash,
      revokedAt: null
    },
    {
      $set: {
        revokedAt: new Date()
      }
    }
  );
};

module.exports = {
    createRefreshToken,
    revokeRefreshToken
};