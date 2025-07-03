package com.education

import com.education.configs.DBConfig
import com.education.configs.DataSource
import com.education.repositories.*
import com.education.services.*
import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import configs.JWTConfig
import io.ktor.server.application.*
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

fun Application.configureFrameworks(jwtConfig: JWTConfig) {
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
            single<HashService> { HashServiceImpl() }
            single<UserRepository> { UserRepositoryImpl(get()) }
            single<TeacherRepository> { TeacherRepositoryImpl(get()) }
            single<StudentAttendanceRepository> { StudentAttendanceRepositoryImpl(get()) }
            single<ClassLevelRepository> { ClassLevelRepositoryImpl(get()) }
            single<ShiftRepository> { ShiftRepositoryImpl(get()) }
            single<UserService> { UserServiceImpl(get(), get()) }
            single<IdentityService> { IdentityServiceImpl(get(), get(), jwtConfig) }
            single<StudentRepository> { StudentRepositoryImpl(get()) }
            single<StudentService> { StudentServiceImpl(get()) }
            single<ClassLevelService> { ClassLevelServiceImpl(get()) }
            single<ShiftService> { ShiftServiceImpl(get()) }
        })
    }
}