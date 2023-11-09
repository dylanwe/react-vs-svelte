package routes

import (
	"dylanwe.com/api/auth"
	"dylanwe.com/api/database"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"net/http"
)

func ToDoRoutes(router *echo.Group) {
	router.GET("", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		var todos []database.ToDo
		database.DB.Db.Where("user_id = ?", userId).Find(&todos)
		return c.JSON(http.StatusOK, todos)
	})

	router.POST("", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		todo := database.ToDo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}

		todo.UserID = userId
		database.DB.Db.Create(&todo)
		return c.JSON(http.StatusCreated, todo)
	})

	router.PUT("/:id", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*auth.JwtCustomClaims)
		userId := claims.ID

		todo := database.ToDo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}

		todo.UserID = userId
		database.DB.Db.Save(&todo)
		return c.JSON(http.StatusOK, todo)
	})

	router.DELETE("/:id", func(c echo.Context) error {
		id := c.Param("id")
		var todo database.ToDo
		database.DB.Db.Where("id = ?", id).First(&todo)
		database.DB.Db.Delete(&todo)

		return c.JSON(http.StatusOK, todo)
	})
}
