<?php

namespace Quickstart\Bundle\AppBundle\Features\Context;

use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\MinkExtension\Context\MinkContext;
use Behat\Gherkin\Node\TableNode;

/**
 * Class FeatureContext
 * @package Quickstart\Bundle\AppBundle\Features\Context
 */
class FeatureContext extends MinkContext implements Context, SnippetAcceptingContext
{

    /**
     * @Given /^I fill form with:$/
     */
    public function fillForm(TableNode $table)
    {
        $page = $this->getSession()->getPage();

        foreach ($table->getRows() as $row) {
            list($fieldSelector, $value) = $row;

            $field = $page->findField($fieldSelector);
            if (empty($field)) {
                $field = $this->getSession()->getDriver()->find('//label[contains(normalize-space(string(.)), "' . $fieldSelector . '")]');
                if (!empty($field)) {
                    $field = current($field);
                }
            }

            if (empty($field)) {
                throw new \Exception('Field not found ' . $fieldSelector . PHP_EOL);
            }

            $tag = strtolower($field->getTagName());

            if ($tag == 'textarea') {
                $page->fillField($fieldSelector, $value);
            } elseif ($tag == 'select') {
                if ($field->hasAttribute('multiple')) {
                    foreach (explode(',', $value) as $index => $option) {
                        $page->selectFieldOption($fieldSelector, trim($option), true);
                    }
                } else {
                    $page->selectFieldOption($fieldSelector, $value);
                }
            } elseif ($tag == 'input') {
                $type = strtolower($field->getAttribute('type'));
                if ($type == 'checkbox' || $type == 'radio') {
                    if (strtolower($value) == 'yes') {
                        $page->checkField($fieldSelector);
                    } else {
                        $page->uncheckField($fieldSelector);
                    }
//                } elseif ($type == 'radio') {
//                    // TODO: handle radio
                } else {
                    $page->fillField($fieldSelector, $value);
                }
            } elseif ($tag == 'label') {
                foreach (explode(',', $value) as $option) {
                    $option = $this->fixStepArgument(trim($option));
                    $field->getParent()->checkField($option);
                }
            }
        }
    }

    /**
     * @Given I am logged in as :arg1 with password :arg2
     */
    public function iAmLoggedInAsWithPassword($email, $password)
    {
        $this->visitPath('/');
        $this->getSession()->getPage()->clickLink('Login');
        $this->getSession()->getPage()->fillField('username', $email);
        $this->getSession()->getPage()->fillField('password', $password);
        $this->getSession()->getPage()->pressButton('_submit');
    }

    /**
     * @Given following users for each persona exist on system:
     */
    public function followingUsersForEachPersonaExistOnSystem(TableNode $table)
    {

    }
}
