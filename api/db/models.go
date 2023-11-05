package db

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Email    string `json:"email"`
	Password string `json:"password"`
	ToDos    []ToDo `json:"-"`
}

type ToDo struct {
	gorm.Model
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
	UserID      uint   `json:"-"`
}

type RefreshToken struct {
	gorm.Model
	RefreshToken string    ` json:"refreshToken" gorm:"unique"`
	UserID       uint      `json:"-"`
	Expiration   time.Time `json:"expiration"`
}
