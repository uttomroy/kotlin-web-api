package com.education.services

import com.education.repositories.UserRepository
import routes.LoginRequest

interface UserService{
    suspend fun isValidUser(loginRequest: LoginRequest): Boolean
    suspend fun generatePasswordHash(password: String): String
}

class UserServiceImpl (private val userRepository: UserRepository, private val passwordService: PasswordService): UserService {
    override suspend fun isValidUser(loginRequest: LoginRequest): Boolean {
        userRepository.getUserByEmail(loginRequest.username)?.let { user ->
            return passwordService.verifyPassword(loginRequest.password, user.password)
        }
        return false
    }

    override suspend fun generatePasswordHash(password: String): String {
        return passwordService.hashPassword(password)
    }
}