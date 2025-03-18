package com.education.configs

import com.typesafe.config.Config

data class DBConfig(
    val url: String,
    val driver: String,
    val user: String,
    val password: String
){
    companion object {
        fun loadConfig(config: Config): DBConfig {
            val conf = config.getConfig("dbConfig")
            return DBConfig(
                url = conf.getString("url"),
                driver = conf.getString("driver"),
                user = conf.getString("user"),
                password = conf.getString("password")
            )
        }
    }
}
