import pandas as pd

if __name__ == "__main__":
    libraries = pd.read_csv('libraries.csv')
    popular_books = pd.read_csv('popular_books_epl.csv')

    print(libraries.columns)
    print(popular_books.columns)

    res = pd.merge(libraries, popular_books, on='BRANCH_ID')

    res = res[['BRANCH_ID', 'BRANCH', 'NUMBER_OF_HOLDS', 'TITLE', 'AUTHOR', 'WEB_LINK', 'DATE']]
    res.columns = ['BRANCH_ID', 'BRANCH_NAME', 'NUMBER_OF_HOLDS', 'TITLE', 'AUTHOR', 'WEB_LINK', 'DATE']

    res.to_csv('output.csv', index=False)
