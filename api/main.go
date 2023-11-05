package main

import (
	"dylanwe.com/api/auth"
	"dylanwe.com/api/db"
	"dylanwe.com/api/routes"
	_ "github.com/joho/godotenv/autoload"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

func main() {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	dsn := "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " port=5432 sslmode=disable"
	con, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	con.AutoMigrate(
		&db.User{},
		&db.ToDo{},
		&db.RefreshToken{},
	)

	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())

	// JWT auth
	jwtAuth := auth.AuthConfig()
	api := e.Group("/api/v1")
	routes.AuthRoutes(api.Group("/auth"), con)
	todos := api.Group("/todos")
	todos.Use(echojwt.WithConfig(jwtAuth))
	routes.ToDoRoutes(todos, con)

	e.Logger.Fatal(e.Start(":8080"))
}
