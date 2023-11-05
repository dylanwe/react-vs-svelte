package auth

import "github.com/golang-jwt/jwt/v5"

type JwtCustomClaims struct {
	ID    uint   `json:"id"`
	Email string `json:"email"`
	jwt.RegisteredClaims
}
