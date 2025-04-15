package com.education.services

import org.mindrot.jbcrypt.BCrypt

interface PasswordService {
    fun hashPassword(plainPassword: String): String
    fun verifyPassword(plainPassword: String, hashedPassword: String): Boolean
}

class PasswordServiceImpl : PasswordService {
    companion object {
        private const val SALT_ROUNDS = 12
    }

    override fun hashPassword(plainPassword: String): String {
        val salt = BCrypt.gensalt(SALT_ROUNDS)
        return BCrypt.hashpw(plainPassword, salt)
    }

    override fun verifyPassword(plainPassword: String, hashedPassword: String): Boolean {
        return try {
            BCrypt.checkpw(plainPassword, hashedPassword)
        } catch (e: IllegalArgumentException) {
            false
        }
    }
}