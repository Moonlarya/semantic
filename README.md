# Semantic network

[GitHub page :baby_chick:](https://moonlarya.github.io/semantic/)

### Description
A project that takes input from .txt file and builds relationships between input elements.
### Types of relationships
Standart .txt file contains 3 types of relationships
- 1 - has a part of
- 2 - is a
- 3 - no common

### How to use?
  - Create correct format .txt file (see format description below) or download from this GitHub repository
  - Choose it and open on ghpage
  - Input values from columns (see format of input below)
  - Send your request :stuck_out_tongue_winking_eye:

### Format of txt file
```
#1
Object[key(numeric):value]
#2
Object[key(numeric):value]
Object[key(numeric):value]
#3
arr[value:value:value]
```

### Format of request
- **n m k** - input n value of object (1 column), m value (type of relationship), k value (value of object to search if it has a relationship with first one)
- **n m ?** - input n value of object (1 column), m value (type of relationship), ? (all objects from 1 column that have relationship with first one)
- **n ? ?** - input n value of object (1 column), ? (all types of relationships), ? (all objects from 1 column that have relationship with first one)
- **? ? ?** - see all objects and relationships

> Please fill all fields values ♥
