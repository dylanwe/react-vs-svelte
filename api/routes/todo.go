package routes

import (
	"dylanwe.com/api/auth"
	"dylanwe.com/api/db"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

func ToDoRoutes(router *echo.Group, con *gorm.DB) {
	router.GET("", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		var todos []db.ToDo
		con.Where("user_id = ?", userId).Find(&todos)
		return c.JSON(http.StatusOK, todos)
	})

	router.POST("", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		todo := db.ToDo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}

		todo.UserID = userId
		con.Create(&todo)
		return c.JSON(http.StatusCreated, todo)
	})

	router.PUT("/:id", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		todo := db.ToDo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}

		todo.UserID = userId
		con.Save(&todo)
		return c.JSON(http.StatusOK, todo)
	})

	router.DELETE("/:id", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		todo := db.ToDo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}

		todo.UserID = userId
		con.Delete(&todo)
		return c.JSON(http.StatusOK, todo)
	})
}
