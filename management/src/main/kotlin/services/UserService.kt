package com.education.services

import com.education.repositories.UserRepository
import com.education.routes.public.LoginRequest

interface UserService{
    suspend fun generatePasswordHash(password: String): String
}

class UserServiceImpl (private val userRepository: UserRepository, private val passwordService: HashService): UserService {
    override suspend fun generatePasswordHash(password: String): String {
        return passwordService.generateHash(password)
    }
}