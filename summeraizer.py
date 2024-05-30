# -*- coding: utf-8 -*-
"""
Created on Wed Jul 12 15:45:02 2023

@author: praveen
"""
import nltk
nltk.download('punkt')
from newspaper import Article
article=Article('https://www.npr.org/2019/07/10/740387601/university-of-texas-austin-promises-free-tuition-for-low-income-students-in-2020')
article.download()
article.parse()
article.nlp()
article.authors
article.publish_date
article.keywords
txt=article.text
summery=article.summary
print(article.text)
print(article.summary)