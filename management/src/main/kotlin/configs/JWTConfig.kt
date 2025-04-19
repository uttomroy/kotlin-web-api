package configs

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.education.enums.ROLE
import com.education.models.UserDAO
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.application.*

class JWTConfig(private val environment: ApplicationEnvironment) {
    private val secret = environment.config.property("ktor.jwt.secret").getString()
    private val issuer = environment.config.property("ktor.jwt.issuer").getString()
    val audience = environment.config.property("ktor.jwt.audience").getString()
    private val realm = environment.config.property("ktor.jwt.realm").getString()

    // Token expiry time
    private val tokenExpiry = 30L * 60 * 1000 // 30 minutes in milliseconds

    fun configureJWT(config: JWTAuthenticationProvider.Config) {
        config.verifier(
            JWT
                .require(Algorithm.HMAC256(secret))
                .withAudience(audience)
                .withIssuer(issuer)
                .build()
        )
        config.validate { credential ->
            try {
                // Check if token has expired
                val expiresAt = credential.payload.expiresAt.time
                val currentTime = System.currentTimeMillis()
                
                if (currentTime > expiresAt) {
                    null  // Token has expired
                } else if (credential.payload.audience.contains(audience)) {
                    JWTPrincipal(credential.payload)
                } else {
                    null
                }
            } catch (e: Exception) {
                null
            }
        }
        config.realm = realm
    }

    fun generateToken(userInfo: UserDAO): String = JWT.create()
        .withAudience(audience)
        .withIssuer(issuer)
        .withClaim("userId", userInfo.userId)
        .withClaim("roles", userInfo.roles.map { it.roleId })
        .withClaim("org_id", userInfo.organizationId)
        .withExpiresAt(java.util.Date(System.currentTimeMillis() + tokenExpiry))
        .withIssuedAt(java.util.Date())
        .sign(Algorithm.HMAC256(secret))

    fun isUserInRole(principal: JWTPrincipal, requiredRole: List<Int>): Boolean {
        return principal.payload.getClaim("roles").asList(String::class.java).any() { role ->
            requiredRole.contains(role.toInt())
        }
    }

    fun userHasOrgAccess(principal: JWTPrincipal, orgId: Int): Boolean {
        return principal.payload.getClaim("org_id").asInt() == orgId
    }
} 