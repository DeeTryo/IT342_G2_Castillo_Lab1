package com.castillo.backend.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.castillo.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
