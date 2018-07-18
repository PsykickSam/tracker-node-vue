const Promise = require('bluebird')
const hash = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
    const SALT_FACTOR = 8
    if (!user.changed('password')) {
        return
    }

    return hash.genSaltAsync(SALT_FACTOR)
            .then(salt => hash.hashAsync(user.password, salt, null))
            .then(passwd => {
                user.setDataValue('password', passwd)
            })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (password) {
        return hash.compareAsync(password, this.password)
    }

    return User
}
