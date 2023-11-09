package database

import (
	"time"
)

type User struct {
	Id       uint   `json:"id" gorm:"primaryKey autoIncrement"`
	Email    string `json:"email"`
	Password string `json:"password"`
	ToDos    []ToDo `json:"-"`
}

type ToDo struct {
	Id          uint   `json:"id" gorm:"primaryKey autoIncrement"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
	UserID      uint   `json:"-"`
}

type RefreshToken struct {
	Id           uint      `json:"id" gorm:"primaryKey autoIncrement"`
	RefreshToken string    ` json:"refreshToken" gorm:"unique"`
	UserID       uint      `json:"-"`
	Expiration   time.Time `json:"expiration"`
}
