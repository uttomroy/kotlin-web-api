package com.education.models

import kotlinx.serialization.Serializable

@Serializable
data class TestModel(
    val id: Int? = null,
    val name: String,
    val age: Int  
)
