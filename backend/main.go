package main

import (
	// "db"
	// "handlers"
	// "repositories"
	// "usecases"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// dbConn := db.NewDB()

	// tweetRepo := repositories.NewTweetRepository(dbConn)
	// tweetUsecase := usecases.NewTweetUsecase(tweetRepo)
	// tweetHandler := handlers.NewTweetHandler(tweetUsecase)

	router := gin.Default()

	// ミドルウェアの設定
	router.Use(cors.New(cors.Config{
		// 許可するオリジン
		AllowOrigins: []string{"https://x.com"},
		// 許可するメソッド
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		// 許可するヘッダー
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ok",
		})
	})
	// router.POST("/api/tweets", tweetHandler.Create)
	// router.GET("/api/tweets", tweetHandler.GetAll)
	router.Run() // デフォルトで0.0.0.0:8080で待機します http://localhost:8080
}
