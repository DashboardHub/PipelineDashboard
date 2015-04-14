<?php

namespace DashboardHub\Bundle\AppBundle\Features\Context;

use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\MinkExtension\Context\MinkContext;
use Symfony\Component\HttpFoundation\Session\Session;

/**
 * Defines application features from the specific context.
 */
class FeatureContext extends MinkContext
{

    /**
     * @Given I am logged in
     */
    public function iAmLoggedIn()
    {
        $this->getSession()->visit($this->getMinkParameter('base_url') . '/development/mock/login');
        $this->getSession()->getPage()->pressButton('Login');
    }

    /**
     * @Then /^I should wait "(?P<text>(?:[^"]|\\")*)" secs$/
     */
    public function iShouldWait($wait)
    {
        $this->getSession()->wait($wait);
    }
}
