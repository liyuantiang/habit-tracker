import sqlite3

def get_connection():
    conn = sqlite3.connect("habits.db")
    #open the db file, and create it if it doesn't exist
    conn.row_factory = sqlite3.Row  
    # This allows us to access columns by name
    return conn

def init_db():
    conn = get_connection()
    conn.execute("""
    CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER PRIMARY KEY AUTOINCREMENT, --auto incrementing id for each task
        text TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0 -- 0 for incomplete, 1 for complete
        )
    """)
    conn.commit() #save the changes to the db
    conn.close() #close the connection when done

if __name__ == "__main__":
    init_db()
    print("Database ready")