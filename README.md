# mstarkDB
This is an author's database suitable for personal projects.

## Getting started
1. Install the repository
2. In the console, type `npm i` to install packeges
3. Start database using `npm start`

## Data storage

The *Data* folder is created in the directory with the data base.
Data files are stored in "Data", as well as a structural file. <br>
**It is not recommended to edit files in *Data* yourself!** <br>
This can lead to a breakdown of the structure and data loss.

## Accessing the DB
The following post requests are available in the database:
* `/add-catalog` - Creates a new catalog. Accepts JSON with the *name* key
* `/remove-catalog` - Deletes a catalog. Accepts JSON with the *name* key
* `/add-obj` - Adds an object to the catalog. Accepts JSON with the keys: *catalog*, *obj*.
* `/search-obj-keys` - Searches for a directory by the presence of a key. Accepts JSON with the keys: *catalog*, *keys*.
* `/search-obj-keys-and-value` - Searches for a directory by the presence of a key and a value. Accepts JSON with the keys: *catalog*, *keys*, *value*.

The following get requests are available in the database:
* `/catalog-ls` - Returns a list of catalogs.

## JS library
In development...
