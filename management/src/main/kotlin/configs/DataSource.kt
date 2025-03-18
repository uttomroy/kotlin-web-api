package com.education.configs


import com.typesafe.config.Config
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.transaction

class DataSource (config: DBConfig) {
    private val dataSource1: HikariDataSource
    private val POOL_SIZE: Int = 10

    init {
        val config1 = HikariConfig().apply {
            jdbcUrl = config.url
            driverClassName = config.driver
            username = config.user
            password = config.password
            maximumPoolSize = POOL_SIZE
            isAutoCommit = false
            transactionIsolation = "TRANSACTION_REPEATABLE_READ"
            validate()
        }
        dataSource1 = HikariDataSource(config1)
        Database.connect(dataSource1)
    }

    fun <T> dbQuery1(block: () -> T): T =
        transaction(Database.connect(dataSource1)) {
            block()
        }
}