Feature: Showing the Pipeline Dashboard homepage

  Scenario: Open the homepage
    Given expect a single "POST" request to "https://firestore.googleapis.com/google.firestore.v1.Firestore" will return "homepage/start.txt"
    And expect a single "POST" request to "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo" will return "homepage/authentication.txt"
    And expect a single "GET" request to "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo" will return "homepage/total.txt"
    # And expect all "GET" requests to "https://firestore.googleapis.com/google.firestore.v1.Firestore" will return the combined responses:
    #   | file                      |
    #   | homepage/projects.txt     |
    #   | homepage/active-users.txt |
    When the "/" page is open
