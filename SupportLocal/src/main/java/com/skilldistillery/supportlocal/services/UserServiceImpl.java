package com.skilldistillery.supportlocal.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.supportlocal.entities.Role;
import com.skilldistillery.supportlocal.entities.User;
import com.skilldistillery.supportlocal.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> findAll(String email) {
		User user = userRepo.findUserByEmail(email);
		if (user.getRole().equals(Role.Admin)) {
			return userRepo.findAll();
		}

		return null;
	}

	@Override
	public User updateUser(User user, String email) {

		User userAdmin = userRepo.findUserByEmail(email);

		Optional<User> userOpt = userRepo.findById(user.getId());

		if (userAdmin.getRole().equals(Role.Admin)) {
			if (userOpt.isPresent()) {
				user.setActive(user.isActive());

				userRepo.saveAndFlush(user);
				return user;
			}
		}

		return null;
	}

	@Override
	public User updateUserProfile(String username, User user) {

		return null;
	}

	@Override
	public User findUserByUsername(String email) {

		return userRepo.findUserByEmail(email);
	}

}
