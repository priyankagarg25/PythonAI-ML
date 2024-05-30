# -*- coding: utf-8 -*-
"""
Created on Wed Jul 12 11:22:39 2023

@author: praveen
"""

# import SentimentIntensityAnalyzer class
# from vaderSentiment.vaderSentiment module.
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# function to print sentiments
# of the sentence.
def sentiment_scores(sentence):

	# Create a SentimentIntensityAnalyzer object.
	sid_obj = SentimentIntensityAnalyzer()

	# polarity_scores method of SentimentIntensityAnalyzer
	# object gives a sentiment dictionary.
	# which contains pos, neg, neu, and compound scores.
	sentiment_dict = sid_obj.polarity_scores(sentence)
	return sentiment_dict['compound']
	
def getCategory(score):

	# decide sentiment as positive, negative and neutral
	if score >= 0.05 :
		return ("Positive")

	elif score <= - 0.05 :
		return ("Negative")

	else :
		return ("Neutral")

#positive sentiment : (compound score >= 0.05) 
#neutral sentiment : (compound score > -0.05) and (compound score < 0.05) 
#negative sentiment : (compound score <= -0.05)

import feedparser
import pandas as pd

NewsFeed = feedparser.parse("https://timesofindia.indiatimes.com/rssfeedstopstories.cms")
numberOfPosts = len(NewsFeed.entries)
print ('Number of RSS posts :', numberOfPosts)


temp_val = []
dataset = pd.DataFrame(columns=['title', 'summary', 'sentiment','score'])
for i in range (0,numberOfPosts):
    entry = NewsFeed.entries[i]
    print ('Post Title :',entry.title)
    print ('Post Summary :',entry.summary)
    print(' Post link :', entry.link)
   
    if len(entry.summary) > 0 :
        compound_val = sentiment_scores(entry.summary)
    else :
        compound_val = sentiment_scores(entry.title)
    temp_val = []
    temp_val.append([entry.title, entry.summary,entry.link, getCategory(compound_val), compound_val])
    temp_df = pd.DataFrame(temp_val, columns=['title', 'summary', 'sentiment','score'])
    dataset = dataset.append(temp_df, ignore_index=True)
    
dataset.to_csv('C:/Users/prave/OneDrive/Desktop/Priyanka_python_prectice/reportVader.csv')