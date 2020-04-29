package com.skilldistillery.supportlocal.services;

import java.util.List;

import com.skilldistillery.supportlocal.entities.Article;

public interface ArticleService {
	
	 public List<Article> index();

	    public Article show(String email, int aid);

	    Article create(String email, Article article, int bid);

		Article update(String email, int aid, Article article);

		boolean destroy(String email, int aid);



}
