package routes

import (
	"dylanwe.com/api/auth"
	"dylanwe.com/api/database"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type registerRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type refreshRequest struct {
	RefreshToken string `json:"refreshToken"`
}

type jwtResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
}

func AuthRoutes(router *echo.Group) {
	router.POST("/register", func(c echo.Context) error {
		req := new(registerRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		var user database.User
		database.DB.Where("email = ?", req.Email).First(&user)
		if user.Id != 0 {
			return c.JSON(http.StatusConflict, echo.Map{
				"message": "Email already exists",
			})
		}

		bytes, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 14)

		newUser := database.User{
			Email:    req.Email,
			Password: string(bytes),
		}

		database.DB.Create(&newUser)

		t, err := auth.CreateToken(newUser)
		if err != nil {
			return err
		}

		auth.RemoveUsersRefreshTokens(user)
		refreshToken := auth.CreateRefreshToken(newUser)

		return c.JSON(http.StatusOK, jwtResponse{
			Token:        t,
			RefreshToken: refreshToken.RefreshToken,
		})
	})

	router.POST("/login", func(c echo.Context) error {
		// get email and password from request body instead of form
		req := new(loginRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		var user database.User
		database.DB.Where("email = ?", req.Email).First(&user)
		if user.Id == 0 {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"message": "Email does not exist",
			})
		}

		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
		if err != nil {
			return echo.ErrUnauthorized
		}

		t, err := auth.CreateToken(user)
		if err != nil {
			return err
		}

		auth.RemoveUsersRefreshTokens(user)
		refreshToken := auth.CreateRefreshToken(user)

		return c.JSON(http.StatusOK, jwtResponse{
			Token:        t,
			RefreshToken: refreshToken.RefreshToken,
		})
	})

	router.POST("/refresh", func(c echo.Context) error {
		req := new(refreshRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		var refreshToken database.RefreshToken
		database.DB.Where("refresh_token = ?", req.RefreshToken).First(&refreshToken)
		if refreshToken.Id == 0 {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"message": "Invalid refresh token",
			})
		}

		var user database.User
		database.DB.Where("id = ?", refreshToken.UserID).First(&user)
		if user.Id == 0 {
			return c.JSON(http.StatusUnauthorized, echo.Map{
				"message": "Invalid refresh token",
			})
		}

		if auth.IsRefreshExpired(refreshToken.Expiration) {
			database.DB.Delete(&refreshToken)

			return c.JSON(http.StatusUnauthorized, echo.Map{
				"message": "Refresh token expired",
			})
		}

		auth.RemoveUsersRefreshTokens(user)
		newRefreshToken := auth.CreateRefreshToken(user)

		t, err := auth.CreateToken(user)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, jwtResponse{
			Token:        t,
			RefreshToken: newRefreshToken.RefreshToken,
		})
	})
}
