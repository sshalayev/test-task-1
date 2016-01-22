# User  

### Create new User
```
POST /api/user
    {  
        "username": "user",  
        "full_name": "Just User",  
        "role": "user"  
    }  
```

Possible values of role (see server/config/index.js): 'admin'|'user'

### Get all users
```
GET /api/user
```

### Get user by Id
```
GET /api/user/:id
```

### Get users who used specific tag
```
GET /api/user/tag/:tagName
```

### Update user
``` 
PUT /api/user/:id
    {  
        "username": "user",  
        "full_name": "Updated User",  
        "role": "admin"  
    }  
```

### Remove user
```
DELETE /api/user/:id
```

*****
# Project

### Create project by user (userId)
```
POST /api/project/:userId
    {  
        "name": "Project name"
    }
```

### Get all projects list
```
GET /api/project
```

### Get project by id
```
GET /api/project/:id
```

### Get projects list by tag name
```
GET /api/project/tag/:tagName
```

### Update project
```
PUT /api/project/:id
    {  
        "name": "New project name"
    }
```

### Remove project
```
DELETE /api/project/:id
```

*****
# Team

### Create new team
```
POST /api/team/:projectId
    {  
        "name": "Team name"
    }
```

### Get list of teams
```
GET /api/team
```

### Get team by Id
```
GET /api/team/:id
```

### Get list of team members
```
GET /api/team/:id/members
```

### Update team
```
PUT /api/team/:id
    {  
        "name": "New team name"
    }
```

### Remove team
```
DELETE /api/team/:id
```


*****
# Member

### Add member to team
```
POST /api/member/:teamId/:userId
```

### Get member by Id
```
GET /api/member/id/:id
```

### Remove member from team
```
DELETE /api/member/:id
```


*****
# Tag

### Create new tag
```
POST /api/tag/:userId/:projectId
    {  
        "name": "Tag name"
    }
```

### Get tags list for user
```
GET /api/tag/:userId
```

### Get tags list for user (for project)
```
GET /api/tag/:userId/:projectId
```

### Update tag
```
PUT /api/tag/:id
    {  
        "name": "Updated tag name"
    }
```

### Remove tag
```
DELETE /api/tag/:id
```




