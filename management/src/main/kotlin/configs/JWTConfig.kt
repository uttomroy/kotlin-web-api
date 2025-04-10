package configs

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.application.*

class JWTConfig(private val environment: ApplicationEnvironment) {
    private val secret = environment.config.property("ktor.jwt.secret").getString()
    private val issuer = environment.config.property("ktor.jwt.issuer").getString()
    private val audience = environment.config.property("ktor.jwt.audience").getString()
    private val realm = environment.config.property("ktor.jwt.realm").getString()

    fun configureJWT(config: JWTAuthenticationProvider.Config) {
        config.verifier(
            JWT
                .require(Algorithm.HMAC256(secret))
                .withAudience(audience)
                .withIssuer(issuer)
                .build()
        )
        config.validate { credential ->
            if (credential.payload.audience.contains(audience)) {
                JWTPrincipal(credential.payload)
            } else null
        }
        config.realm = realm
    }

    fun generateToken(userId: String): String = JWT.create()
        .withAudience(audience)
        .withIssuer(issuer)
        .withClaim("userId", userId)
        .sign(Algorithm.HMAC256(secret))
} 