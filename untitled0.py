# -*- coding: utf-8 -*-
"""
Created on Wed Jul 12 11:01:11 2023

@author: praveen
"""
import feedparser
NewFeed=feedparser.parse("https://timesofindia.indiatimes.com/rssfeedstopstories.cms")

entry=NewFeed.entries[0]
print(entry.keys())