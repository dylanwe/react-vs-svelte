package routes

import (
	"dylanwe.com/api/auth"
	"github.com/golang-jwt/jwt/v5"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"net/http"
	"os"
	"time"
)

type User struct {
	gorm.Model
	Email    string `json:"email"`
	Password string `json:"password"`
	ToDos    []ToDo `json:"-"`
}

type registerRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func AuthRoutes(router *echo.Group, db *gorm.DB) {
	router.POST("/register", func(c echo.Context) error {
		// get email and password from request body instead of form
		req := new(registerRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		// check if email already exists
		var user User
		db.Where("email = ?", req.Email).First(&user)
		if user.ID != 0 {
			return echo.ErrBadRequest
		}

		// hash the password
		bytes, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 14)

		// create user
		newUser := User{
			Email:    req.Email,
			Password: string(bytes),
		}

		// save user to db
		db.Create(&newUser)

		// Set custom claims
		claims := &auth.JwtCustomClaims{
			ID:    newUser.ID,
			Email: newUser.Email,
			RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			},
		}

		// Create token with claims
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

		// Generate encoded token and send it as response
		jwtSecret := os.Getenv("JWT_SECRET")
		t, err := token.SignedString([]byte(jwtSecret))
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, echo.Map{
			"token": t,
		})
	})

	router.POST("/login", func(c echo.Context) error {
		// get email and password from request body instead of form
		req := new(loginRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		var user User
		db.Where("email = ?", req.Email).First(&user)
		if user.ID == 0 {
			return echo.ErrUnauthorized
		}

		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
		if err != nil {
			return echo.ErrUnauthorized
		}

		// Set custom claims
		claims := &auth.JwtCustomClaims{
			ID:    user.ID,
			Email: user.Email,
			RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			},
		}

		// Create token with claims
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

		// Generate encoded token and send it as response
		jwtSecret := os.Getenv("JWT_SECRET")
		t, err := token.SignedString([]byte(jwtSecret))
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, echo.Map{
			"token": t,
		})
	})
}
