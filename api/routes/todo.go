package routes

import (
	"dylanwe.com/api/auth"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

type ToDo struct {
	gorm.Model
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
	UserID      uint   `json:"-"`
}

func ToDoRoutes(router *echo.Group, db *gorm.DB) {
	router.GET("", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		var todos []ToDo
		db.Where("user_id = ?", userId).Find(&todos)
		return c.JSON(http.StatusOK, todos)
	})

	router.POST("", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		todo := ToDo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}

		todo.UserID = userId
		db.Create(&todo)
		return c.JSON(http.StatusCreated, todo)
	})

	router.PUT("/:id", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		todo := ToDo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}

		todo.UserID = userId
		db.Save(&todo)
		return c.JSON(http.StatusOK, todo)
	})

	router.DELETE("/:id", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		todo := ToDo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}

		todo.UserID = userId
		db.Delete(&todo)
		return c.JSON(http.StatusOK, todo)
	})
}
