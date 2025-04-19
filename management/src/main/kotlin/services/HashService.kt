package com.education.services

import org.mindrot.jbcrypt.BCrypt

interface HashService {
    fun generateHash(input: String): String
    fun verifyHash(inputString: String, targetHash: String): Boolean
}

class HashServiceImpl : HashService {
    companion object {
        private const val SALT_ROUNDS = 12
    }

    override fun generateHash(input: String): String {
        val salt = BCrypt.gensalt(SALT_ROUNDS)
        return BCrypt.hashpw(input, salt)
    }

    override fun verifyHash(inputString: String, targetHash: String): Boolean {
        return try {
            BCrypt.checkpw(inputString, targetHash)
        } catch (e: IllegalArgumentException) {
            false
        }
    }
}