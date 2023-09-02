constants={
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

//refresh Token lerin tutulacağı bir dizi oluşturuldu
const refreshTokens = [];

module.exports = {constants,refreshTokens}