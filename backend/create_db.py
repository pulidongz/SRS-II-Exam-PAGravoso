import os
from config import db

# Delete database file if it exists currently
if os.path.exists('user.db'):
    os.remove('user.db')

# Create the database
db.create_all()