import mysql.connector


mydb =mysql.connector.connect(host="localhost", user="root")

class Db:
    def __init__(self):
        self.cnx = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="",         # update if you have a password
            database="ev_db"
        )
        # dictionary=True so you get dict rows in select/selectOne
        self.cursor = self.cnx.cursor(dictionary=True)


    def select(self, sql, values=None):
        self.cursor.execute(sql, values or ())
        return self.cursor.fetchall()

    def selectOne(self, sql, values=None):
        self.cursor.execute(sql, values or ())
        return self.cursor.fetchone()

    def insert(self, sql, values=None):
        self.cursor.execute(sql, values or ())
        self.cnx.commit()
        return self.cursor.lastrowid

    def update(self, sql, values=None):
        cursor = self.cnx.cursor()   # ✅ no dictionary needed for update
        cursor.execute(sql, values or ())
        self.cnx.commit()
        rowcount = cursor.rowcount   # ✅ number of rows affected
        cursor.close()
        return cursor.rowcount              # ✅ return so you can debug

    def delete(self, sql, values=None):
        self.cursor.execute(sql, values or ())
        self.cnx.commit()
        return self.cursor.rowcount
