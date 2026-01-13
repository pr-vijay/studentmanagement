package com.prvijay.studentmanagement.profile;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProfileImageController {

    private final Path root = Path.of("uploads");

    @PostMapping("/user/{userId}/image")
    public ResponseEntity<?> uploadUserImage(@PathVariable String userId,
                                             @RequestParam("file") MultipartFile file) throws Exception {
        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }

        String fileName = "user-" + userId + "-" + file.getOriginalFilename();
        Path target = root.resolve(fileName);

        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        String url = "/uploads/" + fileName;
        // TODO: load User by id, set profileImageUrl = url, save user

        return ResponseEntity.ok().body(url);
    }
}
