package auth

import (
	"dylanwe.com/api/database"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	_ "github.com/joho/godotenv/autoload"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"os"
	"time"
)

func AuthConfig() echojwt.Config {
	jwtSecret := os.Getenv("JWT_SECRET")

	return echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(JwtCustomClaims)
		},
		SigningKey: []byte(jwtSecret),
	}
}

func CreateToken(user database.User) (string, error) {
	claims := &JwtCustomClaims{
		ID:    user.Id,
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(15 * time.Minute)),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response
	jwtSecret := os.Getenv("JWT_SECRET")
	return token.SignedString([]byte(jwtSecret))
}

func CreateRefreshToken(user database.User) database.RefreshToken {
	refreshToken := database.RefreshToken{
		RefreshToken: uuid.NewString(),
		UserID:       user.Id,
		Expiration:   time.Now().Add(24 * time.Hour),
	}

	database.DB.Db.Create(&refreshToken)
	return refreshToken
}

func RemoveUsersRefreshTokens(user database.User) {
	var refreshTokens []database.RefreshToken
	database.DB.Db.Where("user_id = ?", user.Id).Find(&refreshTokens)
	database.DB.Db.Delete(&refreshTokens)
}

func IsRefreshExpired(tokenExpiration time.Time) bool {
	return time.Now().After(tokenExpiration)
}
