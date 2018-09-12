function UserDAO(connection){
    this._connection = connection;
    this._table = 'users';
}

UserDAO.prototype.save = function(data, callback){
    this._connection.query(`INSERT INTO ${this._table} SET ?`,data, callback)
}

UserDAO.prototype.update = function(data, callback){
    this._connection.query('UPDATE users SET name=?, description=? WHERE id=?',
                            [data.name, data.description, data.id], callback)
}

UserDAO.prototype.delete = function(data, callback){
    this._connection.query('DELETE FROM users WHERE id=?',[data.id], callback)
}

UserDAO.prototype.getByID = function(data, callback){
    this._connection.query('SELECT * FROM users WHERE id=?',[data], callback)
}

UserDAO.prototype.getByLogin = function(data, callback){
    this._connection.query('SELECT * FROM users WHERE login=?',[data], callback)
}

UserDAO.prototype.getAll = function(callback){
    this._connection.query(`SELECT ${this._table} FROM users`, callback)
}

module.exports =  UserDAO;