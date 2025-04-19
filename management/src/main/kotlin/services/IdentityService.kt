package com.education.services

import com.education.enums.ROLE
import com.education.repositories.UserRepository
import configs.JWTConfig
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import com.education.routes.public.LoginRequest

interface IdentityService {
    suspend fun generateTokenForValidUser(loginRequest: LoginRequest): String
    suspend fun userHasRequiredPermission(call: ApplicationCall, orgId: Int, roles: List<ROLE>): Boolean
}

class IdentityServiceImpl(private val userRepository: UserRepository,
                          private val hashService: HashService, private val jwtConfig: JWTConfig): IdentityService {

    override suspend fun generateTokenForValidUser(loginRequest: LoginRequest): String {
        val userInfo = userRepository.getUserByEmailAndOrgId(loginRequest.username, loginRequest.organizationId)
        if(userInfo != null && hashService.verifyHash(loginRequest.password, userInfo.password)){
            return jwtConfig.generateToken(userInfo)
        }
        return ""
    }

    override suspend fun userHasRequiredPermission(call: ApplicationCall, orgId: Int, roles: List<ROLE>): Boolean {
        val principal = call.principal<JWTPrincipal>() ?: return false
        return jwtConfig.userHasOrgAccess(principal, orgId) && jwtConfig.isUserInRole(principal, roles.map { it.value })
    }
}