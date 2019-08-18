Feature: Showing the Pipeline Dashboard homepage

  Scenario: Open the homepage
    Given the "/" page is open
    And expect a "GET" request to "https://firestore.googleapis.com/google.firestore.v1.Firestore" will return "homepage/projects.txt"
    And expect a "GET" request to "https://firestore.googleapis.com/google.firestore.v1.Firestore" will return "homepage/users.txt"
