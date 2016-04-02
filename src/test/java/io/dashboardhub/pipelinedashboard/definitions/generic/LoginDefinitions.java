package io.dashboardhub.pipelinedashboard.definitions.generic;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import io.dashboardhub.pipelinedashboard.PipelinedashboardApplicationTests;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public final class LoginDefinitions extends PipelinedashboardApplicationTests {

    @Given("^I am logged in$")
    public void I_am_logged_in() {
        driver.get(withBaseUrl("/"));
        try {
            driver.findElement(By.id("logout"));
        } catch (org.openqa.selenium.NoSuchElementException e) {
            driver.get(withBaseUrl("/login"));
            driver.findElement(By.name("submit")).click();
        }

        WebDriverWait wait = new WebDriverWait(driver,2);
        wait.until(ExpectedConditions.refreshed(ExpectedConditions.visibilityOfElementLocated(By.id("username"))));
        String username = driver.findElement(By.id("username")).getText();

        Assert.assertEquals("TestUser", username);
    }

    @Given("^I am not logged in$")
    public void I_am_not_logged_in() {
        try {
            driver.findElement(By.id("logout")).submit();
        } catch (org.openqa.selenium.NoSuchElementException e) {
        }
        driver.get(withBaseUrl("/"));
        Assert.assertEquals("Welcome Guest, please Login", driver.findElement(By.id("login")).getText());
    }
}
