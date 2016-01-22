'use strict';

// Users
var User = db.define('User', {
    username: {
        type: Sequelize.STRING(255),
        set: function(val) {
            this.setDataValue('username', val.toLowerCase().trim());
        },
        allowNull: false,
        unique: true
    },
    full_name: {
        type: Sequelize.STRING(255)
    },
    role: {
        type: Sequelize.ENUM.apply(Sequelize, config.roles)
    }
}, {
    tableName: 'users'
});

// Projects created by users
var Project = db.define('Project', {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    'creator_id': {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'projects'
});

// Teams of users
var Team = db.define('Team', {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    'project_id': {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: Project,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'teams'
});

// Team members
var TeamMember = db.define('TeamMember', {
    'member_id': {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    'team_id': {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: Team,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'teammembers',
    indexes: [
        {
            fields: ['member_id', 'team_id'],
            unique: true
        }
    ]
});

// Tags
var Tag = db.define('Tag', {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        set: function(val) {
            this.setDataValue('name', val.toLowerCase().trim());
        }
    },
    'user_id': {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    'project_id': {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: Project,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'tags',
    indexes: [
        {
            fields: ['name', 'user_id', 'project_id'],
            unique: true
        }
    ]
});

module.exports = db.sync({ force: config.resetDb });