package com.education

import com.education.configs.DBConfig
import com.education.configs.DataSource
import com.education.repositories.TeacherRepository
import com.education.repositories.TeacherRepositoryImpl
import com.education.repositories.UserRepository
import com.education.repositories.UserRepositoryImpl
import com.education.services.PasswordService
import com.education.services.PasswordServiceImpl
import com.education.services.UserService
import com.education.services.UserServiceImpl
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
            single<PasswordService> { PasswordServiceImpl() }
            single<UserRepository> { UserRepositoryImpl(get()) }
            single<TeacherRepository> { TeacherRepositoryImpl(get()) }
            single<UserService> { UserServiceImpl(get(), get()) }
        })
    }
}
