package com.example.myapp

import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import org.json.JSONObject
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread

class RegisterActivity : AppCompatActivity() {

    private lateinit var firstNameInput: TextInputEditText
    private lateinit var lastNameInput: TextInputEditText
    private lateinit var emailInput: TextInputEditText
    private lateinit var passwordInput: TextInputEditText
    private lateinit var registerButton: MaterialButton
    private lateinit var errorMessage: TextView
    private lateinit var loginLink: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        // Initialize views
        firstNameInput = findViewById(R.id.firstNameInput)
        lastNameInput = findViewById(R.id.lastNameInput)
        emailInput = findViewById(R.id.emailInput)
        passwordInput = findViewById(R.id.passwordInput)
        registerButton = findViewById(R.id.registerButton)
        errorMessage = findViewById(R.id.errorMessage)
        loginLink = findViewById(R.id.loginLink)

        // Register button click listener
        registerButton.setOnClickListener {
            performRegister()
        }

        // Login link click listener
        loginLink.setOnClickListener {
            finish() // Go back to LoginActivity
        }
    }

    private fun performRegister() {
        val firstName = firstNameInput.text.toString().trim()
        val lastName = lastNameInput.text.toString().trim()
        val email = emailInput.text.toString().trim()
        val password = passwordInput.text.toString().trim()

        // Validation
        if (firstName.isEmpty() || lastName.isEmpty() || email.isEmpty() || password.isEmpty()) {
            showError("Please fill in all fields")
            return
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            showError("Please enter a valid email")
            return
        }

        if (password.length < 6) {
            showError("Password must be at least 6 characters")
            return
        }

        registerButton.isEnabled = false
        errorMessage.visibility = android.view.View.GONE

        // Make network request in background thread
        thread {
            try {
                val url = URL("http://10.0.2.2:8080/api/auth/register")
                val httpConnection = url.openConnection() as HttpURLConnection

                httpConnection.requestMethod = "POST"
                httpConnection.setRequestProperty("Content-Type", "application/json")
                httpConnection.doOutput = true

                // Create JSON request body
                val jsonRequest = JSONObject()
                jsonRequest.put("firstName", firstName)
                jsonRequest.put("lastName", lastName)
                jsonRequest.put("email", email)
                jsonRequest.put("password", password)

                // Send request
                val outputStream = OutputStreamWriter(httpConnection.outputStream)
                outputStream.write(jsonRequest.toString())
                outputStream.flush()
                outputStream.close()

                // Get response
                val responseCode = httpConnection.responseCode

                if (responseCode == HttpURLConnection.HTTP_OK) {
                    // Registration successful
                    runOnUiThread {
                        Toast.makeText(this@RegisterActivity, "Registration successful. Please log in.", Toast.LENGTH_SHORT).show()
                        finish() // Go back to LoginActivity
                    }
                } else if (responseCode == HttpURLConnection.HTTP_BAD_REQUEST) {
                    val inputStream = httpConnection.errorStream
                    val errorResponse = inputStream.bufferedReader().use { it.readText() }
                    runOnUiThread {
                        showError(errorResponse)
                    }
                } else {
                    runOnUiThread {
                        showError("Registration failed. Status code: $responseCode")
                    }
                }

                httpConnection.disconnect()
            } catch (e: Exception) {
                runOnUiThread {
                    showError("Connection error: ${e.message}")
                }
            } finally {
                runOnUiThread {
                    registerButton.isEnabled = true
                }
            }
        }
    }

    private fun showError(message: String) {
        errorMessage.text = message
        errorMessage.visibility = android.view.View.VISIBLE
    }
}
