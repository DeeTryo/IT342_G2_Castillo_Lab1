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

class LoginActivity : AppCompatActivity() {

    private lateinit var emailInput: TextInputEditText
    private lateinit var passwordInput: TextInputEditText
    private lateinit var loginButton: MaterialButton
    private lateinit var errorMessage: TextView
    private lateinit var signupLink: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // Initialize views
        emailInput = findViewById(R.id.emailInput)
        passwordInput = findViewById(R.id.passwordInput)
        loginButton = findViewById(R.id.loginButton)
        errorMessage = findViewById(R.id.errorMessage)
        signupLink = findViewById(R.id.signupLink)

        // Login button click listener
        loginButton.setOnClickListener {
            performLogin()
        }

        // Signup link click listener
        signupLink.setOnClickListener {
            // Navigate to RegisterActivity (will create this later)
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    private fun performLogin() {
        val email = emailInput.text.toString().trim()
        val password = passwordInput.text.toString().trim()

        // Validation
        if (email.isEmpty() || password.isEmpty()) {
            showError("Please fill in all fields")
            return
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            showError("Please enter a valid email")
            return
        }

        loginButton.isEnabled = false
        errorMessage.visibility = android.view.View.GONE

        // Make network request in background thread
        thread {
            try {
                val url = URL("http://10.0.2.2:8080/api/auth/login") // 10.0.2.2 is for Android emulator to access localhost
                val httpConnection = url.openConnection() as HttpURLConnection

                httpConnection.requestMethod = "POST"
                httpConnection.setRequestProperty("Content-Type", "application/json")
                httpConnection.doOutput = true

                // Create JSON request body
                val jsonRequest = JSONObject()
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
                    // Parse response
                    val inputStream = httpConnection.inputStream
                    val response = inputStream.bufferedReader().use { it.readText() }
                    val jsonResponse = JSONObject(response)

                    // Store user data in SharedPreferences
                    val sharedPref = getSharedPreferences("user_prefs", MODE_PRIVATE)
                    sharedPref.edit().apply {
                        putString("user_data", response)
                        putString("email", email)
                        putString("firstName", jsonResponse.optString("firstName", ""))
                        putBoolean("isLoggedIn", true)
                        apply()
                    }

                    // Navigate to MainActivity
                    runOnUiThread {
                        Toast.makeText(this@LoginActivity, "Login successful", Toast.LENGTH_SHORT).show()
                        val intent = Intent(this@LoginActivity, MainActivity::class.java)
                        startActivity(intent)
                        finish()
                    }
                } else if (responseCode == HttpURLConnection.HTTP_UNAUTHORIZED) {
                    runOnUiThread {
                        showError("Invalid email or password")
                    }
                } else {
                    runOnUiThread {
                        showError("Login failed. Status code: $responseCode")
                    }
                }

                httpConnection.disconnect()
            } catch (e: Exception) {
                runOnUiThread {
                    showError("Connection error: ${e.message}")
                }
            } finally {
                runOnUiThread {
                    loginButton.isEnabled = true
                }
            }
        }
    }

    private fun showError(message: String) {
        errorMessage.text = message
        errorMessage.visibility = android.view.View.VISIBLE
    }
}
