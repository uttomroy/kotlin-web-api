package com.education

import com.education.configs.DBConfig
import com.education.configs.DataSource
import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import io.ktor.server.application.*
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

fun Application.configureFrameworks() {
    install(Koin) {
        slf4jLogger()
        modules(module {
            single<Config> {
                ConfigFactory.load()
            }
            single<DBConfig> { DBConfig.loadConfig(get()) }
            single<DataSource> { DataSource(get()) }
            single<HelloService> {
                HelloService {
                    println(environment.log.info("Hello, World!"))
                }
            }
        })
    }
}
