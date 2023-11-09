package main

import (
	"dylanwe.com/api/auth"
	"dylanwe.com/api/database"
	"dylanwe.com/api/routes"
	_ "github.com/joho/godotenv/autoload"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func setupRoutes(e *echo.Echo) {
	jwtAuth := auth.AuthConfig()
	api := e.Group("/api/v1")
	routes.AuthRoutes(api.Group("/auth"))
	todos := api.Group("/todos")
	todos.Use(echojwt.WithConfig(jwtAuth))
	routes.ToDoRoutes(todos)
}

func main() {
	database.Connect()
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.CORS())

	setupRoutes(e)

	e.Logger.Fatal(e.Start(":8080"))
}
